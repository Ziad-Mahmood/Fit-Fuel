<template>
    <button
      :type="type"
      class="w-full bg-[#339E3F] text-white py-2 md:py-3 rounded-full hover:bg-[#2b843a] transition-colors text-sm md:text-base"
      >
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'FormButton',
    props: {
      type: {
        type: String,
        default: 'button'
      }
    }
  }
  </script>