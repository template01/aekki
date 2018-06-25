import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  cartopen: false,
})

export const mutations = {

  SET_CARTOPEN(state, toggle) {
    state.cartopen = toggle
  },
}

export const getters = {

  GET_CARTOPEN(state) {
    return state.cartopen
  }
}
