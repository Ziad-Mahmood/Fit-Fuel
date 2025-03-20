export default {
  namespaced: true,
  state: {
    loading: false,
    selectedPlan: 'Monthly',
    plans: {
      Monthly: {
        subtitle: 'Our Signature Weekly Plan Sent to You Every Week',
        price: '4200',
        image: new URL('@/assets/images/plan.png', import.meta.url).href
      },
      Weekly: {
        subtitle: "What's Included in Your Weekly Plan?",
        price: '1250',
        image: new URL('@/assets/images/plan.png', import.meta.url).href
      },
      Daily: {
        subtitle: 'Fresh Meals Delivered Daily',
        price: '200',
        image: new URL('@/assets/images/plan.png', import.meta.url).href
      }
    },
    mealTypes: {
      Daily: {
        'Breakfast Meals': {
          count: 1,
          details: [
            '1 Egg-Based Dish',
            '1 Toast-Based',
            '1 Smoothie Option'
          ]
        },
        'Lunch Meals': {
          count: 2,
          details: [
            '1 Meat/Chicken Based Meal',
            '1 Fish/Vegetarian Option'
          ]
        },
        'Dinner Meals': {
          count: 1,
          details: [
            '1 Light Protein Meal',
            '1 Low-Carb Option'
          ]
        }
      },
      Weekly: {
        'Breakfast Meals': {
          count: 7,
          details: [
            '2 Egg-Based Dishes',
            '2 Dairy & Cereal Meals',
            '2 Toast-Based',
            '1 Smoothie Bowl'
          ]
        },
        'Lunch Meals': {
          count: 14,
          details: [
            '5 Meat-Based Meals',
            '5 Chicken-Based Meals',
            '4 Fish-Based Meals'
          ]
        },
        'Dinner Meals': {
          count: 7,
          details: [
            '3 Light Protein Meals',
            '2 Vegetarian Dishes',
            '2 Low-Carb Options'
          ]
        }
      },
      Monthly: {
        'Breakfast Meals': {
          count: 7,
          details: [
            '2 Egg-Based Dishes',
            '2 Dairy & Cereal Meals',
            '2 Toast-Based',
            '1 Smoothie Bowl'
          ]
        },
        'Lunch Meals': {
          count: 14,
          details: [
            '5 Meat-Based Meals',
            '5 Chicken-Based Meals',
            '4 Fish-Based Meals'
          ]
        },
        'Dinner Meals': {
          count: 7,
          details: [
            '3 Light Protein Meals',
            '2 Vegetarian Dishes',
            '2 Low-Carb Options'
          ]
        }
      }
    }
  },
  mutations: {
    SET_SELECTED_PLAN(state, plan) {
      state.selectedPlan = plan
    },
    SET_LOADING(state, value) {
      state.loading = value
    }
  },
  actions: {
    selectPlan({ commit }, plan) {
      commit('SET_SELECTED_PLAN', plan)
    },
    initializePlansData({ commit }) {
      commit('SET_LOADING', true)
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 500)
    }
  },
  getters: {
    currentPlan: state => state.plans[state.selectedPlan],
    currentMealTypes: state => state.mealTypes[state.selectedPlan]
  }
}