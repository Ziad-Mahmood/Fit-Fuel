<template>
  <tr class="border-b border-gray-200 ">
    <td class="px-1 sm:px-6 py-6 text-[#191919]  text-sm sm:text-base text-center ">#{{ item.id }}</td>
    <td class="px-1 sm:px-6 py-6 text-[#191919] text-sm sm:text-base text-center">{{ item.date }}</td>
    <td class="px-1 sm:px-6 py-6 text-[#191919] text-sm sm:text-base text-center">{{ item.address }}</td>
    <td class="px-1 sm:px-6 py:1 sm:py-6 ">
      <button 
        class="bg-[#339e3f] text-white text-center px-1 sm:px-6 py-1.5 rounded-full text-sm lg:w-full mx-auto"
        @click="$emit('accept-order', item.id)"
      >
        Accept
      </button>
    </td>
    <td class="px-1 sm:px-8 py-6 flex justify-center items-end">
        <button >
      <img 
        v-if="item.isComplete" 
        :src="checkMarkSrc"
        alt="Complete" 
        class="w-10 h-10 "
      /></button>
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
    }
  },
  computed: {
    checkMarkSrc() {
      return new URL('../../assets/images/Check Mark.png', import.meta.url).href
    }
  },
  emits: ['accept-order']
}
</script>