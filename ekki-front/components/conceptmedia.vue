<template>
<div class="conceptMedia slideWrapper">
  <!-- {{media}} -->
  <div @click="changeSlide()" class="slide">
    <img :src="media[activeIndex]" />
    <div class=" overlay disable-user-select">
      <p v-for="n in 50" :key="n">
        concept concept concept concept concept concept concept concept concept
      </p>

    </div>
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
  props: ['media'],
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({})
  },
  methods: {
    changeSlide: function() {
      if (this.activeIndex === this.media.length - 1) {
        this.activeIndex = 0
      } else {
        this.activeIndex++
      }
    }
  },
  data: function() {
    return {
      activeIndex: 0,
    }
  },
}
</script>
<style lang="scss">
.disable-user-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.slideWrapper {
    position: relative;
    &:hover {
        .slide .overlay {
            // display: none;
            transform: translateX(100%);
            background: rgba(255,255,255,0);
            color: transparent;
            p {
                &:nth-child(odd) {
                    padding-left: 900px;
                }
                &:nth-child(even) {
                    padding-left: 1000px;
                }
            }
        }
    }
    .slide {
        cursor: pointer;
        top: 0;
        display: table;
        width: 100%;
        height: 100%;
        // position: absolute;
        overflow: hidden;
        img {
            display: block;
        }
        .overlay {
            transition: transform 0.6s ease-in-out, background 0.3s , color 0.35s;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            overflow: hidden;
            white-space: nowrap;
            z-index: 1;
            width: 100%;
            height: 100%;
            color: white;
            background: rgba(255,255,255,0.0);
            top: 0;
            position: absolute;
            p {
                transition: padding 0.6s;

                &:nth-child(odd) {
                    padding-left: 100px;
                }
                word-spacing: -25px;
                margin-left: -100px;
                font-size: 100px;
                font-weight: 700;
                transform: rotate(-30deg);
                transform-origin: left;
            }
        }
    }
}
</style>
