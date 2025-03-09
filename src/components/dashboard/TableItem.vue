<template>
  <tr class="border-b border-gray-200">
    <td class="px-1 sm:px-6 py-6 text-[#191919] text-sm sm:text-base text-center">#{{ item.id }}</td>
    <td class="px-1 sm:px-6 py-6 text-[#191919] text-sm sm:text-base text-center">{{ item.date }}</td>

    <td class="px-1 sm:px-6 py-6 text-[#191919] text-sm sm:text-base text-center">{{ item.address }} {{ item.city ? ', ' + item.city : '' }}</td>
    <td class="px-1 sm:px-6 py:1 sm:py-6 ">

      <button 
        v-if="item.status === 'Order Placed' || isDeliveryView && item.status === 'On Delivery'"
        class="text-center px-1 sm:px-6 py-1.5 btn lg:w-full mx-auto"
        @click="$emit('accept-order', item.id)"
      >
        Accept
      </button>
      <button 
        v-else-if="item.status === 'Preparing' || isDeliveryView && item.status === 'Being Delivered'"
        class="text-center px-1 sm:px-6 py-1.5 btn lg:w-full mx-auto opacity-50 cursor-not-allowed"
        disabled
      >
        Accepted
      </button>
    </td>
    <td class="px-1 sm:px-8 py-6 flex justify-center items-end">
      <button 
        v-if="item.status === 'Preparing' || isDeliveryView && item.status === 'Being Delivered'"
        class="hover:cursor-pointer text-red-600 text-4xl font-bold"
        @click="$emit('mark-ready', item.id)"
      >
        X
      </button>
      <img 
        v-else-if="!isDeliveryView && item.status === 'On Delivery' || isDeliveryView && item.status === 'Delivered'"
        :src="checkMarkSrc"
        alt="Complete" 
        class="w-10 h-10"
      />
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isDeliveryView: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkMarkSrc() {
      return new URL('../../assets/images/Check Mark.png', import.meta.url).href
    }
  },
  emits: ['accept-order', 'mark-ready']
}
</script>