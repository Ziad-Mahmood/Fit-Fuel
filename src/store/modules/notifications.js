export default {
  namespaced: true,
  state: {
    hasUnreadOrders: false,
    lastSeenTimestamp: null,
    notifications: []
  },
  mutations: {
    SET_UNREAD_ORDERS(state, value) {
      state.hasUnreadOrders = value;
    },
    SET_LAST_SEEN(state, timestamp) {
      state.lastSeenTimestamp = timestamp;
      localStorage.setItem('lastSeenOrderUpdate', timestamp);
    },
    ADD_NOTIFICATION(state, notification) {
      // Check for duplicates
      const existingIndex = state.notifications.findIndex(n => n.id === notification.id);
      if (existingIndex !== -1) {
        state.notifications.splice(existingIndex, 1);
      }
      
      state.notifications.unshift(notification);
      // Keep only the latest 10 notifications
      if (state.notifications.length > 10) {
        state.notifications.pop();
      }
      
      // Always set unread flag when adding a notification
      state.hasUnreadOrders = true;
    },
    CLEAR_NOTIFICATIONS(state) {
      state.notifications = [];
    }
  },
  actions: {
    markOrdersAsSeen({ commit }) {
      const timestamp = new Date().toISOString();
      commit('SET_LAST_SEEN', timestamp);
      commit('SET_UNREAD_ORDERS', false);
    },
    
    checkForNewOrders({ commit, state }, orderUpdate) {
      if (!orderUpdate || !orderUpdate.id) {
        return;
      }
      
      // Add notification
      commit('ADD_NOTIFICATION', {
        id: orderUpdate.id,
        message: `Order status changed to: ${orderUpdate.status || 'Updated'}`,
        timestamp: orderUpdate.timestamp || new Date().toISOString(),
        read: false,
        status: orderUpdate.status
      });
      
      // Play notification sound
      try {
        const audio = new Audio('/src/assets/sounds/notification.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
      } catch (error) {
        console.error('Error playing notification sound:', error);
      }
      
      // Show SweetAlert notification
      import('sweetalert2').then((Swal) => {
        Swal.default.fire({
          title: 'Order Updated',
          text: `Your order status changed to: ${orderUpdate.status || 'Updated'}`,
          icon: 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000
        });
      }).catch(error => {
        console.error('Error showing notification:', error);
      });
    },
    
    initNotifications({ commit }) {
      const lastSeen = localStorage.getItem('lastSeenOrderUpdate');
      if (lastSeen) {
        commit('SET_LAST_SEEN', lastSeen);
      }
      
      // Check for any unread notifications in localStorage
      const unreadNotifications = localStorage.getItem('unreadNotifications');
      if (unreadNotifications) {
        try {
          const parsedNotifications = JSON.parse(unreadNotifications);
          if (Array.isArray(parsedNotifications) && parsedNotifications.length > 0) {
            parsedNotifications.forEach(notification => {
              commit('ADD_NOTIFICATION', notification);
            });
          }
        } catch (error) {
          console.error('Error parsing unread notifications:', error);
        }
      }
    },
    
    saveNotificationsToStorage({ state }) {
      localStorage.setItem('unreadNotifications', JSON.stringify(state.notifications));
    }
  },
  getters: {
    hasUnreadOrders: state => state.hasUnreadOrders,
    notifications: state => state.notifications,
    unreadCount: state => state.notifications.filter(n => !n.read).length
  }
};