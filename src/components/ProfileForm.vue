<template>
  <div class="min-h-screen p-4 md:p-8">
    <div
      class="mt-17 mb-15 w-full md:max-w-9/12 mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300"
    >
      <div
        class="relative h-48 bg-gradient-to-r from-green-500 via-green-200 to-green-500"
      >
        <div class="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <img
            :src="getImageSrc"
            :alt="user.name + '\'s Profile Picture'"
            class="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform hover:scale-110 duration-300"
          />
        </div>
      </div>

      <div class="pt-20 px-6 pb-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800">{{ user.name }}</h1>
          <p class="text-gray-600 mt-1">{{ user.username }}</p>
          <p class="mt-4 text-gray-700 max-w-lg mx-auto">{{ user.bio }}</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div class="space-y-4">
            <div
              class="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-[calc(100%+20px)]"
            >
              <h2 class="text-sm font-semibold text-green-500">Email</h2>
              <div class="flex items-center justify-between">
                <input
                  v-if="editingEmail"
                  v-model="editedEmail"
                  type="email"
                  class="w-[calc(100%-50px)] text-gray-800 mt-1 p-1 border rounded"
                  @keyup.enter="saveEmail"
                />
                <p v-else class="text-gray-800 mt-1">{{ user.email }}</p>
                <button
                  @click="editingEmail ? saveEmail() : startEditingEmail()"
                  class="mr-2 px-2 py-1 text-sm text-green-500 hover:text-green-600"
                >
                  <span v-if="editingEmail">Save</span>
                  <img
                    v-else
                    src="../assets/images/edit.png"
                    alt="Edit"
                    class="w-7 h-7"
                  />
                </button>
              </div>
            </div>

            <div
              class="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-[calc(100%+20px)]"
            >
              <h2 class="text-sm font-semibold text-green-500">Phone</h2>
              <div class="flex items-center justify-between">
                <input
                  v-if="editingPhone"
                  v-model="editedPhone"
                  type="tel"
                  class="w-[calc(100%-60px)] text-gray-800 mt-1 p-1 border rounded"
                  @keyup.enter="savePhone"
                />
                <p v-else class="text-gray-800 mt-1">{{ user.phone }}</p>
                <button
                  @click="editingPhone ? savePhone() : startEditingPhone()"
                  class="mr-2 px-2 py-1 text-sm text-green-500 hover:text-green-600"
                >
                  <span v-if="editingPhone">Save</span>
                  <img
                    v-else
                    src="../assets/images/edit.png"
                    alt="Edit"
                    class="w-7 h-7"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div
              class="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-[calc(100%+20px)]"
            >
              <h2 class="text-sm font-semibold text-green-500">Address</h2>
              <div class="flex items-center justify-between">
                <input
                  v-if="editingAddress"
                  v-model="editedAddress"
                  type="text"
                  class="w-[calc(100%-60px)] text-gray-800 mt-1 p-1 border rounded"
                  @keyup.enter="saveAddress"
                />
                <p v-else class="text-gray-800 mt-1">{{ user.address }}</p>
                <button
                  @click="
                    editingAddress ? saveAddress() : startEditingAddress()
                  "
                  class="mr-2 px-2 py-1 text-sm text-green-500 hover:text-green-600"
                >
                  <span v-if="editingAddress">Save</span>
                  <img
                    v-else
                    src="../assets/images/edit.png"
                    alt="Edit"
                    class="w-7 h-7"
                  />
                </button>
              </div>
            </div>
            <div
              class="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-[calc(100%+20px)] h-22 cursor-pointer"
              @click="handleOrdersClick"
            >
              <h2 class="text-sm font-semibold text-green-500">
                Delivered Orders
              </h2>
              <div class="flex items-center justify-between">
                <p class="text-gray-800 mt-2">
                  {{ user.deliveredOrders }} Orders
                </p>
                <img
                  src="../assets/images/down-arrow.png"
                  alt="Arrow"
                  class="w-6 h-6 mr-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileForm",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        username: "",
        bio: "",
        profilePicture: "",
        email: "",
        phone: "",
        address: "",
        deliveredOrders: "",
      }),
    },
  },
  data() {
    return {
      editingEmail: false,
      editingPhone: false,
      editingAddress: false,
      editedEmail: "",
      editedPhone: "",
      editedAddress: "",
    };
  },
  computed: {
    getImageSrc() {
      return new URL(`${this.user.profilePicture}`, import.meta.url).href;
    },
  },
  methods: {
    startEditingEmail() {
      this.editedEmail = this.user.email;
      this.editingEmail = true;
    },
    startEditingPhone() {
      this.editedPhone = this.user.phone;
      this.editingPhone = true;
    },
    startEditingAddress() {
      this.editedAddress = this.user.address;
      this.editingAddress = true;
    },
    saveEmail() {
      this.$emit("update:email", this.editedEmail);
      this.editingEmail = false;
    },
    savePhone() {
      this.$emit("update:phone", this.editedPhone);
      this.editingPhone = false;
    },
    saveAddress() {
      this.$emit("update:address", this.editedAddress);
      this.editingAddress = false;
    },
    handleOrdersClick() {
      this.$emit("orders-click", this.user.deliveredOrders);
      console.log("adhjuas");
    },
  },
};
</script>
