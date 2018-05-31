<template>
  <div @click="$store.commit('viewing/SET_VIEWINGPOPUP',false)" v-if="viewingpopup" class="viewingpopup">
    <div class="inner">
      Solly, the item is being viewed by someone else...
      <button @click="$store.commit('viewing/SET_VIEWINGPOPUP',false)">its ok!</button>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

// import _ from 'lodash';

export default {
  components: {},
  computed: {
   // mix the getters into computed with object spread operator
   ...mapGetters({
     viewingpopup: 'viewing/GET_VIEWINGPOPUP',
   })
 },
  data: function() {
    return {
      input: 'test',
      viewing: [],
      wallets: [],
      testFind: ["5b08930d887ab91a3e0d19e3", "true"]

    }
  },
}
</script>
<style>
  .viewingpopup{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 99999;
  }
  .viewingpopup .inner{
    background: black;
    color: white;
  }
</style>
