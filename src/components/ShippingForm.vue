<template>
  <div
    class="w-full max-w-xl p-8 bg-gray-100 flex flex-col rounded-lg justify-evenly h-170"
  >
    <h2 class="text-3xl font-medium text-green-600 mb-12">Shipping Details</h2>

    <form class="space-y-6 flex flex-col justify-evenly h-140">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600 mb-2">First Name</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gray-600 mb-2">Last Name</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block text-gray-600 mb-2">Email</label>
        <input
          type="email"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-600 mb-2">Phone Number</label>
        <input
          type="tel"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-600 mb-2">Flat/House no.</label>
        <input
          type="text"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-600 mb-2">Address</label>
        <input
          type="text"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600 mb-2">City</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gray-600 mb-2">State</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600 mb-2">Postal Code</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gray-600 mb-2">Famous Landmark</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ShippingForm",
};
</script>
