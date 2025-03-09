<template>
  <div class="min-h-screen">
    <Header
      title="Order Delivery"
      bgImage="header-delivery.png"
      position="left"
    />

    <div class="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <DashTable
        :items="orders"
        sideImage="SideDelivery.png"
        imageAlt="Delivery"
        @accept-order="acceptOrder"
      />
    </div>
  </div>
</template>

<script>
import Header from "../../components/layout/Header.vue";
import DashTable from "../../components/dashboard/DashTable.vue";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export default {
  name: "DriverDashboard",
  components: {
    Header,
    DashTable,
  },
  data() {
    return {
      orders: [],
      unsubscribeOrders: null,
    };
  },
  created() {
    this.setupOrdersListener();
  },
  beforeUnmount() {
    // Clean up listener when component is destroyed
    if (this.unsubscribeOrders) this.unsubscribeOrders();
  },
  methods: {
    setupOrdersListener() {
      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("status", "==", "ready_for_delivery")
        );
        this.unsubscribeOrders = onSnapshot(
          ordersQuery,
          (snapshot) => {
            this.orders = snapshot.docs.map((doc) => {
              const orderData = doc.data();
              return {
                id: doc.id,
                date: orderData.orderDate
                  ? new Date(orderData.orderDate.toDate()).toLocaleDateString()
                  : "No Date",
                address: orderData.address?.street || "No Address",
                city: orderData.address?.city || "No City",
                isComplete: orderData.isComplete || false,
              };
            });
          },
          (error) => {
            console.error("Error fetching orders:", error);
          }
        );
      } catch (error) {
        console.error("Error setting up orders listener:", error);
      }
    },
    acceptOrder(orderId) {
      console.log("Accepted order:", orderId);
      // Here you would update the order status in Firestore
    },
  },
};
</script>
