<template>
<div class="slide-layout" :class="$store.state.menu.menuOpen ? 'slide-layout-right':''">
  <sidebar></sidebar>
  <div id="main">
    <popup v-if="mountpopupwelcome"></popup>


    <nuxt/>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>

  <script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" id="snipcart" data-api-key="MzIxNWU0MGEtN2EwNi00ZmYzLWFmYTQtMjc4YjBkMzExMWJmNjM2NjMzMDQyNDk3MzAwMzYx"></script>

  <link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" type="text/css" rel="stylesheet" />

</div>
</template>
<script>
import sidebar from '~/components/sidebar.vue'
import popup from '~/components/popup.vue'
export default {
  components: {
    sidebar,
    popup
  },
  data: function() {
    return {
      mountpopupwelcome: true,
    }
  },
  methods:{
    getCookie: function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    },
    checkPopupCookie: function(){


      if(this.getCookie("popupwelcomeclosed")==='false'){
        this.mountpopupwelcome = true
      }else{
        this.mountpopupwelcome = false
      }
    }
  },
  mounted() {

    this.checkPopupCookie()


  }


}
</script>
<style>
.nuxt-progress {
  /*transform: rotate(90deg) !important;*/
  right: 0 !important;
  /*opacity: 1 !important;*/
  /*width: 40% !important;*/
  height: 100% !important;
  left: auto !important;
  max-width: calc(100% - 100px);
  -webkit-transition: width 0.8s, opacity 0.4s;
  transition: width 0.8s, opacity 0.4s
}

html {
  font-family: 'Space Mono', monospace;
  font-size: 36px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  /* background: lightgrey; */
  overflow-x: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#main {
  width: calc(100% - 100px);
  float: right;
  display: block;
}

.slide-layout {
  transition: margin 0.2s ease-in-out;
  display: block;
}

.slide-layout-right {
  margin-right: -400px;
  margin-left: 400px;
}
</style>
