<template>
  <!-- 'pointer-events':'none','cursor':'not-allowed' -->
<div :style="[isviewing ? {}:{}, {'transform':'rotate('+randomrotate()+'deg)'},{'height':this.height}]" class="circleItem">
  <div v-if="isviewing ||  data.sold"  class="viewinginfo">
    <div class="halfCircle">

    </div>
    <div class="text">

      <h1 v-if="isviewing && !data.sold" v-html="'Occupied!'"></h1>
      <h1 v-if="data.sold" v-html="'Item Sold!'"></h1>
    </div>
  </div>
  <div>
    <nuxt-link :to="isviewing ?  '' : '/wallets/'+link">
      <!-- {{wallet.id}}<br> -->
      <div class="inner">
        <img :src="'http://localhost:1337'+data.productimage_a.url" />
      </div>
      <!-- <br> -->
    </nuxt-link>

  </div>

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

  },
  props: ['link', 'isviewing', 'data'],
  data: function() {
    return {
      height: '39.5vw',
    }
  },
  mounted() {
    this.setHeight()
  },
  methods: {
    randomrotate: function() {
      return Math.floor(Math.random() * 180)
    },
    setTextCircle: function(radius){
      var text = this.$el.querySelector('.viewinginfo .text h1')
      var vm = this

      if(text){
            // new CircleType(text).forceWidth(true).forceHeight(true);
      }

},
    setHeight: function() {
      if (process.browser) {
        this.height = this.$el.offsetWidth + 'px'
        var vm = this
        // setTimeout(function(){vm.setTextCircle(vm.$el.offsetWidth)},250)

      }
    }
  }
}
</script>
<style scoped>
.circleItem:hover {
  transform: rotate(0deg) !important;
}

.circleItem {
  float: left;
  background: black;
  color: white;
  border-radius: 100%;
  transition: transform 0.25s ease-in-out;
  transition-delay: 0.25s;
  width: 100%;
  height: 39.5vw;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.circleItem a {
  position: absolute;
  width: 100%;
  height: 100%;
}

.circleItem img {
  width: 85%;
  max-width: 800px;
  display: block;
  margin: 0 auto;
}

.circleItem .inner {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.viewinginfo{
  /* background: red; */
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  }

  .halfCircle{
    background: red;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 40vw;
    border-bottom-right-radius: 40vw;
    height: 50%;
    width: 100%;
    /* z-index: 1; */
    overflow: hidden;
  }
  .text{
    height: 50%;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center
  }

  .text h1{
    position: relative;
    top: 45%;
    transform: translateY(-45%);
  }



</style>
