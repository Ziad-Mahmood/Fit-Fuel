<template>
  <div
    class="w-full max-w-xl p-8 bg-gray-100 flex flex-col rounded-lg justify-around h-180"
  >
    <h2 class="text-3xl font-medium text-green-600">Shipping Details</h2>

    <form class="space-y-6 flex flex-col justify-evenly">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600">First Name</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gray-600">Last Name</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block text-gray-600">Email</label>
        <input
          type="email"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-600">Phone Number</label>
        <input
          type="tel"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-600">Flat/House no.</label>
        <input
          type="text"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-600">Address</label>
        <input
          type="text"
          class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600">City</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gray-600">State</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-600">Postal Code</label>
          <input
            type="text"
            class="w-full px-3 py-1 border bg-gray-50 border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gray-600">Famous Landmark</label>
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
