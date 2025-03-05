<template>
  <div
    class="flex flex-col w-full max-w-xl p-8 bg-gray-100 rounded-lg justify-around h-fit"
  >
    <h2 class="text-2xl font-medium text-green-600 mb-12">Payment Methods</h2>

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
            class="w-4 h-4 text-green-600 border-gray-300 accent-green-600"
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
              class="w-4 h-4 text-green-600 border-gray-300 accent-green-600"
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
      <!-- Card Details -->
      <div
        v-if="paymentMethod === 'card'"
        class="space-y-4 flex flex-col justify-evenly"
      >
        <div class="relative">
          <input
            type="text"
            placeholder="Card number"
            v-model="cardNumber"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:outline-none"
          />
          <img
            src="../assets/images/card.png"
            alt="Card"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <input
              type="text"
              placeholder="MM / YY"
              v-model="expiry"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:outline-none"
            />
            <img
              src="../assets/images/calendar.png"
              alt="Calendar"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <div class="relative">
            <input
              type="text"
              placeholder="CVV"
              v-model="cvv"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:outline-none"
            />
            <img
              src="../assets/images/lockIcon.png"
              alt="Lock"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>
      </div>

      <!-- Checkout Button -->
      <div class="flex flex-col justify-evenly">
        <button
          @click="handleCheckout"
          class="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 hover:cursor-pointer transition-colors uppercase"
        >
          Ckeckout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentForm",
  data() {
    return {
      paymentMethod: "card",
      cardNumber: "",
      expiry: "",
      cvv: "",
    };
  },
  methods: {
    handleCheckout() {
      // Handle checkout logic here
      const paymentDetails = {
        method: this.paymentMethod,
        card:
          this.paymentMethod === "card"
            ? {
                number: this.cardNumber,
                expiry: this.expiry,
                cvv: this.cvv,
              }
            : null,
      };
      this.$emit("checkout", paymentDetails);
    },
  },
};
</script>
