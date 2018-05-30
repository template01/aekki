import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  counter: 2,
  employees: [0],
  rootApi: ''
})

export const mutations = {

  SET_ROOTAPI(state, url) {
    state.rootApi = url
  },
  SET_EMPLOYEES(state, test) {
    state.employees = test
  }
}
//
// export const actions = {
//   async GET_STARS({
//     commit,state
//   }) {
//     // state.employees = [2,3]
//     // console.log(state.rootApi)
//     const { data } = await axios.get(state.rootApi)
//     // console.log(data)
//     commit('SET_INCREMENT')
//     commit('SET_EMPLOYEES', [1,2,3,4])
//   }
// }
