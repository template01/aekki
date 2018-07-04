import axios from 'axios'


export const state = () => ({
  rootApi: 'http://localhost:1337',
  test: '',
})

export const mutations = {

  SET_VIEWINGPOPUP(state, input) {
    state.viewingpopup = {'status':input.status,'message':input.message}
  },

  SET_GLOBALROOTAPI(state, url) {
    state.test = url
    if(url === 'http://localhost:3002'){
      state.rootApi = 'http://localhost:1337'
    }
    if(url === 'http://aekki.parkedthis.space'){
      state.rootApi = 'http://aekki-api.parkedthis.space'
    }
  },
}




export const actions = {
  // ONLY WORKS IN INDEX JS - THIS WILL SET/COMMIT THE COUPLED MODULES

  async nuxtServerInit({
    commit,store,dispatch,state,context
  }) {
    commit('SET_GLOBALROOTAPI',process.env.baseUrl)

    const { data } = await axios.get(state.rootApi+'/productview')
    commit('viewing/SET_ROOTAPI',state.rootApi)
  }
}
