<template>
  <div class="bg-gray-50">
    <ProfileForm
      :user="userData"
      @update:email="userData.email = $event"
      @update:phone="userData.phone = $event"
      @update:address="userData.address = $event"
    />
  </div>
</template>

<script>
import ProfileForm from "@/components/ProfileForm.vue";

export default {
  name: "ProfileView",
  components: {
    ProfileForm,
  },
  data() {
    return {
      userData: {
        name: "Zeyad Abdelaziz",
        username: "@zZooZz",
        profilePicture: "/src/assets/images/logo.png",
        email: "zeyadabdelaziz691@gmail.com",
        phone: "+201153528835",
        address: "Maadi, Cairo, Egypt",
        deliveredOrders: "5",
      },
    };
  },
};
</script>
