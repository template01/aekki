<template>
<section class="container">
  <div v-if="initiatePage" :style="isBeingViewed?{'opacity':'0.5'}:{'opacity':'1'}">
    <nuxt-link :to="'/'"><h1>home</h1></nuxt-link>
    <h1>wallet page<br /></h1> {{baseUrl+$route.path}}
    <div :key="$route.params.slug">
      <h1>
          <span v-if="wallet['Color: yellow']" style="color:yellow; font-size:200%">●</span>
          <span v-if="wallet['Color: blue']" style="color:blue; font-size:200%">●</span>
          <span v-if="wallet['Color: red']" style="color:red; font-size:200%">●</span>

        </h1>

      <!-- {{wallet}} -->
      <br />
      <!-- {{wallet.productimage_a}} -->
      <img v-if="wallet.productimage_a" :src="'http://localhost:1337'+wallet.productimage_a.url" />
      <!-- <img :src="'http://localhost:1337'+wallet.productimage_a.url" /> -->

    </div>
  </div>
  <button class="snipcart-add-item" :data-item-id="$route.params.slug" :data-item-name="'wallet'+$route.params.slug" data-item-price="19.99" data-item-max-quantity="1" data-item-weight="20" :data-item-url="baseUrl+$route.path" data-item-description="wallet">
    Buy wallet {{$route.params.slug}}
  </button>
</section>
</template>

<script>
import _ from 'lodash';
// import {
//   mapGetters
// } from 'vuex'


export default {
  components: {
  },
  data: function() {
    return {
      input: 'test',
      productviewid: '',
      viewing: [],
      isBeingViewed: false,
      wallet: [],
      exist: false,
      initiatePage: false,
      baseUrl: ''

    }
  },
 //  computed: {
 //   // mix the getters into computed with object spread operator
 //   ...mapGetters({
 //     ordered: 'order/GET_ORDERED',
 //   })
 // },
  methods: {

    emitOrderTokenServer: function(data){
      const socket = io('http://localhost:1337');
      socket.emit ('item ordered', data)
    },

    snipCartOpen: function() {
      Snipcart.subscribe('cart.opened', function() {
        console.log('Snipcart popup is visible');
      });
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
            console.log('Snipcart popup has been closed');
            alert('Snipcart popup has been closed');
            // vm.$store.commit('order/SET_ORDERED',false)
            Snipcart.unsubscribe('cart.closed');
          });
        // }
      });
    },


    setUrl: function() {
      if (process.browser) {
        this.baseUrl = window.location.origin
      }
    },

    checkIfViewExist: function() {
      var vm = this
      fetch('http://localhost:1337/productview?viewingid=' + this.$route.params.slug, {
          method: 'get'
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            if (data.length === 0) {
              vm.createView()
            } else {
              console.log(data[0].viewing)
              vm.productviewid = data[0].id
              vm.updateView(vm.productviewid, true)

              // IF VIEWING
              if (data[0].viewing) {
                vm.isBeingViewed = true
                //PUSH ROUTER TO HOME + SET STATE SORRY BEING VIEWED MODAL
                vm.sendToIndex('isviewed')
              }else{
                vm.getWallet()
              }
              // if(!vm.isBeingViewed){
              //   vm.initiatePage = true
              // }
            }
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    sendToIndex: function(messageCode){
      this.$store.commit('viewing/SET_VIEWINGPOPUP', {'status':true,'message':messageCode})
      this.$router.push({
        path: '/'
      })
    },
    updateView: function(id, state) {
      console.log('send')
      fetch('http://localhost:1337/productview/' + id, {
          method: 'put',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: 'viewing=' + state
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            console.log(data)
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    createView: function() {
      var vm = this
      fetch('http://localhost:1337/productview', {
          method: 'post',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: `viewingid=` + this.$route.params.slug + '&viewing=true'
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            vm.productviewid = data._id
          })
          // res.json().then((data) => console.log(data));
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    getWallet: function() {
      var vm = this
      fetch('http://localhost:1337/wallets/' + vm.$route.params.slug, {
          method: 'get',
        })
        .then((res) => {
          if (res.status !== 200){
            vm.sendToIndex('notexist')
          }
          res.json().then(function(data) {
            vm.initiatePage = true
            vm.wallet = data
            // vm.checkIfViewExist()
            vm.snipCartOpen()
            vm.snipOrderComplete()
            const socket = io('http://localhost:1337');
            socket.on('hello', (res) => console.log(res));

          });
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
  },
  created() {
    this.setUrl()
  },
  beforeDestroy() {
    Snipcart.api.items.clear()
    if (!this.isBeingViewed) {
      this.updateView(this.productviewid, false)
    }
  },
  mounted() {
      this.checkIfViewExist()

  }
}
</script>

<style>

</style>
