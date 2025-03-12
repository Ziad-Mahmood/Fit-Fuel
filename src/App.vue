<template>
  <div>
    <Nav />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import { auth, db } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { logoutUser } from './firebase/auth'
import Nav from "./components/layout/Nav.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  name: "App", 
  components: {    Nav,    Footer,  },
  data() {
    return {
      userUnsubscribe: null
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userUnsubscribe = onSnapshot(doc(db, 'users', user.uid), async (doc) => {
          if (doc.exists() && doc.data().banned) {
            await logoutUser();
            this.$swal.fire({
              title: 'Account Banned',
              text: 'Your account has been temporarily banned. Please contact support for assistance.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            this.$router.push('/login');
          }
        });
      } else if (this.userUnsubscribe) {
        this.userUnsubscribe();
        this.userUnsubscribe = null;
      }
    });
  },
  beforeUnmount() {
    if (this.userUnsubscribe) {
      this.userUnsubscribe();
    }
  }
}
</script>
