import _ from 'lodash'

export const state = () => ({
  cookie: false,
  popupwelcome: true,
})

export const mutations = {

  SET_POPUPWELCOME(state, toggle) {
    state.popupwelcome = toggle
  },
}

export const getters = {

  // GET_ORDERED(state) {
  //   return state.ordered
  // }
}
