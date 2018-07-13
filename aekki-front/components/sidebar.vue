<template>
<div id="sidebar">
  <div @click="$store.commit('menu/SET_TOGGLEMENU', !$store.state.menu.menuOpen); $store.commit('cart/SET_CARTOPEN', false)" class="navToggle">
    <div class="navHamburger">

      <div class="hamburger hamburger--arrow js-hamburger " :class="$store.state.menu.menuOpen ? 'is-active':''" type="button">
        <!-- <span class="hamburger-box"> -->
        <span class="hamburger-inner"></span>
        <!-- </span> -->
      </div>
    </div>
    <div class="toggle-button"><img width="100%" src="/logowrotated.svg" /></div>
  </div>

  <div class="navInner">
    <nav>
      <!-- <nuxt-link :to="'/'"><img width="100%" src="/logow.svg"/></nuxt-link> -->
      <!-- <p> -->
        <nuxt-link :to="'/'">Store</nuxt-link>
      <!-- </p> -->
      <!-- <p> -->
        <nuxt-link :to="'/vision'">Vision</nuxt-link>
      <!-- </p> -->
      <!-- <p> -->
        <nuxt-link :to="'/about'">About</nuxt-link>
      <!-- </p> -->
      <div class="smalltextBottom is-size-6">
        <p class="pb-20">
          <a href="#" class="snipcart-edit-profile">
            Profile
          </a>
          /
          <a href="#" class="snipcart-user-profile">
           Orders&nbsp;
          </a>

          <a href="#" class="snipcart-user-logout">
            / Logout
          </a>
        </p>
        <p>
          <nuxt-link :to="'/info'"><span class="circleNav"></span>Info / Terms / Conditions </nuxt-link>
        </p>
      </div>
    </nav>
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
    // mix the getters into computed with object spread operator
    ...mapGetters({})
  },
  data: function() {
    return {
      input: 'test',
      viewing: [],
      products: [],

    }
  },
}
</script>
<style lang="scss">
.navToggle {
  width: 100px;
  position: absolute;
  height: 100%;
  right: 0;
  padding: 10px;
  background: black;
  cursor: pointer;

}

.navInner {
  width: 400px;
  position: absolute;
  height: 100%;
  left: 0;
  padding: 10px;
  background: white;

  p{
    display: block;
  }
}

.smalltextBottom {
  position: absolute;
  bottom: 0;
  padding-bottom: 10px;
  line-height: 1;
}

#sidebar {
  width: 500px;
  margin-left: -400px;
  height: 100%;
  position: fixed;
  font-size: 100px;
  line-height: 100px;
  font-weight: bold;
  z-index: 1000;
  /* padding: 5px; */
  /* color: white; */
  a {
    text-decoration: none;
    color: inherit;
    line-height: inherit;
    overflow: hidden;

    display: inline-block;
  }
  .nuxt-link-exact-active {
    border-bottom: 11px solid black;
  }
}


/* #sidebar .circleNav::after{
 content: "○";
}
#sidebar .nuxt-link-exact-active .circleNav::after{
 content: "●";
} */

.navHamburger {
  height: 80px;
  position: relative;
  margin-bottom: 6px;
}

.hamburger {
  padding: 0;
}

.hamburger .hamburger-inner {
  width: 100%;
  height: 12px;
  margin-top: -10px;
}

.hamburger:not(.is-active)>.hamburger-inner:after {
  width: 100%;
}

.hamburger:not(.is-active)>.hamburger-inner:before {
  width: 100%;
}

.hamburger-inner::before {
  top: -22px;
  height: 12px;

}

.hamburger-inner::after {
  bottom: -22px;
  height: 12px;

}

.hamburger .hamburger-inner,
.hamburger .hamburger-inner:after,
.hamburger .hamburger-inner:before {
  transition: background-color 0.2s;
  transition-delay: 0.05s;
  background-color: white;
  border-radius: 0;

}

.hamburger.is-active .hamburger-inner:before {
  width: 36px;
  transform: translate3d(-1px, 8px, 0) rotate(-45deg) scale(1, 1);
}

.hamburger.is-active .hamburger-inner:after {
  width: 36px;
  transform: translate3d(-1px, -8px, 0) rotate(45deg) scale(1, 1);
}

.hamburger:hover {
  opacity: 1;

}

.hamburger:hover .hamburger-inner,
.hamburger:hover .hamburger-inner:after,
.hamburger:hover .hamburger-inner:before {
  background-color: red;

}
</style>
