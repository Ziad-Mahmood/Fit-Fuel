<template>
  <Header
    class="mb-10"
    title="Check Out"
    bgImage="checkout header.png"
    position="left"
  />
  <div class="container mx-auto px-4 py-8">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center mb-10"
    >
      <shipping-form ref="shippingForm" />
      <payment-form ref="paymentForm" @checkout="handleCheckout" />
    </div>
  </div>
</template>

<script>
import ShippingForm from "@/components/ShippingForm.vue";
import PaymentForm from "@/components/PaymentForm.vue";
import Header from "@/components/layout/Header.vue";
import { loadStripe } from "@stripe/stripe-js";
import { db, collection, addDoc } from "@/firebase/config.js";
import { doc, updateDoc } from "firebase/firestore";
import { mapActions, mapGetters } from "vuex";
import { auth } from "@/firebase/config.js";
import Swal from "sweetalert2";

export default {
  name: "CheckoutView",
  components: {
    ShippingForm,
    PaymentForm,
    Header,
  },
  data() {
    return {
      stripe: null,
      elements: null,
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotal"]),
  },
  async created() {
    this.stripe = await loadStripe(
      "pk_test_51R08Xh2Lp7yP5iY753drEeImaUj7ENYGLzT5FIm41VqC4UWuziYWRIH22x25kCnUe2N1oycyFOuMdTFIh7PRDEU700m0PXVbc5"
    );
    this.elements = this.stripe.elements();
  },
  methods: {
    ...mapActions("cart", ["clearCart"]),

    async handleCheckout(paymentDetails) {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must be logged in to place an order",
        });
        return;
      }

      const shippingForm = this.$refs.shippingForm;

      if (!shippingForm.validateForm()) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill in all required shipping details",
        });
        return;
      }

      const shippingDetails = shippingForm.getFormData();
      const order = {
        userId: user.uid,
        shippingDetails,
        paymentDetails,
        items: this.cartItems,
        totalPrice: this.cartTotal,
        timestamp: new Date().toLocaleDateString(),
      };

      if (paymentDetails.method === "cod") {
        await this.saveOrderToFirebase(order);
        Swal.fire({
          icon: "success",
          title: "Order placed successfully",
          text: "You will pay on delivery",
          draggable: true,
        });
      } else if (paymentDetails.method === "card") {
        try {
          const response = await fetch(
            "http://localhost:5000/create-payment-intent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ amount: this.cartTotal }),
            }
          );

          const { clientSecret } = await response.json();
          const { error, paymentIntent } = await this.stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: paymentDetails.paymentMethod.id,
            }
          );

          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Payment failed" + error.message,
            });
          } else {
            order.paymentDetails.paymentIntentId = paymentIntent.id;
            await this.saveOrderToFirebase(order);

            // Update user profile with shipping details
            await this.updateUserProfile(user.uid, shippingDetails);

            Swal.fire({
              icon: "success",
              title: "Order placed successfully",
              text: "Payment completed",
              draggable: true,
            });
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while processing your payment. Please try again",
          });
        }
      }

      localStorage.setItem("order", JSON.stringify(order));
      await this.clearCart();
      this.$router.push("/order-confirmation");
    },

    async saveOrderToFirebase(order) {
      try {
        const docRef = await addDoc(collection(db, "orders"), order);
        console.log(
          "Order saved to Firebase successfully! Document ID:",
          docRef.id
        );
      } catch (error) {
        console.error("Error saving order to Firebase:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to save order, Please try again",
        });
      }
    },

    async updateUserProfile(userId, shippingDetails) {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          address: {
            street: shippingDetails.address,
            city: shippingDetails.city,
            state: shippingDetails.state,
            postalCode: shippingDetails.postalCode,
          },
          phone: shippingDetails.phone,
        });
        console.log("User profile updated with shipping details");
      } catch (error) {
        console.error("Error updating user profile:", error);
        // We don't show an error to the user here as this is a background operation
        // and shouldn't interrupt the checkout flow
      }
    },
  },
};
</script>
