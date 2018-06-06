<template>
<section class="container">
  <scanitem v-on:close="sideAopen = false" v-if="sideAopen" side="sideA" class="scanItem"></scanitem>
  <scanitem v-on:close="sideBopen = false" v-if="sideBopen" side="sideB" class="scanItem"></scanitem>
  <div class="tableWrapper">

    <table style="width:600px">
      <tbody>

        <tr>
          <td><span>Scan Side A</span></td>
          <td><button @click="sideAopen = !sideAopen">Open Scan Modal</button></td>
          <td><img style="width:200px" v-if="$store.state.sideA.data" :src="$store.state.sideA.data[0].url" />
            <span v-else>... waiting for scan</span>
          </td>
        </tr>
        <tr>
          <td><span>Scan Side B</span></td>
          <td><button @click="sideBopen = !sideBopen">Open Scan Modal</button></td>
          <td><img style="width:200px" v-if="$store.state.sideB.data" :src="$store.state.sideB.data[0].url" />
            <span v-else>... waiting for scan</span>
          </td>
        </tr>
        <!-- <tr> -->
        <!-- <td> -->
        <!-- </td> -->
        <!-- </tr> -->
      </tbody>
    </table>
    <div class="uploadWrapper">
      <div v-if="canstart && allfilledin">
        <button @click="createWallet">createWallet</button>
      </div>
      <div v-if="canstart && !allfilledin">
        <span>fill in all plz</span>
      </div>
    </div>
  </div>





  <link rel="stylesheet" :href="'croppie/croppie.css'" />
  <script :src="'croppie/croppie.js'"></script>
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
      sideAopen: false,
      sideBopen: false

    }
  },

  computed: {
    allfilledin: function() {
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
            'Authorization': `Bearer ` + vm.$store.state.jwtAuthToken
          },
          body: JSON.stringify({
            'Color-blue': true,
            'productimage_a': this.$store.state.sideA.data[0]
          })

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
            vm.$store.commit('setAuthToken', data.jwt)
            vm.tokenScan = data.jwt
            vm.canstart = true
          })
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    }
  },

  mounted() {
    this.getAuth()
  }

}
</script>

<style>
.scanItem {
  float: left
}

.tableWrapper {
  margin: 0 auto;
  display: table;
  margin-top: 80px;
}

.uploadWrapper{
  text-align: center;
  padding-top: 20px;
}

table,
td,
th {
  border: 1px solid black;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  height: 50px;
}

td {
  padding: 20px;
}
</style>
