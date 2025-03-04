<template>
  <section
    class="review-section flex flex-col lg:flex-row items-center gap-20 px-6 lg:px-20 py-12 m-auto w-[80%] my-20"
  >
    <div class="w-[100%] lg:w-[50%]">
      <img
        src="@/assets/images/home-review.png"
        alt="Revirws"
        class="w-[650px] lg:h-[500px]"
      />
    </div>
    <div class="w-full lg:w-[50%]">
      <p class="text-[#339e3f] font-semibold uppercase tracking-wide">What They Say</p>
      <h2 class="text-3xl lg:text-[40px] font-bold mt-2 w-[100%] leading-15">
        What Our Customers Say About Us
      </h2>
      <p class="text-[#333333] lg:text-[18px] leading-7 lg:w-[85%] my-6">
        “They are the best. Besides the many and delicious meals, the service is also very good,
        especially in the very fast delivery. I highly recommend them to you”
      </p>

      <div class="flex items-center mt-6 space-x-4">
        <img src="@/assets/images/home-coustomer.png" alt="Customer" class="w-12 h-12 rounded-full object-cover" />
        <div>
          <p class="font-bold">Theresa Jordan</p>
          <p class="text-[#333333] text-sm lg:font-medium">Food Enthusiast</p>
        </div>        
      </div>

      <div class="flex items-center mt-4">
        <div class="flex text-yellow-400 space-x-2">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
        </div>
        <p class="text-[#333333] ml-2">4.8</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeReviewes',
}
</script>

<style scoped></style>
