<template>
  <div :class="slideDown ? 'slideDown' : ''" :style="{'opacity':opacity,'margin-top':'-'+slideDownOffset+'px'}" id="popupwelcome" class="">
    <h1>
      Dope!
      <br />New visitor!
    </h1>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    <div class="action">
        <button @click="closePopupAgree">I Agree</button>
      <button @click="closePopupAgree">I Don't Agree</button>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import smoothscroll from 'smoothscroll-polyfill';

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
      slideDownOffset: 0,
      opacity: 0,
      slideDown: false
    }
  },
  methods:{
    slideDownStart: function() {
      var vm = this
      setTimeout(function() {
        // if(vm.$store.state.cookies.popupwelcome){
          vm.opacity=1
          vm.slideDownOffset=0
          vm.slideDown=true
        // }
      },1000)
    },
    closePopupAgree: function(){
      this.slideDownOffset = this.$el.clientHeight
      // window.scrollTo(0,0);
      setTimeout(function() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      },800)
      document.cookie = "popupwelcomeclosed=true";
    }
  },
  mounted(){
    this.slideDownOffset = this.$el.clientHeight
    this.opacity = 1
    this.slideDownStart()
    smoothscroll.polyfill();
  }
}
</script>
<style>
#popupwelcome{
  background: white;
  margin-top: -100px;
  opacity:0;
  padding: 10px;
  /*transform: translateY(-100px);*/
}
.slideDown{
  transition: margin-top 1s;
}

.action{
  background: black;
  height: 100px;
  display: flex;
justify-content: space-around;
}

button{
  outline: none;
  background: none;
  color: white;
  border: none;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  width: 100%;
  /*border: 10px solid white;*/
  line-height: 1;
}
.action>button:nth-of-type(1){

  border-right: 5px solid white;
}
.action>button:nth-of-type(2){
  border-left: 5px solid white;

}
</style>
