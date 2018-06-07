import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  menuOpen: false,
})

export const mutations = {

  SET_TOGGLEMENU(state, toggle) {
    state.menuOpen = toggle
  },
}

export const getters = {

  // GET_ORDERED(state) {
  //   return state.ordered
  // }
}
