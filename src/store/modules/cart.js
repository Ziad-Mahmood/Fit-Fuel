import { db, auth } from "@/firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    cartItems: [],
    userId: null
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.userId = id;
    },
    SET_CART_ITEMS(state, items) {
      state.cartItems = items;
      localStorage.setItem("cart", JSON.stringify(items));
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
  },
  actions: {
    async initializeCart({ commit, dispatch }) {
      const user = auth.currentUser;
      if (user) {
        commit('SET_USER_ID', user.uid);
        await dispatch('loadCart');
      }
    },

    async clearCart({ commit, state }) {
      try {
        if (state.userId) {
          const userCartRef = doc(db, "users", state.userId, "cart", "items");
          await setDoc(userCartRef, { items: [] });
        }
        commit("CLEAR_CART");
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    },

    async loadCart({ commit, state }) {
      if (!state.userId) return;
      
      try {
        const userCartRef = doc(db, "users", state.userId, "cart", "items");
        const cartDoc = await getDoc(userCartRef);
        
        if (cartDoc.exists()) {
          const items = cartDoc.data().items || [];
          commit("SET_CART_ITEMS", items);
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
        const userCartRef = doc(db, "users", state.userId, "cart", "items");
        await setDoc(userCartRef, { 
          items: state.cartItems,
          updatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error saving cart:", error);
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
    }
  },
  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + item.total, 0);
    },
    cartItems: (state) => state.cartItems,
    cartItemCount: (state) => state.cartItems.length,
  },
};

