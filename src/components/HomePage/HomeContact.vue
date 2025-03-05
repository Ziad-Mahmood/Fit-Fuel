<template>
  <div class="contact-section w-[70%] m-auto flex flex-col lg:flex-row items-center py-20">
    <div class="contact-info mx-auto text-center md:text-start">
      <h2 class="text-lg font-semibold text-[#339E3F] tracking-[.25em] mb-5">GET IN TOUCH WITH US</h2>
      <p class=" text-3xl lg:text-[45px] font-bold lg:w-[90%] leading-18">Have questions or need assistance?</p>
    </div>
    <div class="contact-btn mx-auto">
      <button class="btn py-4 px-15" @click="$router.push('/contact')">Contact US</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeContact',
}
</script>

<style scoped></style>
