import axios from 'axios'


export const state = () => ({
  rootApi: process.env.baseUrl,
  windowWidth: 0,
  windowResizing: false,
})

export const mutations = {
  SET_WINDOWWIDTH: function(state,input){
    state.windowWidth = input
  },
  SET_WINDOWRESIZING: function(state,input){
    state.windowResizing = input
  }
}

export const getters = {
  GET_WINDOWWIDTH(state) {
    return state.windowWidth
  },
  GET_WINDOWRESIZING(state) {
    return state.windowResizing
  }
}


export const actions = {
  // ONLY WORKS IN INDEX JS - THIS WILL SET/COMMIT THE COUPLED MODULES

  async nuxtServerInit({
    commit,store,dispatch,state
  }) {

    const { data } = await axios.get(state.rootApi+'/productview')
    commit('viewing/SET_ROOTAPI',state.rootApi)
  }
}
