<template>
  <section
    class="about-section flex flex-col lg:flex-row items-center lg:items-center px-6 lg:px-20 py-12 w-[80%] m-auto gap-18"
    :dir="dir"
  >
    <div class="grid grid-cols-2 gap-4 w-full lg:w-[50%] lg:ml-auto">
      <div class="row-span-2">
        <img
          src="@/assets/images/home-about1.png"
          :alt="isRTL ? 'وجبات صحية' : 'Healthy Meals'"
          class="rounded-lg w-[100%] h-[484.15px] object-cover"
        />
      </div>
      <img
        src="@/assets/images/meal10.jpg"
        :alt="isRTL ? 'طبق مشوي' : 'Grilled Dish'"
        class="rounded-lg w-[279.11px] h-[244.79px] mt-10 object-cover"
      />
      <img
        src="@/assets/images/home-about2.png"
        :alt="isRTL ? 'سلطة سلمون' : 'Salmon Salad'"
        class="rounded-lg w-[279px] h-[290px] object-cover"
      />
    </div>
    <div class="w-full lg:w-[50%] lg:mr-auto">
      <p class="text-[#339e3f] font-semibold uppercase tracking-wide mb-4">
        {{ isRTL ? 'معلومات عنا' : 'About Us' }}
      </p>
      <h2 class="text-3xl lg:text-5xl font-bold mt-2 leading-15">
        {{ isRTL ? 'اختر الطعام' : 'Choose Healthy' }} <br>
        {{ isRTL ? 'الصحي؟' : 'Food?' }}
      </h2>
      <p class="text-[#333333] leading-relaxed my-10">
        {{
          isRTL 
            ? 'نحن نؤمن أن الأكل الصحي يجب أن يكون سهلاً ولذيذاً ومتاحاً للجميع. وجباتنا المعدة في المنزل مصنوعة من مكونات طازجة وعالية الجودة لتغذية جسمك ودعم نمط حياة متوازن'
            : 'We believe that eating healthy should be easy, delicious, and accessible to everyone. Our home-cooked meals are made with fresh, high-quality ingredients to nourish your body and support a balanced lifestyle'
        }}
      </p>
      <button class="btn py-3 px-11" @click="$router.push('/aboutus')">
        {{ isRTL ? 'تعلم المزيد' : 'Learn More' }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeAbout',
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
[dir="rtl"] .about-section {
  text-align: right;
}
</style>