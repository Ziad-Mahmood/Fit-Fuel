import { createStore } from 'vuex'
import plans from './modules/plans'
import cart from './modules/cart'
import notifications from './modules/notifications'

export default createStore({
  modules: {
    plans,
    cart,
    notifications
  }
})