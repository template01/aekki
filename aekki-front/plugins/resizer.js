import _ from 'lodash'

export default ({
  isClient,
  store
}) => {
  if (isClient) {

    store.commit('SET_WINDOWWIDTH', document.body.clientWidth)

    const detectScreensize = () => {
      store.commit('SET_WINDOWRESIZING', true)
      store.commit('SET_WINDOWWIDTH', document.body.clientWidth)

      setTimeout(function() {
        if (store.state.windowResizing) {
          store.commit('SET_WINDOWRESIZING', false)
        }
      }, 200)

    };

    function debounce(fn, delay) {
      var timer = null;
      return function() {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    }


    window.addEventListener('resize', debounce(function(event) {
      detectScreensize()
    }, 10));

  }
};
