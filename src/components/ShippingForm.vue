<template>
  <div class="w-full max-w-xl p-8 bg-gray-100 flex flex-col rounded-lg justify-around h-auto">
    <h2 class="text-3xl mb-5 font-semibold text-[#339e3f]">Shipping Details</h2>
    <form class="space-y-6 flex flex-col justify-evenly" @submit.prevent="validateForm">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600">First Name</label>
          <input
            type="text"
            v-model="form.firstName"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
          <p v-if="errors.firstName" class="text-[#339e3f] text-sm">{{ errors.firstName }}</p>
        </div>
        <div>
          <label class="block text-gray-600">Last Name</label>
          <input
            type="text"
            v-model="form.lastName"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
          <p v-if="errors.lastName" class="text-[#339e3f] text-sm">{{ errors.lastName }}</p>
        </div>
      </div>
      <div>
        <label class="block text-gray-600">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
        <p v-if="errors.email" class="text-[#339e3f] text-sm">{{ errors.email }}</p>
      </div>
      <div>
        <label class="block text-gray-600">Phone Number</label>
        <input
          type="tel"
          v-model="form.phone"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
        <p v-if="errors.phone" class="text-[#339e3f] text-sm">{{ errors.phone }}</p>
      </div>
      <div>
        <label class="block text-gray-600">Address</label>
        <input
          type="text"
          v-model="form.address"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
        <p v-if="errors.address" class="text-[#339e3f] text-sm">{{ errors.address }}</p>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600">City</label>
          <input
            type="text"
            v-model="form.city"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
          <p v-if="errors.city" class="text-[#339e3f] text-sm">{{ errors.city }}</p>
        </div>
        <div>
          <label class="block text-gray-600">State</label>
          <input
            type="text"
            v-model="form.state"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
          <p v-if="errors.state" class="text-[#339e3f] text-sm">{{ errors.state }}</p>
        </div>
      </div>
      <div>
        <label class="block text-gray-600">Postal Code</label>
        <input
          type="text"
          v-model="form.postalCode"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
        <p v-if="errors.postalCode" class="text-[#339e3f] text-sm">{{ errors.postalCode }}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ShippingForm",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
      },
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.firstName) this.errors.firstName = "First Name is required.";
      if (!this.form.lastName) this.errors.lastName = "Last Name is required.";
      if (!this.form.address) this.errors.address = "Address is required.";
      if (!this.form.city) this.errors.city = "City is required.";
      if (!this.form.state) this.errors.state = "State is required.";

      if (!this.form.email) {
        this.errors.email = "Email is required.";
      } else if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
        this.errors.email = "Invalid email format.";
      }

      if (!this.form.phone || !/^\d{11,}$/.test(this.form.phone)) {
        this.errors.phone = "Phone Number is required , must be at least 11 digits";
      }

      if (!this.form.postalCode || !/^\d{5,}$/.test(this.form.postalCode)) {
        this.errors.postalCode = "Postal Code is required , must be at least 5 digits";
      }

      return Object.keys(this.errors).length === 0;
    },
    getFormData() {
      if (this.validateForm()) {
        return { ...this.form };
      } else {
        alert("Please fill out the form correctly.");
        return null;
      }
    },
  },
};
</script>
