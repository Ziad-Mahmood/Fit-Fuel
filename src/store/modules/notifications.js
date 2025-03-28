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
      if (state.notifications.length > 5) {
        state.notifications.pop();
      }
      
      // Always set unread flag when adding a notification
      state.hasUnreadOrders = true;
    },
    CLEAR_NOTIFICATIONS(state) {
      state.notifications = [];
    },
    MARK_NOTIFICATION_READ(state, notificationId) {
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
      
      // Check if all notifications are read
      const allRead = state.notifications.every(n => n.read);
      if (allRead) {
        state.hasUnreadOrders = false;
      }
    },
    MARK_ALL_READ(state) {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.hasUnreadOrders = false;
    }
  },
  actions: {
    markOrdersAsSeen({ commit, state, rootState }) {
      const timestamp = new Date().toISOString();
      commit('SET_LAST_SEEN', timestamp);
      commit('MARK_ALL_READ');
      commit('SET_UNREAD_ORDERS', false);
      
      // Save to localStorage
      localStorage.setItem('unreadNotifications', JSON.stringify(state.notifications));
      
      // Update read status in Firestore for all notifications
      if (rootState.auth && rootState.auth.user) {
        const userId = rootState.auth.user.uid;
        
        import('firebase/firestore').then(({ collection, query, where, getDocs, updateDoc, doc }) => {
          import('@/firebase/config').then(({ db }) => {
            const notificationsRef = collection(db, 'notifications');
            const q = query(notificationsRef, where('userId', '==', userId), where('read', '==', false));
            
            getDocs(q).then((querySnapshot) => {
              querySnapshot.forEach((document) => {
                updateDoc(doc(db, 'notifications', document.id), {
                  read: true,
                  readAt: new Date()
                }).catch(error => {
                  console.error('Error updating notification read status:', error);
                });
              });
            }).catch(error => {
              console.error('Error querying notifications:', error);
            });
          });
        });
      }
    },
    
    markNotificationRead({ commit, state }, notificationId) {
      commit('MARK_NOTIFICATION_READ', notificationId);
      
      // Save to localStorage
      localStorage.setItem('unreadNotifications', JSON.stringify(state.notifications));
      
      // Update read status in Firestore for this notification
      import('firebase/firestore').then(({ collection, query, where, getDocs, updateDoc, doc }) => {
        import('@/firebase/config').then(({ db }) => {
          const notificationsRef = collection(db, 'notifications');
          const q = query(notificationsRef, where('orderId', '==', notificationId), where('read', '==', false));
          
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((document) => {
              updateDoc(doc(db, 'notifications', document.id), {
                read: true,
                readAt: new Date()
              }).catch(error => {
                console.error('Error updating notification read status:', error);
              });
            });
          }).catch(error => {
            console.error('Error querying notifications:', error);
          });
        });
      });
    },
    
    checkForNewOrders({ commit, state, rootState }, orderUpdate) {
      if (!orderUpdate || !orderUpdate.id) {
        return;
      }
      
      const notification = {
        id: orderUpdate.id,
        message: `Order status changed to: ${orderUpdate.status || 'Updated'}`,
        timestamp: orderUpdate.timestamp || new Date().toISOString(),
        read: false,
        status: orderUpdate.status
      };
      
      commit('ADD_NOTIFICATION', notification);
      
      // Save to localStorage
      localStorage.setItem('unreadNotifications', JSON.stringify(state.notifications));
      
      // Add notification to Firestore
      if (rootState.auth && rootState.auth.user) {
        const userId = rootState.auth.user.uid;
        
        import('firebase/firestore').then(({ collection, addDoc, serverTimestamp }) => {
          import('@/firebase/config').then(({ db }) => {
            const notificationsRef = collection(db, 'notifications');
            
            addDoc(notificationsRef, {
              userId: userId,
              orderId: orderUpdate.id,
              message: `Order status changed to: ${orderUpdate.status || 'Updated'}`,
              status: orderUpdate.status || 'Updated',
              read: false,
              createdAt: serverTimestamp()
            }).catch(error => {
              console.error('Error adding notification to Firestore:', error);
            });
          });
        });
      }
      
      // Play notification sound
      try {
        const audio = new Audio('/src/assets/sounds/notification.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
      } catch (error) {
        console.error('Error playing notification sound:', error);
      }
      
      // Show SweetAlert notification with click handler
      import('sweetalert2').then((Swal) => {
        Swal.default.fire({
          title: 'Order Updated',
          text: `Your order status changed to: ${orderUpdate.status || 'Updated'}`,
          icon: 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.default.stopTimer);
            toast.addEventListener('mouseleave', Swal.default.resumeTimer);
            toast.addEventListener('click', () => {
              commit('MARK_NOTIFICATION_READ', orderUpdate.id);
              localStorage.setItem('unreadNotifications', JSON.stringify(state.notifications));
              Swal.default.close();
            });
          }
        });
      }).catch(error => {
        console.error('Error showing notification:', error);
      });
    },
    
    initNotifications({ commit, rootState }) {
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
            
            // Check if all notifications are read
            const allRead = parsedNotifications.every(n => n.read);
            if (allRead) {
              commit('SET_UNREAD_ORDERS', false);
            }
          }
        } catch (error) {
          console.error('Error parsing unread notifications:', error);
        }
      }
      
      // Also fetch notifications from Firestore
      if (rootState.auth && rootState.auth.user) {
        const userId = rootState.auth.user.uid;
        
        import('firebase/firestore').then(({ collection, query, where, getDocs, orderBy, limit }) => {
          import('@/firebase/config').then(({ db }) => {
            const notificationsRef = collection(db, 'notifications');
            const q = query(
              notificationsRef, 
              where('userId', '==', userId),
              orderBy('createdAt', 'desc'),
              limit(5)
            );
            
            getDocs(q).then((querySnapshot) => {
              const firestoreNotifications = [];
              querySnapshot.forEach((doc) => {
                firestoreNotifications.push({
                  id: doc.data().orderId,
                  message: doc.data().message,
                  timestamp: doc.data().createdAt.toDate().toISOString(),
                  read: doc.data().read || false,
                  status: doc.data().status || 'Updated'
                });
              });
              
              // Merge with local notifications
              firestoreNotifications.forEach(notification => {
                commit('ADD_NOTIFICATION', notification);
              });
              
              // Check if all notifications are read
              const allRead = state.notifications.every(n => n.read);
              if (allRead) {
                commit('SET_UNREAD_ORDERS', false);
              } else {
                commit('SET_UNREAD_ORDERS', true);
              }
            }).catch(error => {
              console.error('Error fetching notifications from Firestore:', error);
            });
          });
        });
      }
    }
  },
  getters: {
    hasUnreadOrders: state => state.hasUnreadOrders,
    notifications: state => state.notifications,
    unreadCount: state => state.notifications.filter(n => !n.read).length
  }
};