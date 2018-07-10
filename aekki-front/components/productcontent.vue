<template>
<div class="">
  <header>

    <div :class="menuOpen || cartOpen ? 'header-buy-slideout':''" class="header-buy">
      <div class=" columns is-marginless is-paddingless">

        <div class="column buy is-paddingless ">
          <div class="exclusiveWrapper">
            <div class="header">
              <h1 class="has-text-centered">
                <button><span class="">This is an exclusive viewing!</span></button>
                </h1>
            </div>
          </div>
          <div class="buyWrapper" >
            <div class="header">
              <h1 class="has-text-centered"> <button @click="openSnip()" class="has-text-centered snipcart-add-item" :data-item-image="$store.state.rootApi+product.productimage_a.url" :data-item-id="$route.params.slug" :data-item-name="(product.ProductModel.title.replace(/ /g,''))+$route.params.slug" :data-item-price="product.ProductModel.price" data-item-max-quantity="1" data-item-weight="20" :data-item-url="baseUrl+$route.path" :data-item-description="product.ProductModel.title">
                  <span class="">Claim it now: </span> <span class="">{{product.ProductModel.price}}EUR</span>
                </button></h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header-title columns is-marginless">

      <div class=" column is-6 is-paddingless">
        <div class="header ">
          <h1 class="has-text-centered" v-html="product.ProductModel.title"></h1>
        </div>
      </div>
    </div>
  </header>


  <div class="part-top pt-50">

    <div class="product-scans columns is-marginless">
      <div v-if="product.productimage_a" class="column">
        <img :src="$store.state.rootApi+product.productimage_a.url" />
        <div class="header">
          <h1 class="has-text-centered">Side A</h1>
        </div>
      </div>
      <div v-if="product.productimage_b" class="column">

        <img :src="$store.state.rootApi+product.productimage_b.url" />
        <div class="header">
          <h1 class="has-text-centered">Side B</h1>
        </div>
      </div>
    </div>
  </div>

  <div class="part-bottom">
    <div class="columns is-marginless">
      <div class="column is-paddingless">
        <div class="p-75">

          <div v-html="md.render(product.ProductModel.description)">

          </div>
          <table class="mt-60">
            <tr>
              <td>Main colors:</td>
              <td> <span class="colorCheck" v-for="color in productcolors" v-if="color.set" :key="color.value">
                     <span  v-bind:style="{ background: color.value }" class="color-circle" :for="color.value"> </span>
                </span>
              </td>
            </tr>
            <tr>
              <td>Dimensions (W/H):</td>
              <td>Approx. {{product.ProductModel.DimensionWidthCm*10}}mm/{{product.ProductModel.DimensionHeightCm*10}}mm</td>
            </tr>
            <tr>
              <td>Id:</td>
              <td>{{product.id}}</td>
            </tr>
            <tr>
              <td>Year:</td>
              <td>{{new Date(product.createdAt).getFullYear()}}</td>
            </tr>
            <tr v-if="product.madeby">
              <td>Made by:</td>
              <td>{{product.madeby}}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>{{product.ProductModel.price}}EUR</td>
            </tr>
          </table>
          <!-- <p>Model: {{product.ProductModel.title}}</p> -->
        </div>
      </div>
      <div class="column is-paddingless">
        <div class="p-75">
          <conceptmedia :productmodel="product.ProductModel" :media="['/bw00.jpg','/bw01.jpg','/bw02.jpg']"></conceptmedia>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import conceptmedia from '~/components/conceptmedia'
import MarkdownIt from 'markdown-it'

// import _ from 'lodash';

export default {
  components: {
    conceptmedia
  },
  props: ['product', 'baseUrl'],
  methods:{
    openSnip: function(){

    }
  },
  computed: {
    ...mapGetters({
      menuOpen: 'menu/GET_TOGGLEMENU',
      cartOpen: 'cart/GET_CARTOPEN',
    }),
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
  data: function() {
    return {
      md: new MarkdownIt()
    }
  },
}
</script>
<style lang="scss">
.part-bottom{
  s, strike, del {
      text-decoration: none ;
  }
}


</style>
<style lang="scss" scoped>


.header-buy {
  &.header-buy-slideout{
    transform: translateY(-100px);

  }

   transition: transform 0.15s ease-in-out;
    position: fixed;
    z-index: 100;
    height: 100px;
    width: calc(50% - 50px);
    right: 0;
    // background: black;
    .buy {
        // color: white;
        // background: red;
    }
    h1 {
        width: 100%;
        height: 100%;
    }
    button {
        font-size: inherit;
        background: transparent;
        border: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        outline: none;
        cursor: pointer;
    }
    .buyWrapper,
    .exclusiveWrapper {
        position: absolute;
        width: 100%;
        background: white;
        transform: translateY(-100px);
        transition: transform 0.5s, height 0.35s;
        height: 100%;

    }

    .buyWrapper {
        -webkit-animation: slidedown 0.5s forwards;
        animation: slidedown 0.5s forwards;
        -webkit-animation-delay: 3s;
        animation-delay: 3s;

        &.expand{
          height: 100vh;
        }
    }

    .exclusiveWrapper {
        -webkit-animation: slidedownup 3s forwards;
        animation: slidedownup 3s forwards;
        -webkit-animation-delay: 1s;
        animation-delay: 1s;
    }

    @-webkit-keyframes slidedownup {
        0% {
            transform: translateY(-100px);
        }
        10% {
            transform: translateY(0px);
        }
        60% {
            transform: translateY(0px);
        }
        70% {
            transform: translateY(-100px);
        }
        100% {
            transform: translateY(-100px);
        }
    }

    @keyframes slidedownup {
        0% {
            transform: translateY(-100px);
        }
        10% {
            transform: translateY(0px);
        }
        60% {
            transform: translateY(0px);
        }
        70% {
            transform: translateY(-100px);
        }
        100% {
            transform: translateY(-100px);
        }
    }

    @-webkit-keyframes slidedown {
        100% {
            transform: translateY(0px);
        }
    }

    @keyframes slidedown {
        100% {
            transform: translateY(0px);
        }
    }
}

table,
td,
th {
    border: 3px solid black;
}
td {
    padding: 5px;
    word-break: break-all;
}

.header-title {
    background: black;
    color: white;
}
.header {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.part-top {
    // margin-top: 100px;
    background: black;
    display: inline-block;
    color: white;
    width: 100%;
    .product-scans {
        img {
            max-width: 1024px;
            width: 100%;
            margin: 0 auto;
            display: block;
            padding: 2vw;
        }
    }
}
.part-bottom {
    background: white;
    line-height: 1.2;
}

.colorCheck {
    display: inline-block;
}
.color-circle {
    width: 30px;
    height: 30px;
    display: inline-block;
    border: 3px solid black;
    border-radius: 100%;
    margin: 0px 2px -4px;
}

.border-right-desktop {
    border-right: solid black 2px;

}
.border-left-desktop {
    border-left: solid black 2px;
}
</style>
