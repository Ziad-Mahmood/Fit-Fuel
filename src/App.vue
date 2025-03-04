<template>
  <div>
    <Nav />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Nav from './components/layout/Nav.vue'
import Footer from './components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
</script>


