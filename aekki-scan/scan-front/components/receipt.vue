<template>
<div class="wrapper">
  <div class="tableWrapper">
    <div class="grid">
      <div class="grid-column">
        <div class="grid-item header">Product Details</div>
      </div>
      <div class="grid-column">
        <div class="grid-item">
          ID: {{data._id}}
        </div>
        <div class="grid-item">
          MODEL: {{data.Model}}
        </div>
        <div class="grid-item">
          COLORS:

          <span v-if="data['Color-blue']">blue </span>
          <span v-if="data['Color-red']">red </span>
          <span v-if="data['Color-green']">green </span>
          <span v-if="data['Color-white']">white </span>
          <span v-if="data['Color-yellow']">yellow </span>
          <span v-if="data['Color-black']">black </span>
          <span v-if="data['Color-red']">red </span>
          <span v-if="data['Color-purple']">purple </span>
          <span v-if="data['Color-orange']">orange </span>
        </div>
      </div>
      <div class="grid-column">
        <div class="grid-item">
          MUGSHOTS:
        </div>
        <div class="grid-item">
          <img :src="'http://localhost:1337/'+data.productimage_a.url" />
        </div>
        <div class="grid-item">
          <img :src="'http://localhost:1337/'+data.productimage_b.url" />
        </div>
      </div>
      <div class="grid-column">
        <div class="grid-item">
          CREATED AT: {{data.createdAt}}
        </div>
      </div>
      <div class="grid-column ignorePrint">
        <div class="grid-item">
          <button @click="print()">Print</button>
        </div>
        <div class="grid-item">
          <button @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
      modalopen: false,
      image_i: '',
      imageblob: '',
      loading: false,
      croppieInstance: '',
      ignoreNoData: false,
      hasSent:false
    }
  },


  props: ['data'],
  mounted(){
    var vm = this
    setTimeout(function(){
      this.print()
    },500)
  },

  methods:{
    print: function(){
      if (process.browser) {
        window.print()
      }
    }
  }
}

  </script>

<style scoped>
.wrapper {
  display: block;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 100%;
}

.grid {
  background: white
}

img {
  width: 100%;
  display: block;
}


@media print {
  .tableWrapper {
    width: 100%;
    margin: 0 auto;
    font-size: 10pt !important;
    /* font-family: monospace; */
  }

  @page {
    /* dimensions for the whole page */
    size: A6 portrait;
    margin: 8mm;
  }
  .grid-item {
    padding: 1mm;
    border: 0.1mm solid black;
  }
  .grid {

    border: 0.1mm solid black;
  }
}
</style>
