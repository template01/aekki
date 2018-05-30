<template>
<section class="container">
  <div>
    <!-- {{$store.state.viewing.employees}} -->
    {{$store.state.isConnected}} {{$store.state.message}} {{$store.state.socketMessage}}
    <h1>Index page<br /></h1>
    <button @click="$store.commit('viewing/SET_INCREMENT')">xxxx{{ $store.state.counter }}</button>

    <!-- <input v-model="input" type="text" /> -->
    <div :style="wallet.viewing ? {'opacity':'0.2','pointer-events':'none','cursor':'not-allowed'}:{}" :key="wallet.id" v-for="wallet in  wallets">
      <nuxt-link :to="'/wallets/'+wallet.id">
        {{wallet.id}}<br><img :src="'http://localhost:1337'+wallet.productimage_a.url" />
      </nuxt-link>
    </div>
    <!-- {{wallets}} -->
  </div>
</section>
</template>

<script>
import {
  mapMutations
} from 'vuex'

import _ from 'lodash';
import VueSocketio from 'vue-socket.io'

export default {
  components: {},
  data: function() {
    return {
      input: 'test',
      viewing: [],
      wallets: [],
      testFind: ["5b08930d887ab91a3e0d19e3", "true"]

    }
  },
  methods: {
    sendView: function() {
      fetch('http://localhost:1337/productview', {
          method: 'post',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: `viewingid=` + this.input
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then((data) => console.log(data));
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
    getInitViewing: function() {
      var vm = this
      fetch('http://localhost:1337/productview', {
          method: 'get',
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            // console.log(data)

            var pickedData = _.map(data, function(object) {
              // return _.pick(object, ['viewingid', 'rating']);
              return _.pick(object, ['viewingid', 'viewing']);
            });
            vm.viewing = pickedData
            for (var i = 0, len = vm.viewing.length; i < len; i++) {
              vm.setWalletView([vm.viewing[i].viewingid.toString(), vm.viewing[i].viewing.toString()])
            }
          });
          // console.log(res)
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
    getWallets: function() {
      var vm = this
      fetch('http://localhost:1337/wallets', {
          method: 'get',
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            // console.log(data)

            // var pickedData = _.map(data, function(object) {
            //   // return _.pick(object, ['viewingid', 'rating']);
            //   return _.pick(object, ['viewingid']);
            // });
            vm.wallets = data
            vm.getInitViewing()

          });
          // console.log(res)
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
    setWalletView: function(input) {
      // console.log('xxxxxxxxxxxxxxxxxxxx' + input)
      var item = _.find(this.wallets, function(item) {
        return item.id == input[0];
      });
      var index = _.indexOf(this.wallets, item);
      console.log(input)
      console.log('change TRIGGERED')
      // var parse = JSON.parse(input)
      if (input[1] === "true") {
        this.$set(this.wallets[index], 'viewing', true)
      }
      if (input[1] === "false") {
        this.$set(this.wallets[index], 'viewing', false)
      }
      // this.$set(this.wallets[index],'viewing',false)

    }
  },
  created() {
    // this.viewing =
  },


  mounted() {
    this.getWallets()
    // connect user throught socket
    const socket = io('http://localhost:1337');
    socket.on('hello', (res) => console.log(res + res + res));
    socket.on('test', (res) => console.log(res));

    var vm = this
    socket.on('wallet_view', function(data) {
      console.log('changexxxxxxxxxxxxxxxxxxxxxx')
      vm.setWalletView(data)
    });

  }
}
</script>

<style>

</style>
