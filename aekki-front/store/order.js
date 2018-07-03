import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  rootApi: '',
  ordered:false,
  prices:{
    "ækki-one":"20EUR"
  }
})

export const mutations = {

  SET_ORDERED(state, toggle) {
    state.ordered = toggle
  },
}

export const getters = {

  GET_ORDERED(state) {
    return state.ordered
  }
}
