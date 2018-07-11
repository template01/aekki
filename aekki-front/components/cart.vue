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


  watch: {
    cartOpen: function() {
      if (!this.cartOpen) {
        Snipcart.api.modal.close()
      }
    }
  },
  methods: {

    checkIfUserLoggedIn: function() {

      if (Snipcart.api.user.current() != null) {
        // your code here.
        $('#snipcart-close').css({
          'top': '42px'
        })

      }else{
        $('#snipcart-close').css({
          'top': '0px'
        })
      }
    },

    snipCartLogOutEvent: function() {
      var vm = this
      Snipcart.subscribe('user.loggedout', function() {
        vm.$store.commit('cart/SET_CARTOPEN', false)
        vm.$store.commit('menu/SET_TOGGLEMENU', false);
      });
    },

    snipCartOpen: function() {

      var vm = this


      Snipcart.subscribe('cart.opened', function() {
        setTimeout(function() {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }, 250)
        console.log('Snipcart popup is visible');
        vm.$store.commit('cart/SET_CARTOPEN', true)
        vm.$store.commit('menu/SET_TOGGLEMENU', false);

        $('#snipcart-header').find("#cartheader").remove()
        $('#snipcart-header').prepend('<h2 id="cartheader">Claim</h2>')
        vm.checkIfUserLoggedIn()

      });



      Snipcart.subscribe('page.changed', function(page) {

        if (page === 'cart-content') {
          $("#snipcart-steps").show()
        }
        if (page === 'shipping-method') {
          $("#snipcart-shippings-list").append($('.snip-pickup-in-rotterdam'))
          $("#snipcart-shippings-list").find('.snip-pickup-in-rotterdam').parent().after().append(
            '<td class="addressWrapper snip-table__cell--right snip-table__cell--highlight"><p class="address snip-product__important">Schedule a pickup? Just write <a href="mailto:PICKUP@AEKKI.NL?Subject=PRODUCT PICKUP" target="_top">PICKUP@AEKKI.NL</a></p></td>'
          )
          $("#snipcart-shippings-list").append($('.snip-bundle-with-previous-order-previous-order-must-have-been-placed-today'))

          $("#snipcart-shippings-list").find('.js-selected').removeClass('js-selected')
          $("#snipcart-shippings-list").find('.snip-product--selectable-item').first().trigger("click");
        }
        if (page === 'customer/orders-history') {
          $('#snipcart-header').find("#cartheader").remove()
          $('#snipcart-header').prepend('<h3 id="cartheader">Orders</h3>')
        }
        if (page === 'customer/profile') {
          $('#snipcart-header').find("#cartheader").remove()
          $('#snipcart-header').prepend('<h3 id="cartheader">Profile</h3>')
        }
        if (page === 'login') {
          $('#snipcart-header').find("#cartheader").remove()
          $('#snipcart-header').prepend('<h3 id="cartheader">Login</h3>')
          $('#snipcart-close').css({
            'top': '0px'
          })

        }
        if (page != 'login') {
          console.log('not LOGIN')
          vm.checkIfUserLoggedIn()
          // alert('not login')
        }
        console.log(page)
      });

    },

    snipCartClose: function() {
      var vm = this
      Snipcart.subscribe('cart.closed', function() {
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
    this.$router.replace({
      hash: ''
    })
    setTimeout(function() {
      Snipcart.api.items.clear()
      vm.snipCartOpen()
      vm.snipCartClose()
      vm.snipCartLogOutEvent()
    }, 500)

  },

  watch: {
    'cartOpen': function() {
      if (this.cartOpen) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "scroll";
        Snipcart.api.modal.close();
      }
    }
  }
}
</script>
<style>
.snip-header {
  overflow: hidden
}
</style>
