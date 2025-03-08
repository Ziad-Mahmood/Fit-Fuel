import { db } from "@/firebase/config";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  },
  mutations: {
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
    async loadCart({ commit }) {
      try {
        const cartCollection = collection(db, "cart");
        const snapshot = await getDocs(cartCollection);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        commit("SET_CART_ITEMS", items);
      } catch (error) {
        console.error("Error loading cart:", error);
        commit("SET_CART_ITEMS", []);
      }
    },

    async addToCart({ commit }, { id, item }) {
      try {
        const mealDoc = doc(db, "cart", id);
        await setDoc(mealDoc, item);
        commit("ADD_TO_CART", { id, ...item });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },

    async updateCartItem({ commit }, { id, item }) {
      try {
        const mealDoc = doc(db, "cart", id);
        await setDoc(mealDoc, item);
        commit("UPDATE_CART_ITEM", { id, item });
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    },

    async removeFromCart({ commit }, id) {
      try {
        const mealDoc = doc(db, "cart", id);
        await deleteDoc(mealDoc);
        commit("REMOVE_FROM_CART", id);
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },
  },
  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + item.total, 0);
    },
    cartItems: (state) => state.cartItems,
    cartItemCount: (state) => state.cartItems.length,
  },
};
