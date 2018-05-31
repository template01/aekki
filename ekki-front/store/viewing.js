import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  rootApi: '',
  viewingpopup:false
})

export const mutations = {

  SET_VIEWINGPOPUP(state, toggle) {
    state.viewingpopup = toggle
  },

  SET_ROOTAPI(state, url) {
    state.rootApi = url
  },
}

export const getters = {

  GET_VIEWINGPOPUP(state) {
    return state.viewingpopup
  }
}
