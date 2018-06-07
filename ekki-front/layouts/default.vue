<template>
  <div>
    <div id="sidebar">

      <nav>
        <nuxt-link :to="'/'"><img width="100%" src="/logow.svg"/></nuxt-link>
        <p>
          <nuxt-link :to="'/vision'"><span class="circleNav"></span>Vision</nuxt-link>
        </p>
        <p>
          <nuxt-link :to="'/about'"><span class="circleNav"></span>About</nuxt-link>
        </p>

      </nav>
    </div>
    <div id="main">
      <nuxt/>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>

    <script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" id="snipcart" data-api-key="MzIxNWU0MGEtN2EwNi00ZmYzLWFmYTQtMjc4YjBkMzExMWJmNjM2NjMzMDQyNDk3MzAwMzYx"></script>

    <link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" type="text/css" rel="stylesheet" />

  </div>
</template>

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

#sidebar{
  background: black;
  width: 20%;
  height: 100%;
  position: fixed;
  padding: 5px;
  color: white;
}
#sidebar a{
  text-decoration: none;
  color: inherit;
}
#sidebar .circleNav::after{
 content: "○";
}
#sidebar .nuxt-link-exact-active .circleNav::after{
 content: "●";
}
#main{
  width: 80%;
  float: right;
}
</style>
