<template>
  <footer class="w-full min-h-[398px] bg-white flex justify-around items-center">
    <div class="w-full max-w-[1440px] flex justify-between px-16">
      <!-- Brand Section -->
      <div class="flex flex-col gap-6">
        <div class="w-[110px]">
          <router-link to="/">
            <img src="@/assets/images/Logo.png" alt="FitFuel Logo" class="h-16 w-auto" />
          </router-link>
        </div>
        <p class="w-[339px] text-[#191919] text-lg font-normal font-['Poppins']">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </p>
        <div>
          <img src="@/assets/images/Social media.png" alt="Social Media Icons" class="w-[106px] h-[24px]" />
        </div>
      </div>

      <!-- Pages Section -->
      <div class="hidden md:flex flex-col gap-4">
        <h3 class="text-[#339e3f] text-2xl font-semibold font-['Poppins']">
          Pages
        </h3>
        <nav class="flex flex-col gap-3">
          <router-link to="/about" class="text-[#191919] text-lg font-normal font-['Poppins'] hover:text-[#339e3f] transition-colors">
            About Us
          </router-link>
          <router-link to="/contact" class="text-[#191919] text-lg font-normal font-['Poppins'] hover:text-[#339e3f] transition-colors">
            Contact Us
          </router-link>
        </nav>
      </div>

      <!-- Contact Section -->
      <div class="flex flex-col gap-8">
        <div class="flex items-center">
          <img src="@/assets/images/Phone.png" alt="Phone" class="w-[42px] h-[46px]" />
          <span class="hidden md:inline-block ml-[63px] text-black text-lg font-normal font-['Inter']">
            +123 488 9652
          </span>
        </div>
        
        <div class="flex items-center">
          <img src="@/assets/images/Circled Envelope.png" alt="Email" class="w-[42px] h-[46px]" />
          <span class="hidden md:inline-block ml-[63px] text-black text-lg font-normal font-['Inter']">
            FitFuel@gmail.com
          </span>
        </div>
        
        <div class="flex items-center">
          <img src="@/assets/images/Place Marker.png" alt="Location" class="w-[42px] h-[46px]" />
          <span class="hidden md:inline-block ml-[63px] text-black text-lg font-normal font-['Inter']">
            Cairo,Egypt
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>