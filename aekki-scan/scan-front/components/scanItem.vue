<template>
    <div class="wrapper">
      <!-- {{$store.state[side]}} -->
      <div class="imagePlaceholder">
        <img :src="image_i" />
      </div>
      <div class="buttonWrapper">
        <button @click="initScan">startscan</button>
        <span v-if="loading" class="loading-spinner" >|</span>
      </div>
      <button v-if="image_i && !loading" @click="uploadImage()">upload!</button>

      <!-- v-if="loading" -->
    </div>
</template>


<script>

export default {
  components: {
  },
  data: function() {
    return {
      image_i: '',
      imageblob:'',
      loading: false
    }
  },


  props:['side'],
  mounted() {
    // this.initScan()

  },
  methods: {

    uploadImage: function() {
      var vm = this
      var formData = new FormData();

      var file = new File([vm.imageblob], "walletimg.jpg", {type: "image/jpeg"});

      formData.append('files', file);

      fetch('http://localhost:1337/upload', {
          method: 'post',
          headers: {
            'Authorization': `Bearer `+vm.$store.state.jwtAuthToken,
          },
          body: formData

        })
        .then((res) => {
          if (res.status !== 200) return;
          console.log('yaaaas')

          res.json().then(function(data) {
            vm.$store.commit('setSide',{side:vm.side,state:true,response:data})
            console.log(data)
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    initScan: function() {
      this.loading = true
      this.image_i = ''
      var vm = this

      var url = 'http://localhost:8080/api/scanitem';
      var options = {
        method: 'POST',
      };
      var request = new Request(url);

      // fetch(request, options).then((response) => {
      //   response.arrayBuffer().then((buffer) => {
      //     // var base64Flag = 'data:image/jpeg;base64,';
      //     var imageStr = arrayBufferToBase64(buffer);
      //     vm.image_i = imageStr
      //     vm.loading= false
      //     // document.querySelector('img').src = base64Flag + imageStr;
      //   });
      // });


      fetch(request, options).then((response) => response.blob())
      .then((blob) => {
//           var myReader = new FileReader();
//           var myBlob = blob;
//           console.log(myBlob)
// myReader.onload = function(event){
//     console.log(JSON.stringify(myReader.result));
// };
// myReader.readAsText(myBlob);
      // var formData = new FormData();
      // formData.append('blobdata', blob);
          vm.imageblob = blob


          vm.$store.commit('setBlob',blob)


          var imageUrl = URL.createObjectURL(blob);
          var img = vm.$el.querySelector('img');
          // alert(URL.revokeObjectURL(imageUrl))
          img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
          vm.image_i = imageUrl
          vm.loading= false

          // document.querySelector('img').src = imageUrl;
      })


      function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
      };
    }
  }
}
</script>

<style>

.loading-spinner {
  animation: rotate 1.5s linear infinite;
  display: block;
  position: absolute;
  right: 0;
}

.buttonWrapper button{
  float: left;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
.buttonWrapper{
  position: relative;
  width: 25%;
  margin: 0 auto;
  padding: 10px;
}
.wrapper{
  width: 400px;
  padding: 10px;
}
  .imagePlaceholder{
    width: 100%;
    min-height: 400px;
    background: url('http://www.palazzodellemisture.it/wp-content/uploads/2017/01/placeholder.jpg') no-repeat center center ;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  }
  img{
    width: 100%;
    display: block;
  }
</style>
