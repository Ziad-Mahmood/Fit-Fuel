<template>
  <div class="flex gap-8 items-center justify-between">
    <!-- Loading State -->
    <div v-if="loading" class="bg-white overflow-x-auto w-full lg:w-[82%]">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Order ID</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Order Date</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">{{$route.path.includes('delivery') ? 'Delivery Address' : 'Order Name'}}</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Order</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Is Complete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n" class="animate-pulse">
            <td class="px-4 lg:px-8 py-4 text-center">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
            <td class="px-4 lg:px-8 py-4 text-center">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
            <td class="px-4 lg:px-8 py-4 text-center">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
            <td class="px-4 lg:px-8 py-4 text-center">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
            <td class="px-4 lg:px-8 py-4 text-center">
              <div class="h-4 w-20 mx-auto bg-gray-200 rounded"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Main Content -->
    <div v-else class="bg-white overflow-x-auto w-full lg:w-[82%]">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Order ID</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Order Date</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold"> {{$route.path.includes('delivery') ? 'Delivery Address' : 'Order Name'}}</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Order</th>
            <th class="px-4 lg:px-8 text-center text-[#191919] text-base lg:text-lg font-semibold">Is Complete</th>
          </tr>
        </thead>
        <tbody>
          <TableItem 
            v-for="item in items" 
            :key="item.id"
            :item="item"
            :is-delivery-view="$route.path.includes('delivery')"
            @accept-order="$emit('accept-order', $event)"
            @mark-ready="$emit('mark-ready', $event)"
          >
            <template #cell(id)="data">
              #{{ data.item.id.substring(0, 6) }}
            </template>
          </TableItem>
        </tbody>
      </table>
    </div>

    <div class="hidden lg:flex items-center justify-center w-full lg:w-[23%]">
      <img 
        :src="sideImageSrc"
        :alt="imageAlt"
        class="h-auto w-48 lg:w-full"
      />
    </div>
  </div>
</template>

<script>
import TableItem from './TableItem.vue'

export default {
  name: 'DashTable',
  components: {
    TableItem
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    sideImage: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      default: 'Side Image'
    }
  },
  computed: {
    sideImageSrc() {
      return new URL(`../../assets/images/${this.sideImage}`, import.meta.url).href
    }
  },
  emits: ['accept-order', 'mark-ready']
}
</script>