<template>
<section class="">
  <div v-if="initiatePage" :style="isBeingViewed?{'opacity':'0.5'}:{'opacity':'1'}">
    <productcontent :baseUrl="baseUrl" :product="product"></productcontent>

  </div>
  <!-- <cart></cart> -->
</section>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import productcontent from '~/components/productcontent.vue';
// import cart from '~/components/cart.vue';
// import {
//   mapGetters
// } from 'vuex'


export default {
  components: {
    productcontent,
    // cart
  },
  data: function() {
    return {
      input: 'test',
      productviewid: '',
      viewing: [],
      isBeingViewed: false,
      product: [],
      exist: false,
      initiatePage: false,
      baseUrl: ''

    }
  },
  computed: {
    productcolors: function() {
      // return 'blue'
      var colors = [{
          "set": this.product['Color-white'] ? true : false,
          "value": "white"
        },
        {
          "set": this.product['Color-green'] ? true : false,
          "value": "green"
        },
        {
          "set": this.product['Color-black'] ? true : false,
          "value": "black"
        },
        {
          "set": this.product['Color-purple'] ? true : false,
          "value": "purple"
        },
        {
          "set": this.product['Color-yellow'] ? true : false,
          "value": "yellow"
        },
        {
          "set": this.product['Color-red'] ? true : false,
          "value": "red"
        },
        {
          "set": this.product['Color-blue'] ? true : false,
          "value": "blue"
        },
        {
          "set": this.product['Color-orange'] ? true : false,
          "value": "orange"
        }
      ]
      return colors;
    }
  },
  methods: {

    emitOrderTokenServer: function(data) {
      const socket = io(this.$store.state.rootApi);
      socket.emit('item ordered', data)
    },

    setUrl: function() {
      if (process.browser) {
        this.baseUrl = window.location.origin
      }
    },

    checkIfViewExist: function() {
      var vm = this
      fetch(this.$store.state.rootApi+'/productview?viewingid=' + this.$route.params.slug, {
          method: 'get'
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            if (data.length === 0) {
              vm.createView()
              // vm.getproduct()

              // vm.initiatePage = true
              // alert('dang')
            } else {
              console.log(data[0].viewing)
              vm.productviewid = data[0].id

              // IF VIEWING
              if (data[0].viewing) {
                vm.isBeingViewed = true

                // //PUSH ROUTER TO HOME + SET STATE SORRY BEING VIEWED MODAL
                setTimeout(function() {
                  vm.sendToIndex('isviewed');
                }, 500);

              } else {

                vm.updateView(vm.productviewid, true)
                // vm.getproduct()

              }
            }
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    sendToIndex: function(messageCode) {
      this.$store.commit('viewing/SET_VIEWINGPOPUP', {
        'status': true,
        'message': messageCode
      })
      this.$router.push({
        path: '/'
      })
    },
    updateView: function(id, state) {
      console.log('send')
      fetch(this.$store.state.rootApi+'/productview/' + id, {
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
      fetch(this.$store.state.rootApi+'/productview', {
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

  },
  created() {
    this.setUrl()
  },
  beforeDestroy() {
    if (!this.isBeingViewed) {
      this.updateView(this.productviewid, false)
    }
  },
  mounted() {
    const socket = io(this.$store.state.rootApi);
    this.checkIfViewExist()

  },

  asyncData(context) {
    // console.log(context.route)
    console.log(context.store.state.rootApi)

    return axios.get(context.store.state.rootApi+'/product/' + context.route.params.slug)
      .then((res) => {
        return {
          ass: 'testa',
          product: res.data,
          price: res.data.ProductModel.price,
          initiatePage: true
        }
      })

  },


}
</script>

// <style lang="scss">
// .header-buy {
//     position: fixed;
//     height: 100px;
//     width: calc(50% - 50px);
//     right: 0;
//     // background: black;
//     .buy {
//         // color: white;
//         // background: red;
//     }
//     button {
//         font-size: inherit;
//         background: transparent;
//         border: 0;
//
//     }
//     .buyWrapper,
//     .exclusiveWrapper {
//         position: absolute;
//         width: 100%;
//         background: white;
//         transform: translateY(-100px);
//         transition: transform 0.5s;
//
//     }
//
//     .buyWrapper {
//         -webkit-animation: slidedown 0.5s forwards;
//         animation: slidedown 0.5s forwards;
//         -webkit-animation-delay: 3s;
//         animation-delay: 3s;
//     }
//
//     .exclusiveWrapper {
//         -webkit-animation: slidedownup 3s forwards;
//         animation: slidedownup 3s forwards;
//         -webkit-animation-delay: 1s;
//         animation-delay: 1s;
//     }
//
//     @-webkit-keyframes slidedownup {
//         0% {
//             transform: translateY(-100px);
//         }
//         10% {
//             transform: translateY(0px);
//         }
//         60% {
//             transform: translateY(0px);
//         }
//         70% {
//             transform: translateY(-100px);
//         }
//         100% {
//             transform: translateY(-100px);
//         }
//     }
//
//     @keyframes slidedownup {
//         0% {
//             transform: translateY(-100px);
//         }
//         10% {
//             transform: translateY(0px);
//         }
//         60% {
//             transform: translateY(0px);
//         }
//         70% {
//             transform: translateY(-100px);
//         }
//         100% {
//             transform: translateY(-100px);
//         }
//     }
//
//     @-webkit-keyframes slidedown {
//         100% {
//             transform: translateY(0px);
//         }
//     }
//
//     @keyframes slidedown {
//         100% {
//             transform: translateY(0px);
//         }
//     }
// }
//
// .header-title {
//     background: black;
//     color: white;
// }
// .header {
//     height: 100px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }
// .part-top {
//     // margin-top: 100px;
//     background: black;
//     display: inline-block;
//     color: white;
//     width: 100%;
//     .product-scans {
//         img {
//             max-width: 1024px;
//             width: 100%;
//             margin: 0 auto;
//             display: block;
//             padding: 2vw;
//         }
//     }
// }
// .part-bottom {
//     background: white;
//     line-height: 1.2;
// }
//
// .colorCheck {
//     display: inline-block;
// }
// .color-circle {
//     width: 30px;
//     height: 30px;
//     display: inline-block;
//     border: 2px solid black;
//     border-radius: 100%;
//     margin: 1px 1px -4px;
// }
//
// .buynow {
//     position: fixed;
//     left: calc(50% - 50px + 50px);
//     margin: 0 auto;
//     height: 120px;
//     width: 100px;
//     background: white;
//     margin-top: -60px;
//     // border-radius: 100%;
//     overflow: hidden;
//     border: 4px solid black;
//     // padding: 3vw;
//     button {
//         // color: white;
//         background: none;
//         position: absolute;
//         line-height: 1;
//         top: 0;
//         left: 0;
//         margin: 0 auto;
//         border: 0;
//         height: 100%;
//         width: 100%;
//         font-size: inherit;
//         cursor: pointer;
//         .buy,
//         .price {
//             display: block;
//             position: absolute;
//             line-height: 1;
//             left: 0;
//             margin: 0 auto;
//             border: 0;
//             height: 50%;
//             width: 100%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 50%;
//         }
//         .price {
//             bottom: 0;
//             background: black;
//             color: white;
//             &::after {
//                 content: '€';
//             }
//         }
//         .buy {
//             top: 0;
//
//         }
//     }
// }
//
// .border-right-desktop {
//     border-right: solid black 2px;
//
// }
// .border-left-desktop {
//     border-left: solid black 2px;
// }
// </style>
