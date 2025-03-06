<template>
  <div class="hero w-full h-screen flex items-start">
    <div class="hero-content w-1/2 pl-10 xl:pl-[163px] mt-15">
      <div class="content-head">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-14 lg:leading-16 mb-8 w-full">
        <span class="hero-span">Healthy <span class="text-black"> & </span> Delicious</span>
        <br />
        Meals Delivered to Your Doorstep
      </h2>
      </div>
      <p class="xl:text-[1.1rem] text-[#333333] xl:w-[79%] mb-8">
        Fuel your body with balanced, delicious meals made from fresh, high-quality
        ingredient—packed with the nutrition you need and the flavors you love
      </p>
      <button class="btn py-3 px-11" @click="$router.push('/menu')">Order Now</button>
    </div>

    <div class="hero-image xl:w-1/2 flex justify-end items-start">
      <img src="@/assets/images/hero.png" alt="Hero Image" class="md:w-[85%] xl:w-full" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped>
.hero-span {
  color: #339e3f;
}
@media (max-width: 768px) {
  .hero-image {
    display: none;
  }
  .hero-content {
    width: 100%;
  }

  .btn {
    width: 90%;
    margin: auto;
  }
}
</style>
