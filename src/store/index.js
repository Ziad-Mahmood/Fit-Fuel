import { createStore } from 'vuex'
import plans from './modules/plans'
import cart from './modules/cart'

export default createStore({
  modules: {
    plans,
    cart
    // ... other modules
  }
})