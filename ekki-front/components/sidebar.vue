<template>
  <div id="sidebar">
    <div class="navToggle">
    <div @click="$store.commit('menu/SET_TOGGLEMENU', !$store.state.menu.menuOpen)" class="toggle-button"><img width="100%" src="/logowrotated.svg"/></div>
  </div>

    <div class="navInner">
      <nav>
        <!-- <nuxt-link :to="'/'"><img width="100%" src="/logow.svg"/></nuxt-link> -->
        <p>
          <nuxt-link :to="'/vision'"><span class="circleNav"></span>Vision</nuxt-link>
        </p>
        <p>
          <nuxt-link :to="'/about'"><span class="circleNav"></span>About</nuxt-link>
        </p>

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
   ...mapGetters({
   })
 },
  data: function() {
    return {
      input: 'test',
      viewing: [],
      wallets: [],

    }
  },
}
</script>
<style>
.navToggle{
  width:100px;
  position: absolute;
  height: 100%;
  right: 0;
  padding: 10px;
  background: black;

}
.navInner{
  width:400px;
  position: absolute;
  height: 100%;
  left: 0;
  padding: 10px;
  background: white;
}

#sidebar{
  width:500px;
  margin-left: -400px;
  height: 100%;
  position: fixed;
  font-size: 100px;
  line-height: 100px;
  font-weight: bold;
  /* padding: 5px; */
  /* color: white; */
}
#sidebar a{
  text-decoration: none;
  color: inherit;
}
#sidebar .circleNav::after{
 /* content: "○"; */
}
#sidebar .nuxt-link-exact-active .circleNav::after{
 /* content: "●"; */
}
</style>
