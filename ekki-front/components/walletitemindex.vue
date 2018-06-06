<template>
<div :style="{height:this.height}" class="circleItem">
  <nuxt-link :to="isviewing ?  '' : '/wallets/'+link">
    <!-- {{wallet.id}}<br> -->
    <div class="inner">
      <img :src="'http://localhost:1337'+data.productimage_a.url" />
    </div>
    <!-- <br> -->
  </nuxt-link>
  <div>
    <h1 v-if="isviewing && !data.sold" v-html="'Item Being Viewed!'"></h1>
    <h1 v-if="data.sold" v-html="'Item Sold!'"></h1>
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
    setHeight: function() {
      if (process.browser) {
        this.height = this.$el.offsetWidth + 'px'
      }
    }
  }
}
</script>
<style>
.circleItem:hover {
  transform: rotate(0deg) !important;
}

.circleItem {
  float: left;
  background: black;
  border-radius: 100%;
  transition: transform 0.25s ease-in-out;
  transition-delay: 0.25s;
  width: 50%;
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
  display: block;
  margin: 0 auto;
}

.circleItem .inner {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
