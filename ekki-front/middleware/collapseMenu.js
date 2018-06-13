export default function ({ route,store,server }) {
  // return axios.post('http://my-stats-api.com', {
  //   url: route.fullPath
  // })
  // alert('hjey')


  // Don't use the middleware on server-side
  if (server) return

  setTimeout(function() {
    store.commit('menu/SET_TOGGLEMENU', false)
  }, 150);

}
