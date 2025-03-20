<template>
  <div class="bg-gray-50">
    <div v-if="isLoading" class="min-h-screen flex justify-center items-center">
      <div
        class="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <div v-else-if="userData">
      <ProfileForm
        :user="userData"
        @update:email="updateEmail($event)"
        @update:phone="updatePhone($event)"
        @update:address="updateAddress($event)"
        @orders-click="handleOrdersClick"
      />

      <div class="flex justify-center items-center">
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>

    <div
      v-else
      class="min-h-screen p-4 flex flex-col items-center justify-center"
    >
      <p class="text-lg mb-4">Please sign in to view your profile</p>
      <router-link
        to="/login"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Sign In
      </router-link>
    </div>
  </div>
</template>

<script>
import ProfileForm from "@/components/ProfileForm.vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

export default {
  name: "ProfileView",
  components: {
    ProfileForm,
  },
  data() {
    return {
      isLoading: true,
      userData: null,
      user: null,
    };
  },
  mounted() {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user) {
        // Initialize with default values
        this.userData = {
          name: user.displayName || "User",
          username: user.displayName
            ? "@" + user.displayName.toLowerCase().replace(/\s+/g, "")
            : "@user",
          profilePicture: "/src/assets/images/logo.png",
          email: user.email || "",
          phone: "",
          address: "",
          deliveredOrders: "0",
        };

        // Set up real-time listener for user data
        this.unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();

              // If user has client role, update their data
              if (userData.role === "client") {
                this.userData.phone = userData.phone || "";

                // Format address to show only street and city
                if (userData.address && typeof userData.address === "object") {
                  const street = userData.address.street || "";
                  const city = userData.address.city || "";
                  this.userData.address =
                    street + (street && city ? ", " : "") + city;
                } else {
                  this.userData.address = userData.address || "";
                }

                this.userData.deliveredOrders = 
                  userData.deliveredOrders ? userData.deliveredOrders.toString() : "0";
                
                if (userData.email) this.userData.email = userData.email;
              }
            }

            this.isLoading = false;
          },
          (error) => {
            console.error("Error listening to user data:", error);
            this.isLoading = false;
          }
        );
      } else {
        this.userData = null;
        this.isLoading = false;
      }
    });
  },
  beforeUnmount() {
    // Unsubscribe from auth state changes
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    // Unsubscribe from Firestore snapshot listener
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
    }
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },

    async updateEmail(email) {
      // Update local state immediately for responsive UI
      this.userData.email = email;

      // Update Firestore - the snapshot listener will automatically update the UI
      if (this.user) {
        try {
          await updateDoc(doc(db, "users", this.user.uid), {
            email: email,
          });
        } catch (error) {
          console.error("Error updating email:", error);
        }
      }
    },

    async updatePhone(phone) {
      // Update local state immediately for responsive UI
      this.userData.phone = phone;

      // Update Firestore - the snapshot listener will automatically update the UI
      if (this.user) {
        try {
          await updateDoc(doc(db, "users", this.user.uid), {
            phone: phone,
          });
        } catch (error) {
          console.error("Error updating phone:", error);
        }
      }
    },

    async updateAddress(addressString) {
      // Update local state immediately for responsive UI
      this.userData.address = addressString;

      // When saving back to Firebase, we need to maintain the object structure
      if (this.user) {
        try {
          // Get the current address object from Firebase
          const userDoc = await getDoc(doc(db, "users", this.user.uid));
          let currentAddress = {};

          if (userDoc.exists()) {
            const userData = userDoc.data();
            currentAddress = userData.address || {};
          }

          // Parse the address string to extract street and city
          const parts = addressString.split(",").map((part) => part.trim());
          const street = parts[0] || "";
          const city = parts.length > 1 ? parts[1] : "";

          // Update the address object while preserving other fields
          await updateDoc(doc(db, "users", this.user.uid), {
            address: {
              ...currentAddress,
              street: street,
              city: city,
            },
          });
        } catch (error) {
          console.error("Error updating address:", error);
        }
      }
    },

    handleOrdersClick() {
      console.log("Orders clicked");
    },
  },
};
</script>
