import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  rootApi: '',
  viewingpopup:{'status':false,'message':''}
})

export const mutations = {

  SET_VIEWINGPOPUP(state, input) {
    state.viewingpopup = {'status':input.status,'message':input.message}
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
