<template>
  <tr class="border-t border-gray-100">
    <td class="px-6 py-6 text-[#191919]">#{{ item.id }}</td>
    <td class="px-6 py-6 text-[#191919]">{{ item.date }}</td>
    <td class="px-6 py-6 text-[#191919]">{{ item.address }}</td>
    <td class="px-6 py-6">
      <button 
        class="bg-[#339e3f] text-white px-6 py-1.5 rounded-full text-sm"
        @click="$emit('accept-order', item.id)"
      >
        Accept
      </button>
    </td>
    <td class="px-8 py-6">
      <img 
        v-if="item.isComplete" 
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