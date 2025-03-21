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
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore'
import { logoutUser } from './firebase/auth'
import Nav from "./components/layout/Nav.vue";
import Footer from "./components/layout/Footer.vue";
import mitt from 'mitt'

const emitter = mitt()

export default {
  name: "App", 
  components: { Nav, Footer },
  data() {
    return {
      userUnsubscribe: null,
      ordersUnsubscribe: null
    }
  },
  created() {
    window.emitter = emitter;
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch('cart/initializeCart');
        
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
        
        this.setupOrdersListener(user.uid);
      } else {
        this.$store.dispatch('cart/cleanup');
        
        if (this.userUnsubscribe) {
          this.userUnsubscribe();
          this.userUnsubscribe = null;
        }
        
        if (this.ordersUnsubscribe) {
          this.ordersUnsubscribe();
          this.ordersUnsubscribe = null;
        }
      }
    });
    
    this.$router.beforeEach((to, from, next) => {
      if (to.path === '/order-tracking') {
        window.emitter.emit('orders-viewed');
      }
      next();
    });
  },
  methods: {
    setupOrdersListener(userId) {
      if (this.ordersUnsubscribe) {
        this.ordersUnsubscribe();
      }
      
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', userId)
        );
        
        this.ordersUnsubscribe = onSnapshot(q, (snapshot) => {
          if (snapshot.docs.length > 0) {
            snapshot.docChanges().forEach(change => {
              if (change.type === "modified" || change.type === "added") {
                const orderData = change.doc.data();
                
                this.$store.dispatch('notifications/checkForNewOrders', {
                  id: change.doc.id,
                  status: orderData.status || 'Order Placed',
                  timestamp: orderData.timestamp
                });
                
                window.emitter.emit('order-update', {
                  id: change.doc.id,
                  status: orderData.status || 'Order Placed',
                  timestamp: orderData.timestamp
                });
              }
            });
          }
        });
      } catch (error) {
        console.error('Error setting up orders listener:', error);
      }
    }
  },
  beforeUnmount() {
    if (this.userUnsubscribe) {
      this.userUnsubscribe();
    }
    if (this.ordersUnsubscribe) {
      this.ordersUnsubscribe();
    }
    this.$store.dispatch('cart/cleanup');
  }
}
</script>

