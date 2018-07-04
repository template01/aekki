<template>
<div v-if="initiatePage">
  <viewingpopup></viewingpopup>
  <section :style="viewingpopup.status ? {'filter':'blur(20px)'}:{}" class="">
    <div>
      <div class="grid-column">
        <productitemindex :link="product.id" :isviewing="product.viewing" :data="product" :key="product.id" v-for="product in  productFirstColumn"></productitemindex>
      </div>
      <div class="grid-column">
        <productitemindex :link="product.id" :isviewing="product.viewing" :data="product" :key="product.id" v-for="product in  productSecondColumn"></productitemindex>
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
import productitemindex from '~/components/productitemindex'

export default {
  components: {
    viewingpopup,
    productitemindex
  },
  computed: {
    productFirstColumn: function() {
      // var even = function(num) {
      //   return num % 2 === 0;
      // };
      // return this.product.filter(even);

      // var arr = [4,5,7,8,14,45,76];
      var filtered = this.product.filter(function(element, index, array) {
        return (index % 2 === 0);
      });
      return filtered

    },
    productSecondColumn: function() {
      var filtered = this.product.filter(function(element, index, array) {
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
      product: [],
      initiatePage: false,
      testFind: ["5b08930d887ab91a3e0d19e3", "true"]

    }
  },
  methods: {

    sendView: function() {
      fetch(this.$store.state.rootApi+'productview', {
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
      fetch(vm.$store.state.rootApi+'/productview', {
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
              vm.setproductView([vm.viewing[i].viewingid.toString(), vm.viewing[i].viewing.toString()])
            }
          });
          // console.log(res)
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
    getproduct: function() {
      var vm = this
      fetch(this.$store.state.rootApi+'/product', {
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
            vm.product = data
            vm.initiatePage = true

            vm.getInitViewing()

          });
          // console.log(res)
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },
    setproductold: function(input) {
      // console.log('xxxxxxxxxxxxxxxxxxxx' + input)
      var item = _.find(this.product, function(item) {
        return item.id == input;
      });
      var index = _.indexOf(this.product, item);
      // IF ITEM EXISTS
      if (index > -1) {
        this.$set(this.product[index], 'sold', true)
      }
    },
    setproductView: function(input) {
      // console.log('xxxxxxxxxxxxxxxxxxxx' + input)
      var item = _.find(this.product, function(item) {
        return item.id == input[0];
      });
      var index = _.indexOf(this.product, item);
      // IF ITEM EXISTS
      if (index > -1) {
        if (input[1] === "true") {
          this.$set(this.product[index], 'viewing', true)
        }
        if (input[1] === "false") {
          this.$set(this.product[index], 'viewing', false)
        }
      }
    }
  },

  mounted() {
    this.getproduct()
    // connect user throught socket
    const socket = io(this.$store.state.rootApi);
    socket.on('hello', (res) => console.log(res + res + res));

    var vm = this
    socket.on('item set ordered', function(data) {
      vm.setproductold(data.id)
    });
    socket.on('product_view', function(data) {
      console.log('changexxxxxxxxxxxxxxxxxxxxxx')
      vm.setproductView(data)
    });

    socket.on('ass', function(data) {
      alert('ass has run!')
    });

  }
}
</script>

<style>


</style>
