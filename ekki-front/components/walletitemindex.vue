<template>
<!-- 'pointer-events':'none','cursor':'not-allowed' -->
<div :style="[isviewing ? {}:{}, {'transform':'rotate('+randomrotate()+'deg)'},{'height':this.height}]" class="circleItem">
  <div v-if="isviewing ||  data.sold" class="viewinginfo">
    <div class="halfCircleBottom">

    </div>
    <div class="textBottom">
      <div class="occopied">

        <svg :width="heightSvg" :height="heightSvg/2" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <path id="text_1_path" :d="setPathBottom"/>
            </defs>
            <use xlink:href="#text_1_path" stroke="none" fill="none"/>
            <text  fill="white" text-anchor="middle">
                <textPath xlink:href="#text_1_path" startOffset="50%">
                  <tspan dy="-50" v-if="isviewing && !data.sold" v-html="'Occupied - Occupied - Occupied - Occupied - Occupied - Occupied '"></tspan>
                  <tspan dy="-50" v-if="data.sold" v-html="'Sold!'"></tspan>
                </textPath>
            </text>
        </svg>


      </div>
    </div>
  </div>
  <div v-else class="walletinfo">
    <div class="textTop">
      <div class="occopied" >
        <svg :width="heightSvg" :height="heightSvg/2" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <path id="text_0_path" :d="setPathTop"/>
            </defs>
            <use xlink:href="#text_0_path" stroke="none" fill="none"/>
            <text fill="white" text-anchor="middle">
                <textPath xlink:href="#text_0_path" startOffset="50%">
                    <tspan dy="70" v-html="modelParsed" ></tspan>
                </textPath>
            </text>
        </svg>
      </div>
    </div>
    <div class="textBottom">
      <div class="occopied">

        <svg :width="heightSvg" :height="heightSvg/2" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <path id="text_1_path" :d="setPathBottom"/>
            </defs>
            <use xlink:href="#text_1_path" stroke="none" fill="none"/>
            <text  fill="white" text-anchor="middle">
                <textPath xlink:href="#text_1_path" startOffset="50%">
                  <tspan dy="-50" v-html="$store.state.order.prices[modelParsed]"></tspan>
                </textPath>
            </text>
        </svg>


      </div>
    </div>
  </div>

  <div>
    <nuxt-link :to="isviewing ?  '' : '/product/'+link">
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
    modelParsed: function(){
      var vm = this
      var model = ''
      if(vm.data.Model){
          console.log(vm.data.Model)
        switch (vm.data.Model) {
          case 'ækki-one':
          model = "ækki-one";
          break;
          case 'aekki-one':
          model = "ækki-one";
          break;
        }

      }
      return model
    },
    heightParsed: function() {
      return parseInt(this.height, 10)
    },
    heightSvg: function() {
      return this.heightParsed
    },
    setPathBottom: function() {
      return 'M 0,0 A '+this.heightSvg/2+','+this.heightSvg/2+' 0 1 0 '+this.heightSvg+',0';

    },
    setPathTop: function() {
      return 'M 0 '+this.heightSvg/2+' A 1 1 0 1 1 '+this.heightSvg+' '+this.heightSvg/2+''
      // m 0,'+this.heightSvg/2+' a '+this.heightSvg/2+','+this.heightSvg/2+' 0 0 1 '+this.heightSvg+',0';
    }
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
    setTextCircle: function(radius) {
      var text = this.$el.querySelector('.viewinginfo .text h1')
      var vm = this

      if (text) {
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

.viewinginfo, .walletinfo {
  /* background: red; */
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;

}

.halfCircleTop {
  position: absolute;
  top: 0;
  left: 0;
  border-bottom-left-radius: 40vw;
  border-bottom-right-radius: 40vw;
  height: 50%;
  width: 100%;
  /* z-index: 1; */
  overflow: hidden;
}

.halfCircleBottom {
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

.textBottom {
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  pointer-events: none;
}

.textTop {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  text-align: center;
  pointer-events: none;
}
.occopied{
  /* font-size: 40px; */
  letter-spacing: 1vw;
  line-height: 100px;
  /* font-weight: bold; */
}

</style>
