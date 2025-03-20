import { db, auth } from "@/firebase/config";
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection, addDoc } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    cartItems: [],
    userId: null,
    unsubscribe: null,
    loading: false 
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.userId = id;
    },
    SET_CART_ITEMS(state, items) {
      state.cartItems = items;
      localStorage.setItem("cart", JSON.stringify(items));
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    ADD_TO_CART(state, item) {
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.id === item.id
      );
      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex] = {
          ...item,
          quantity: state.cartItems[existingItemIndex].quantity + item.quantity,
          total:
            (state.cartItems[existingItemIndex].quantity + item.quantity) *
            item.price,
        };
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, id) {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state) {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
    UPDATE_CART_ITEM(state, { id, item }) {
      const index = state.cartItems.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.cartItems[index] = { id, ...item };
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    SET_UNSUBSCRIBE(state, unsubscribeFunc) {
      state.unsubscribe = unsubscribeFunc;
    },
    CLEAR_UNSUBSCRIBE(state) {
      if (state.unsubscribe) {
        state.unsubscribe();
        state.unsubscribe = null;
      }
    }
  },
  actions: {
    async testPageLoad({ commit }) {
      commit('SET_LOADING', true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error in test page load:", error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async initializeCart({ commit, dispatch }) {
      commit('SET_LOADING', true);
      
      try {
        const user = auth.currentUser;
        if (user) {
          commit('SET_USER_ID', user.uid);
          await dispatch('setupCartListener');
        } else {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            commit("SET_CART_ITEMS", JSON.parse(savedCart));
          }
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    setupCartListener({ commit, state }) {
      if (!state.userId) return;
      
      commit('CLEAR_UNSUBSCRIBE');
      commit('SET_LOADING', true);
      
      try {
        const userCartRef = doc(db, "cart", state.userId);
        const unsubscribe = onSnapshot(userCartRef, (doc) => {
          if (doc.exists()) {
            const cartItems = doc.data().cartItems || [];
            commit("SET_CART_ITEMS", cartItems);
          } else {
            commit("SET_CART_ITEMS", []);
          }
          commit('SET_LOADING', false);
        }, (error) => {
          console.error("Cart listener error:", error);
          commit('SET_LOADING', false);
        });
        
        commit('SET_UNSUBSCRIBE', unsubscribe);
      } catch (error) {
        console.error("Error setting up cart listener:", error);
        commit('SET_LOADING', false);
      }
    },

    async loadCart({ commit, state }) {
      if (!state.userId) return;
      
      try {
        const userCartRef = doc(db, "cart", state.userId);
        const cartDoc = await getDoc(userCartRef);
        
        if (cartDoc.exists()) {
          const cartItems = cartDoc.data().cartItems || [];
          commit("SET_CART_ITEMS", cartItems);
        } else {
          commit("SET_CART_ITEMS", []);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    },

    async saveCart({ state }) {
      if (!state.userId) return;
      
      try {
        const userCartRef = doc(db, "cart", state.userId);
        await setDoc(userCartRef, { 
          cartItems: state.cartItems,
          updatedAt: new Date()
        });
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    },

    async clearCart({ commit, state }) {
      try {
        if (state.userId) {
          const userCartRef = doc(db, "cart", state.userId);
          await setDoc(userCartRef, { cartItems: [] });
        }
        commit("CLEAR_CART");
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    },

    async addToCart({ dispatch, commit, state }, { id, item }) {
      try {
        const newItem = { id, ...item };
        commit("ADD_TO_CART", newItem);
        await dispatch('saveCart');
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },

    async updateCartItem({ dispatch, commit }, { id, item }) {
      try {
        commit("UPDATE_CART_ITEM", { id, item });
        await dispatch('saveCart');
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    },

    async removeFromCart({ dispatch, commit }, id) {
      try {
        commit("REMOVE_FROM_CART", id);
        await dispatch('saveCart');
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },
    
    cleanup({ commit }) {
      commit('CLEAR_UNSUBSCRIBE');
    }
  },
  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + item.total, 0);
    },
    cartItems: (state) => state.cartItems,
    cartItemCount: (state) => state.cartItems.length,
    isLoading: (state) => state.loading 
  },
};

