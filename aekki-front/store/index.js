import axios from 'axios'


export const state = () => ({
  rootApi: process.env.baseUrl,
})

export const mutations = {

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
