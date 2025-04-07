<template>
  <section
    class="review-section flex flex-col lg:flex-row items-center gap-20 px-6 lg:px-20 py-12 m-auto w-[80%] my-20"
    :dir="dir"
  >
    <!-- Image Section - Stays on left for both languages -->
    <div class="w-[100%] lg:w-[50%]">
      <img
        src="@/assets/images/home-review.png"
        :alt="isRTL ? 'تقييمات العملاء' : 'Customer Reviews'"
        class="w-[650px] lg:h-[500px]"
      />
    </div>

    <!-- Content Section -->
    <div class="w-full lg:w-[50%]">
      <p class="text-[#339e3f] font-semibold uppercase tracking-wide">
        {{ isRTL ? 'آراء العملاء' : 'What They Say' }}
      </p>
      <h2 class="text-3xl lg:text-[40px] font-bold mt-2 w-[100%] leading-15">
        {{ isRTL ? 'آراء عملائنا عنا' : 'What Our Customers Say About Us' }}
      </h2>
      <p class="text-[#333333] lg:text-[18px] leading-7 lg:w-[85%] my-6">
        {{
          isRTL
            ? '"هم الأفضل. بالإضافة إلى الوجبات اللذيذة والمتنوعة، الخدمة ممتازة خاصة في سرعة التوصيل. أوصي بهم بشدة"'
            : '"They are the best. Besides the many and delicious meals, the service is also very good, especially in the very fast delivery. I highly recommend them to you"'
        }}
      </p>

      <div class="flex items-center mt-6" :class="{ 'flex-row': isRTL }">
        <img 
          src="@/assets/images/home-coustomer.png" 
          :alt="isRTL ? 'عميل' : 'Customer'" 
          class="w-12 h-12 rounded-full object-cover" 
          :class="{ 'ml-4': isRTL, 'mr-4': !isRTL }"
        />
        <div>
          <p class="font-bold">{{ isRTL ? 'تيريزا جوردان' : 'Theresa Jordan' }}</p>
          <p class="text-[#333333] text-sm lg:font-medium">
            {{ isRTL ? 'خبيرة طعام' : 'Food Enthusiast' }}
          </p>
        </div>        
      </div>
      <div class="flex items-center mt-4">
        <div class="flex text-yellow-400" style="direction: ltr;">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
        </div>
        <p class="text-[#333333]" :class="{ 'mr-3': isRTL, 'ml-3': !isRTL }">4.8</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeReviewes',
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar';
    },
    dir() {
      return this.isRTL ? 'rtl' : 'ltr';
    }
  }
}
</script>

<style scoped>
[dir="rtl"] .review-section {
  text-align: right;
}
.stars-container {
  direction: ltr;
  display: inline-flex;
}
</style>