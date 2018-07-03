import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  cartOpen: false,
})

export const mutations = {

  SET_CARTOPEN(state, toggle) {
    state.cartOpen = toggle
  },
}

export const getters = {

  GET_CARTOPEN(state) {
    return state.cartOpen
  }
}
