<template>
  <div>
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
    //  viewingpopup: 'viewing/GET_VIEWINGPOPUP',
   })
 },
  data: function() {
    return {
      input: 'test',
      viewing: [],
      products: [],
      testFind: ["5b08930d887ab91a3e0d19e3", "true"]

    }
  },

  methods: {


    snipCartOpen: function() {
      var vm = this
      Snipcart.subscribe('cart.opened', function() {
        console.log('Snipcart popup is visible');
        vm.$store.commit('cart/SET_CARTOPEN', true)
      });

    },

    snipCartClose: function(){
      var vm = this
      Snipcart.subscribe('cart.closed', function() {
        console.log('Snipcart popup is visible');
        vm.$store.commit('cart/SET_CARTOPEN', false)
        Snipcart.api.items.clear()
      });
      // Snipcart.unsubscribe('cart.closed');
    },


    snipOrderComplete: function() {
      var ordered = false
      var vm = this
      Snipcart.subscribe('order.completed', function(data) {
        // vm.$store.commit('order/SET_ORDERED',true)
        console.log(data);
        vm.emitOrderTokenServer(data.token)
        // if(vm.ordered){
        Snipcart.subscribe('cart.closed', function() {
          // vm.$store.commit('order/SET_ORDERED',false)
          Snipcart.unsubscribe('cart.closed');
        });
        // }
      });
    },


  },
  beforeDestroy() {
    Snipcart.api.items.clear()
  },

  mounted() {
    this.snipCartOpen()
    this.snipCartClose()

  },
}
</script>
<style>

</style>
