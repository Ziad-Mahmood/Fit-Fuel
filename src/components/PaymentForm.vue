<template>
  <div
    class="flex flex-col w-full max-w-xl p-8 bg-gray-100 rounded-lg justify-around h-fit"
  >
    <h2 class="text-2xl font-medium text-[#339e3f] mb-12">Payment Methods</h2>
    <div class="space-y-6">
      <!-- Payment Options -->
      <div class="space-y-4 flex flex-col justify-evenly">
        <div class="flex items-center gap-3">
          <input
            type="radio"
            id="cod"
            name="payment"
            v-model="paymentMethod"
            value="cod"
            class="w-4 h-4 text-[#339e3f] border-gray-300 accent-green-600"
          />
          <label for="cod">
            <div class="text-gray-700">Pay on Delivery</div>
            <div class="text-gray-400 text-xs">Pay with cash on delivery</div>
          </label>
        </div>
        <div class="flex justify-between">
          <div class="flex items-center gap-3">
            <input
              type="radio"
              id="card"
              name="payment"
              v-model="paymentMethod"
              value="card"
              class="w-4 h-4 text-[#339e3f] border-gray-300 accent-green-600"
            />
            <label for="card">
              <div class="text-gray-700">Credit/Debit Cards</div>
              <div class="text-gray-400 text-xs">
                Pay with your Credit / Debit Card
              </div>
            </label>
          </div>
          <!-- Card Icons -->
          <div class="flex justify-end gap-3">
            <img src="../assets/images/visa.png" alt="Visa" class="h-5" />
            <img
              src="../assets/images/mada.png"
              alt="American Express"
              class="h-5"
            />
            <img
              src="../assets/images/mastercard.png"
              alt="Mastercard"
              class="h-5"
            />
          </div>
        </div>
      </div>
      <div
        v-if="paymentMethod === 'card'"
        class="space-y-4 flex flex-col justify-evenly"
      >
        <!-- Stripe Card Element -->
        <div id="card-element" ref="cardElement"></div>
      </div>

      <div class="flex flex-col justify-evenly">
        <button @click="handleCheckout" class="w-full btn py-3">
          Check Out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";

export default {
  name: "PaymentForm",
  data() {
    return {
      paymentMethod: "card",
      stripe: null,
      elements: null,
      cardElement: null,
    };
  },
  async mounted() {
    this.stripe = await loadStripe(
      "pk_test_51R08Xh2Lp7yP5iY753drEeImaUj7ENYGLzT5FIm41VqC4UWuziYWRIH22x25kCnUe2N1oycyFOuMdTFIh7PRDEU700m0PXVbc5"
    );
    this.elements = this.stripe.elements();
    this.mountCardElement();
  },
  watch: {
    paymentMethod(newMethod) {
      if (newMethod === "card") {
        this.$nextTick(() => {
          this.mountCardElement();
        });
      }
    },
  },
  methods: {
    mountCardElement() {
      if (!this.cardElement) {
        const style = {
          base: {
            fontSize: "16px",
            color: "#32325d",
          },
        };
        this.cardElement = this.elements.create("card", { style });
      }
      this.cardElement.mount(this.$refs.cardElement);
    },
    async handleCheckout() {
      if (this.paymentMethod === "card") {
        try {
          const { paymentMethod, error } =
            await this.stripe.createPaymentMethod({
              type: "card",
              card: this.cardElement,
            });

          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:error.message,
            });
          } else {
            this.$emit("checkout", {
              method: "card",
              paymentMethod,
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
      } else {
        this.$emit("checkout", { method: "cod" });
      }
    },
  },
};
</script>
