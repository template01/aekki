<template>
<section class="container">

  <div v-if="canstart && allfilledin">
    <button @click="createWallet">createWallet</button>
  </div>
  <scanitem side="sideA" class="scanItem"></scanitem>
  <scanitem side="sideB"  class="scanItem"></scanitem>

</section>
</template>

<script>
import authdetails from '~/authdetails.json'
import scanitem from '~/components/scanItem.vue'

export default {
  components: {
    scanitem
  },

  data: function() {
    return {
      tokenScan: '',
      canstart: false,
      image: '',

    }
  },

  computed:{
    allfilledin: function(){
      return this.$store.state.sideA.state && this.$store.state.sideB.state
    },
  },

  methods: {


    createWallet: function() {
      var vm = this

      alert()
      fetch('http://localhost:1337/wallets', {
          method: 'post',
          headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer `+vm.$store.state.jwtAuthToken
          },
          body: JSON.stringify({'Color-blue': true, 'productimage_a': this.$store.state.sideA.data[0]})

          //  `Color-blue=` + 'true' + '&' + `productimage_a=` + JSON.stringify(this.$store.state.sideA.data[0])
        })
        .then((res) => {
          if (res.status !== 200) return;
          // res.json().then(function(data) {
          //   vm.productviewid = data._id
          // })
          console.log('yaaaas')
          // res.json().then((data) => console.log(data));
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    getAuth: function() {
      var vm = this
      fetch('http://localhost:1337/auth/local', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authdetails)
        })
        .then((res) => {
          if (res.status !== 200) return;

          res.json().then(function(data) {
            console.log(data.jwt)
            vm.$store.commit('setAuthToken',data.jwt)
            vm.tokenScan = data.jwt
            vm.canstart = true
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    }
  },

  mounted() {
    this.getAuth()
    // (async() => {
    //   const rawResponse = await fetch('http://localhost:1337/auth/local', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       identifier: 'scanopsuser',
    //       password: 'erunrebe'
    //     })
    //   });
    //   const content = await rawResponse.json();
    //
    //   console.log(content.jwt);
    // })();


    // (async() => {
    //   const rawResponse = await fetch('http://localhost:1337/auth/local', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       identifier: 'scanopsuser',
    //       password: 'erunrebe'
    //     })
    //   });
    //   const content = await rawResponse.json();
    //
    //   console.log(content.jwt);
    // })();
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
  }

}
</script>

<style>
.scanItem {
  float: left
}
</style>
