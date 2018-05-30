import axios from 'axios'

// Vue.use(VueSocketIO, SocketInstance)

export const state = () => ({
  rootApi: 'http://localhost:1337',
  isConnected: false,
  message: 't',
  socketMessage: 'x'
})

export const mutations = {

    SOCKET_CONNECT(state) {
      console.log('USER IS CONNECTED TO THE SOCKET')
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },
    SOCKET_hello(state, message) {
      console.log('XXXXXXXXXXXXXXXXXXXXXXXX')
  state.socketMessage = message
},

    SOCKET_USER_MESSAGE: (state,  message) => {
         state.message = message;
         console.log('hey')

     }
}



export const actions = {
  // ONLY WORKS IN INDEX JS - THIS WILL SET/COMMIT THE COUPLED MODULES

  socket_hello: (context, message) => {
    console.log('hey')
      context.dispatch('newMessage', message);
      context.commit('NEW_MESSAGE_RECEIVED', message);
      if (message.is_important) {
          context.dispatch('alertImportantMessage', message);
      }
  },


  async nuxtServerInit({
    commit,store,dispatch,state
  }) {
    // store.GET_STARS()
    // dispatch('viewing/GET_STARS');
    // console.log(state.rootApi)
    // export const SocketInstance = io('http://localhost:1337');

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    // const socket = io('http://localhost:1337');

    const { data } = await axios.get(state.rootApi+'/productview')
    // console.log(data)
    commit('viewing/SET_ROOTAPI',state.rootApi)
    commit('viewing/SET_EMPLOYEES',data)

    // commit('viewing/setEmployees', [1, 2, 3])

    // async fetch({
    //   store,
    //   params
    // }) {
    //   await store.commit('viewing/setEmployees', [1, 2, 3])
    // }
  }
}
