<template>
<section class="container">
  <div>
    <!-- <button @click="updateView(productviewid,false)">removeView</button> -->
    <!-- <input v-model="input" type="text" /> -->

    <!-- {{wallets}} -->
    <!-- {{viewing}} -->
    <!-- {{wallet}} -->
    <h1>wallet page<br /></h1>
    <div :key="wallet.id">
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
</section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

import _ from 'lodash';

export default {
  components: {
    AppLogo
  },
  data: function() {
    return {
      input: 'test',
      productviewid: '',
      viewing: [],
      wallet: [],
      exist: false

    }
  },
  methods: {

    checkIfViewExist: function() {
      var vm = this
      fetch('http://localhost:1337/productview?viewingid=' + this.$route.params.slug, {
          method: 'get'
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            console.log(data.length)
            if (data.length === 0) {
              vm.createView()
            } else {
              console.log()
              vm.productviewid = data[0].id
              vm.updateView(vm.productviewid, true)
            }
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
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
          res.json().then((data) => console.log(data));
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
    removeView: function() {
      fetch('http://localhost:1337/productview', {
          method: 'post',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: `viewingid=` + this.$route.params.slug + '&viewing=false'
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then((data) => console.log(data));
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
    getWallet: function() {
      var vm = this
      fetch('http://localhost:1337/wallets/' + vm.$route.params.slug, {
          method: 'get',
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            vm.wallet = data
          });
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
  },
  created() {
    // TRYING TO DETECT BROWSER CLOSE/NEW LINK TO FALSE THE viewing
    // HAS TO BE DONE WITH A TIMEOUT IN SOCKETS..... SERVERSIDE
    // if (process.browser) {
    //
    //   window.onbeforeunload = function() {
    //     return "Are you sure you want to close the window?";
    //   }
    // }
    //
  },
  beforeDestroy() {
    this.updateView(this.productviewid, false)
  },
  mounted() {
    this.checkIfViewExist()
    this.getWallet()
    // this.sendView()
    // connect user throught socket
    const socket = io('http://localhost:1337');
    socket.on('hello', (res) => console.log(res));
    var vm = this
    // socket.on('food_ready', res => vm.viewing.push[res]);
    // socket.on('food_ready', res => food.innerHTML += `<div>- ${res.name} is ${res.rating}/5 so delicious</div>`);

    // socket.on('food_ready', (res) => console.log(res) this.viewing =['hey']);

    socket.on('food_ready', function(data) {
      vm.viewing.push(data)
    });

    // console.log(socket)
    // const socket = io();
    // socket.connect('http://localhost:1337');
    // // listen for event name 'hello' & log it
    // socket.on('hello', (res) => console.log(res));
  }
}
</script>

<style>

</style>
