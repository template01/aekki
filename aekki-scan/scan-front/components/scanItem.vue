<template>
<div class="wrapper">
  {{side}}
  <!-- {{$store.state[side]}} -->
  <!-- <div class="imagePlaceholder">
  <img :src="image_i" />
  </div> -->
  <img style="display:none" />


  <!-- <div class="buttonWrapper">
    <div v-if="!image_i">
      <button  @click="initScan">Scan</button>
      <span v-if="loading" class="loading-spinner">|</span>
    </div>
    <div  v-else>
    <button @click="modalopen=true">Adjust</button>
  </div> -->

  <!-- </div> -->

  <div id="" class="cropWrapOuter">
      <div class="optionsWrapper">
        <button v-if="ignoreNoData" v-on:click="$emit('close')">Nothing set. Just close it!</button>
        <button v-else v-on:click="checkClose()">Close</button>

        <button @click="initScan">Rescan</button>
        <span v-if="loading" class="loading-spinner">|</span>
        <button v-if="!loading && image_i" @click="rotateCroppie()">Rotate</button>
        <button v-if="!loading && image_i && !imageblob" @click="setBlobResult()">Set</button>
        <button v-if="!loading && image_i && imageblob" @click="uploadImage()">Send</button>
      </div>
      <div>
        <div id="" class="cropWrap"></div>
      </div>
  </div>

  <!-- v-if="loading" -->
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


  props: ['side'],
  mounted() {
    var vm = this
    vm.initScan()
    // setTimeout(function() {
    //
    //   alert('go')
    // },1000)
  },
  methods: {
    checkClose: function(){
      if(this.$store.state[this.side].data && this.imageblob && this.hasSent){
        this.$emit('close')
      }else{
        this.ignoreNoData = true
        var vm = this
        setTimeout(function(){
          vm.ignoreNoData = false
        },2000)
      }
    },
    startCroppie: function() {
      var vm = this
      var el = vm.$el.querySelector(".cropWrap");
      if(vm.croppieInstance.length!=0){
        vm.croppieInstance.destroy()
      }
      vm.croppieInstance = new Croppie(el, {
        viewport: {
          width: 500,
          height: 300
        },
        boundary: {
          width: 900,
          height: 500
        },
        showZoomer: false,
        enableResize: true,
        enableOrientation: true,
        mouseWheelZoom: 'ctrl',
        enforceBoundary: false
      });
      vm.croppieInstance.bind({
        url: vm.image_i,
        orientation: 6,

        zoom: 0.4
      });

      el.addEventListener('update', function(ev) { vm.imageblob='' });

      vm.loading = false
      vm.modalopen = true


    },
    rotateCroppie: function(){
      var vm = this
      vm.croppieInstance.rotate(90)
    },

    setBlobResult: function() {
      //on button click
      var vm = this
      this.croppieInstance.result({
        "type": "blob",
        "format": "jpeg",
        "size": {"width":1024},
        "quality":0.85
      }).then(function(blob) {

        console.log(blob)
        vm.imageblob = blob
        vm.$store.commit('setBlob', blob)

        // do something with cropped blob
      });
    },

    uploadImage: function() {
      var vm = this
      var formData = new FormData();

      var file = new File([vm.imageblob], "walletimg.jpg", {
        type: "image/jpeg"
      });

      formData.append('files', file);

      fetch('http://localhost:1337/upload', {
          method: 'post',
          headers: {
            'Authorization': `Bearer ` + vm.$store.state.jwtAuthToken,
          },
          body: formData

        })
        .then((res) => {
          if (res.status !== 200) return;
          console.log('yaaaas')

          res.json().then(function(data) {
            vm.$store.commit('setSide', {
              side: vm.side,
              state: true,
              response: data
            })
            vm.hasSent = true
            vm.ignoreNoData = false
            console.log(data)
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    initScan: function() {
      this.ignoreNoData = false
      this.loading = true
      this.image_i = ''
      var vm = this
      var gotImage = function(){
        var imageUrl = 'test.jpg';
        // var imageUrl = URL.createObjectURL(blob);
        var img = vm.$el.querySelector('img');
        // alert(URL.revokeObjectURL(imageUrl))
        img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
        vm.image_i = imageUrl
        vm.startCroppie()
      }
      gotImage()
      var url = 'http://localhost:8080/api/scanitem';
      var options = {
        method: 'POST',
      };
      var request = new Request(url);
      fetch(request, options).then((response) => response.blob())
        .then((blob) => {
          gotImage()
        })
    }
  }
}
</script>

<style>
.loading-spinner {
  animation: rotate 1.5s linear infinite;
  display: block;
  position: absolute;
  right: -20px;
}

.buttonWrapper button {
  float: left;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.buttonWrapper {
  position: relative;
  width: 40px;
  margin: 0 auto;
  /* padding: 10px; */
}

.imagePlaceholder {
  width: 100%;
  min-height: 400px;
  background: url('http://www.palazzodellemisture.it/wp-content/uploads/2017/01/placeholder.jpg') no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

}

img {
  width: 100%;
  display: block;
}

.wrapper{
  display: block;
  padding: 20px;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.5);
  width: 100%;
  height: 100%;
}
.optionsWrapper{
  background: red;
  display: inline-block;
}
</style>
