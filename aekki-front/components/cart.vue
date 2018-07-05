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
     cartOpen: 'cart/GET_CARTOPEN',
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


  watch:{
    cartOpen: function(){
      if(!this.cartOpen){
        Snipcart.api.modal.close()
      }
    }
  },
  methods: {


    snipCartOpen: function() {

      var vm = this

      Snipcart.subscribe('cart.opened', function() {
        setTimeout(function() {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        },250)
        console.log('Snipcart popup is visible');
        vm.$store.commit('cart/SET_CARTOPEN', true)

         $('#snipcart-header').find("#cartheader").remove()
         $('#snipcart-header').prepend('<h2 id="cartheader">Cart</h2>')

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
    var vm = this
    setTimeout(function(){
      Snipcart.api.items.clear()
      this.snipCartOpen()
      this.snipCartClose()
    },500)

  },
}
</script>
<style>
.snip-header{
  overflow: hidden
}

</style>
