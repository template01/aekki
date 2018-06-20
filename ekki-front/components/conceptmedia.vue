<template>
<div class="sampleMedia ">
  <div class="slideWrapper">
    <!-- {{media}} -->
    <div @click="changeSlide(1)" class="slide">
      <div class="slideContent">

        <img  :src="media[activeIndex]" />
        <div class=" overlay disable-user-select">
          <p v-for="n in 50" :key="n">
            sample sample sample sample sample sample sample sample sample
          </p>

        </div>
      </div>

    </div>
  </div>
  <div class="sampleNav columns is-marginless pt-10">

    <div class="column is-12 is-4 is-paddingless ">
      <div class=" is-pulled-left">
        <span @click="changeSlide(-1)"><img class="sampleNavArrow mr-20" src="/left.svg" /></span>
        <span class=""  @click="changeSlide(1)"><img class="sampleNavArrow" src="/right.svg" /></span>

      </div>
      <div class="pt-5 is-pulled-right is-size-7">
        <i class="">This is a sample of the '{{productmodel.title}}'-series</i>
      </div>
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
  props: ['media', 'productmodel'],
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({})
  },
  methods: {
    changeSlide: function(direction) {
      if (direction === 1) {
        if (this.activeIndex === this.media.length - 1) {
          this.activeIndex = 0
        } else {
          this.activeIndex = this.activeIndex + direction
        }
      }
      if (direction === -1) {
        if (this.activeIndex === 0) {
          this.activeIndex = this.media.length - 1
        } else {
          this.activeIndex = this.activeIndex + direction
        }
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
.sampleNav {
  .sampleNavArrow{
    height: 36px;
    cursor: pointer;
  }
  // z-index: 100;
}

.sampleMedia {
  .slideWrapper{

    position: relative;
  }
    &:hover {
        .slide img {
            filter: grayscale(1) contrast(1);
        }
        .slide .overlay {
            // display: none;
            // transform: translateX(100%);
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
        display: table;
        width: 100%;
        height: 100%;
        // position: absolute;
        overflow: hidden;
        img {
            display: block;
            filter: grayscale(1) contrast(100);
            transition: filter 0.4s;

        }
        .slideContent {
            overflow: hidden;
        }
        .overlay {
            transition: transform 0.6s ease-in-out,background 0.3s, color 0.35s;
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
