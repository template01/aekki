<template>
<div v-if="initiatePage">
  <viewingpopup></viewingpopup>
  <section :style="viewingpopup.status ? {'filter':'blur(20px)'}:{}" class="container">
    <div>
      <div class="grid-column">
        <walletitemindex :link="wallet.id" :isviewing="wallet.viewing" :data="wallet" :key="wallet.id" v-for="wallet in  walletsFirstColumn"></walletitemindex>
      </div>
      <div class="grid-column">
        <walletitemindex :link="wallet.id" :isviewing="wallet.viewing" :data="wallet" :key="wallet.id" v-for="wallet in  walletsSecondColumn"></walletitemindex>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {
  mapMutations,
  mapGetters
} from 'vuex'

import _ from 'lodash';
import viewingpopup from '~/components/viewingpopup'
import walletitemindex from '~/components/walletitemindex'

export default {
  components: {
    viewingpopup,
    walletitemindex
  },
  computed: {
    walletsFirstColumn: function() {
      // var even = function(num) {
      //   return num % 2 === 0;
      // };
      // return this.wallets.filter(even);

      // var arr = [4,5,7,8,14,45,76];
      var filtered = this.wallets.filter(function(element, index, array) {
        return (index % 2 === 0);
      });
      return filtered

    },
    walletsSecondColumn: function() {
      var filtered = this.wallets.filter(function(element, index, array) {
        return (index % 2 === 1);
      });
      return filtered


    },
    // mix the getters into computed with object spread operator
    ...mapGetters({
      viewingpopup: 'viewing/GET_VIEWINGPOPUP',
    })
  },
  methods: {

  },
  data: function() {
    return {
      input: 'test',
      viewing: [],
      wallets: [],
      initiatePage: false,
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
              vm.initiatePage = true
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
            vm.initiatePage = true

            vm.getInitViewing()

          });
          // console.log(res)
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
    setWalletSold: function(input) {
      // console.log('xxxxxxxxxxxxxxxxxxxx' + input)
      var item = _.find(this.wallets, function(item) {
        return item.id == input;
      });
      var index = _.indexOf(this.wallets, item);
      // IF ITEM EXISTS
      if (index > -1) {
        this.$set(this.wallets[index], 'sold', true)
      }
    },
    setWalletView: function(input) {
      // console.log('xxxxxxxxxxxxxxxxxxxx' + input)
      var item = _.find(this.wallets, function(item) {
        return item.id == input[0];
      });
      var index = _.indexOf(this.wallets, item);
      // IF ITEM EXISTS
      if (index > -1) {
        if (input[1] === "true") {
          this.$set(this.wallets[index], 'viewing', true)
        }
        if (input[1] === "false") {
          this.$set(this.wallets[index], 'viewing', false)
        }
      }
    }
  },

  mounted() {
    this.getWallets()
    // connect user throught socket
    const socket = io('http://localhost:1337');
    socket.on('hello', (res) => console.log(res + res + res));

    var vm = this
    socket.on('item set ordered', function(data) {
      vm.setWalletSold(data.id)
    });
    socket.on('wallet_view', function(data) {
      console.log('changexxxxxxxxxxxxxxxxxxxxxx')
      vm.setWalletView(data)
    });

  }
}
</script>

<style>

.grid-column {
  display: grid;
  width: 50%;
  float: left;
  overflow: hidden;
}
</style>
