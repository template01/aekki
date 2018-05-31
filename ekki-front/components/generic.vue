<template>
  <div class="">

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

</style>
