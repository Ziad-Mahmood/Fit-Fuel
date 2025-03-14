<template>
  <Header
    class="mb-10"
    title="Order Confirmation"
    bgImage="cart header.png"
    position="right"
  />
  <div class="container mx-auto px-20">
    <div v-if="!user" class="bg-white p-8 rounded-lg shadow-md text-center">
      <h2 class="text-xl text-[#339e3f] font-semibold mb-8">
        Please log in to view your orders.
      </h2>
      <router-link to="/login" class="btn px-6 py-3">Log In</router-link>
    </div>

    <div v-else class="bg-white p-8 rounded-lg shadow-md">
      <div v-if="order.items.length > 0">
        <h2 class="text-xl text-[#339e3f] font-semibold mb-8">
          Thank you for your purchase! Your order has been placed successfully.
        </h2>
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex justify-between items-center mb-4"
          >
            <div class="text-gray-700">
              {{ item.name }} (x{{ item.quantity }})
            </div>
            <div class="text-gray-700">{{ item.price * item.quantity }} EG</div>
          </div>
          <div class="flex justify-between items-center border-t pt-4">
            <div class="text-xl font-semibold text-gray-800">Total</div>
            <div class="text-xl font-semibold text-[#339e3f]">
              {{ order.totalPrice }} EG
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Details
          </h2>
          <div class="text-gray-700">
            <p>
              <span class="font-semibold text-[#339e3f]">UserName: </span>
              {{ order.shippingDetails.firstName }}
              {{ order.shippingDetails.lastName }}
            </p>
            <p>
              <span class="font-semibold text-[#339e3f]">Address: </span>
              {{ order.shippingDetails.address }}
            </p>
            <p>
              <span class="font-semibold text-[#339e3f]">City: </span>
              {{ order.shippingDetails.city }},
              <span class="font-semibold text-[#339e3f]">State: </span>
              {{ order.shippingDetails.state }}
              <span class="font-semibold text-[#339e3f]">PostalCode: </span>
              {{ order.shippingDetails.postalCode }}
            </p>
            <p>
              <span class="font-semibold text-[#339e3f]">Email: </span
              >{{ order.shippingDetails.email }}
            </p>
            <p>
              <span class="font-semibold text-[#339e3f]">Phone: </span
              >{{ order.shippingDetails.phone }}
            </p>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Payment Details
          </h2>
          <div class="text-gray-700">
            <p>
              Payment Method:
              {{
                order.paymentDetails.method === "card"
                  ? "Credit/Debit Card"
                  : "Cash on Delivery"
              }}
            </p>
            <p v-if="order.paymentDetails.paymentIntentId">
              Transaction ID: {{ order.paymentDetails.paymentIntentId }}
            </p>
          </div>
        </div>

        <div class="text-center">
          <router-link to="/menu" class="btn px-6 py-3"
            >Continue Shopping</router-link
          >
        </div>
      </div>

      <div v-else class="text-center">
        <h2 class="text-xl text-[#339e3f] font-semibold mb-8">
          No orders found for this user.
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import { auth } from "@/firebase/config.js";
import { db, collection, getDocs } from "@/firebase/config.js";

export default {
  name: "confirmPage",
  components: {
    Header,
  },
  data() {
    return {
      user: null,
      order: {
        items: [],
        totalPrice: 0,
        shippingDetails: {},
        paymentDetails: {},
      },
    };
  },
  async created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user = user;
        await this.fetchUserOrders(user.uid);
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    async fetchUserOrders(userId) {
      try {
        const ordersRef = collection(db, "orders");
        const querySnapshot = await getDocs(ordersRef);
        const userOrders = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((order) => order.userId === userId);

        if (userOrders.length > 0) {
          userOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          const latestOrder = userOrders[0];
          this.order = {
            items: latestOrder.items,
            totalPrice: latestOrder.totalPrice,
            shippingDetails: latestOrder.shippingDetails,
            paymentDetails: latestOrder.paymentDetails,
          };
        } else {
          this.order = {
            items: [],
            totalPrice: 0,
            shippingDetails: {},
            paymentDetails: {},
          };
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        this.order = {
          items: [],
          totalPrice: 0,
          shippingDetails: {},
          paymentDetails: {},
        };
      }
    },
  },
};
</script>