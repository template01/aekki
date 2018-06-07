<template>
  <div class="slide-layout" :class="$store.state.menu.menuOpen ? 'slide-layout-right':''">
    <sidebar></sidebar>

    <div  id="main">
      <nuxt/>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>

    <script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" id="snipcart" data-api-key="MzIxNWU0MGEtN2EwNi00ZmYzLWFmYTQtMjc4YjBkMzExMWJmNjM2NjMzMDQyNDk3MzAwMzYx"></script>

    <link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" type="text/css" rel="stylesheet" />

  </div>
</template>
<script>
import sidebar from '~/components/sidebar.vue'
export default {
  components: {
    sidebar,
  },


}
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

#main{
  width: calc(100% - 100px);
  float: right;
  display: block;

}
.slide-layout{
  transition: margin 0.2s ease-in-out;
  display: block;
}
.slide-layout-right{
  margin-right: -400px;
  margin-left: 400px;
}
</style>
