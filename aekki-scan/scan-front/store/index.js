import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      jwtAuthToken: 10,
      sideA: {state:false,data:''},
      sideB: {state:false,data:''},
      blob:''

    },
    mutations: {
      setSide (state,input) {
        if(input.side === 'sideA'){
          state.sideA = {state:input.state,data:input.response}
        }
        if(input.side === 'sideB'){
          state.sideB = {state:input.state,data:input.response}
        }
      },
      setBlob (state,input) {
        state.blob = input
      },
      setAuthToken (state,input) {
        state.jwtAuthToken = input
      },
      setImageBlob(state,input){
        state.imageBlobs.push(input)
      }
    }
  })
}

export default createStore
