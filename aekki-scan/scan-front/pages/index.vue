<template>
<section class="container">
  <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
  <scanitem v-on:close="sideAopen = false" v-if="sideAopen" side="sideA" class="scanItem"></scanitem>
  <scanitem v-on:close="sideBopen = false" v-if="sideBopen" side="sideB" class="scanItem"></scanitem>
  <receipt v-if="receiptOpen" v-on:close="receiptOpen = false" :data="receipt"></receipt>
  <div class="tableWrapper ignorePrint">
    <div class="grid">
      <div class="grid-column">
        <div class="grid-item header">Scan Items</div>
      </div>
      <!-- <div class="grid-column">
                <div class="grid-item header">Header3</div>
                <div class="grid-item header">Header4</div>
                <div class="grid-item header">Hear5</div>
            </div> -->
      <div class="grid-column">
        <div class="grid-item"><span>Scan Side A</span></div>
        <div class="grid-item"><button @click="sideAopen = !sideAopen">Start Scan</button></div>
        <div class="grid-item"><img style="width:200px" v-if="$store.state.sideA.data" :src="$store.state.sideA.data[0].url" />
          <span v-else>...Waiting for scan</span></div>
      </div>
      <div class="grid-column">
        <div class="grid-item"><span>Scan Side B</span></div>
        <div class="grid-item"><button @click="sideBopen = !sideBopen">Start Scan</button></div>
        <div class="grid-item"><img style="width:200px" v-if="$store.state.sideB.data" :src="$store.state.sideB.data[0].url" />
          <span v-else>...Waiting for scan</span></div>
      </div>
      <div class="grid-column">
        <div class="grid-item header">
          Color Picker
          <p>
            (Pick at least one)
          </p>
        </div>
      </div>
      <div class="grid-column">
        <div class="grid-item">
          <span class="colorCheck" v-for="color in colors" :key="color.value">
            <!-- <input type="checkbox" :id="color.value" :value="color.value" v-model="color.set">
            <label :for="color.value">Mike</label> -->
             <input  type="checkbox" name="checkbox" v-model="color.set" :id="color.value" :value="color.value">
             <label  v-bind:style="{ background: color.value }" class="color-circle" :for="color.value"> </label>
          </span>
          <!-- <button @click="findChecked(colors,'Blue')">checked {{}}</button> -->
        </div>
      </div>
      <div class="grid-column">
        <div class="grid-item header">Model Picker
          <p>
            (Pick one)
          </p>
        </div>
      </div>
      <div class="grid-column">
        <div class="grid-item">
          <span style="padding-right:20px; text-transform: capitalize" v-for="model in models" :key="model">
            <input type="radio" :id="model" :value="model" v-model="pickedmodel">
            <label :for="model">{{model}}</label>
            <span class="checked"></span>
          </span>
        </div>
      </div>
      <div class="grid-column">
        <div class="grid-item header">Create Product</div>
      </div>
      <div class="grid-column">
        <div class="grid-item">
          <div v-if="canstart && allfilledin">
            <button @click="createWallet">Create Product</button>
          </div>
          <div v-if="canstart && !allfilledin">
            <span>Please fill in the above</span>
          </div>
        </div>
      </div>
      <!-- {{receipt}} -->
      <div v-if="receipt" class="grid-column">
        <div class="grid-item header">Receipt</div>
      </div>
      <div v-if="receipt"  class="grid-column">
        <div class="grid-item">
          <div >
            <button @click="receiptOpen = true">Open Receipt</button>
          </div>
        </div>
      </div>
    </div>
    <!--
    <table style="width:600px">
      <tbody>

        <tr>
          <td><span>Scan Side A</span></td>
          <td><button @click="sideAopen = !sideAopen">Start Scan</button></td>
          <td><img style="width:200px" v-if="$store.state.sideA.data" :src="$store.state.sideA.data[0].url" />
            <span v-else>... waiting for scan</span>
          </td>
        </tr>
        <tr>
          <td><span>Scan Side B</span></td>
          <td><button @click="sideBopen = !sideBopen">Start Scan</button></td>
          <td><img style="width:200px" v-if="$store.state.sideB.data" :src="$store.state.sideB.data[0].url" />
            <span v-else>... waiting for scan</span>
          </td>
        </tr>
        <tr>

          <th rowspan="3"><span>Color-Picker</span></th>
        </tr>

      </tbody>
    </table>
    <div class="uploadWrapper">
      <div v-if="canstart && allfilledin">
        <button @click="createWallet">createWallet</button>
      </div>
      <div v-if="canstart && !allfilledin">
        <span>fill in all plz</span>
      </div>
    </div> -->
  </div>





  <link rel="stylesheet" :href="'croppie/croppie.css'" />
  <script :src="'croppie/croppie.js'"></script>
</section>
</template>

<script>
import authdetails from '~/authdetails.json'
import scanitem from '~/components/scanItem.vue'
import receipt from '~/components/receipt.vue'

export default {
  components: {
    scanitem,
    receipt
  },

  data: function() {
    return {
      tokenScan: '',
      canstart: false,
      image: '',
      pickedmodel: '',
      receiptOpen: false,
      receipt:'',
      models: ['ækki-one', 'ækki-slim', 'ækki-fat'],
      colors: [{
        "color": "red",
        "set": false,
        "value": "red"
      }, {
        "color": "yellow",
        "set": false,
        "value": "yellow"
      }, {
        "color": "blue",
        "set": false,
        "value": "blue"
      }, {
        "color": "green",
        "set": false,
        "value": "green"
      }, {
        "color": "white",
        "set": false,
        "value": "white"
      }, {
        "color": "purple",
        "set": false,
        "value": "purple"
      }, {
        "color": "black",
        "set": false,
        "value": "black"
      }, {
        "color": "orange",
        "set": false,
        "value": "orange"
      }],

      sideAopen: false,
      sideBopen: false,

    }
  },

  computed: {
    allfilledin: function() {
      return this.$store.state.sideA.state && this.$store.state.sideB.state && this.colors.filter(o => o.set === true).length > 0 && this.pickedmodel.length > 0
    },
  },

  methods: {

    // checkIfChecked: function(color){
    //   return color.set === true;
    // },

    findChecked: function(colors, color) {
      if (colors.filter(o => o.set === true && o.color === color).length > 0) {
        return true
      } else {
        return false
      }
    },

    resetForm: function() {
      // return this.$store.state.sideA.state && this.$store.state.sideB.state && this.colors.filter(o=> o.set === true).length>0 && this.pickedmodel.length>0
      this.pickedmodel = ''
      var vm = this
      for (var i = 0, len = this.colors.length; i < len; i++) {
        vm.colors[i].set = false
      }
      this.$store.commit('setSide', {
        side: 'sideA',
        state: false,
        response: ''
      })
      this.$store.commit('setSide', {
        side: 'sideB',
        state: false,
        response: ''
      })
    },

    createWallet: function() {
      var vm = this
      fetch('http://localhost:1337/wallets', {
          method: 'post',
          headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ` + vm.$store.state.jwtAuthToken
          },
          body: JSON.stringify({
            'Color-blue': this.findChecked(this.colors, 'blue'),
            'Color-yellow': this.findChecked(this.colors, 'yellow'),
            'Color-red': this.findChecked(this.colors, 'red'),
            'Color-green': this.findChecked(this.colors, 'green'),
            'Color-purple': this.findChecked(this.colors, 'purple'),
            'Color-white': this.findChecked(this.colors, 'white'),
            'Color-black': this.findChecked(this.colors, 'black'),
            'Color-orange': this.findChecked(this.colors, 'orange'),
            'Model': this.pickedmodel,
            'productimage_a': this.$store.state.sideA.data[0],
            'productimage_b': this.$store.state.sideB.data[0]
          })

          //  `Color-blue=` + 'true' + '&' + `productimage_a=` + JSON.stringify(this.$store.state.sideA.data[0])
        })
        .then((res) => {
          if (res.status !== 200) return;
          vm.resetForm()
          res.json().then(function(data) {
            vm.receipt= data
            vm.receiptOpen = true
          })
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
  margin-bottom: 80px;
  width: 900px;
}

.uploadWrapper {
  text-align: center;
  padding-top: 20px;
}

/*
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
} */

.grid {

  display: flex;
  flex: 0 0 50%;
  border: 1px solid black;
  flex-direction: column;
}

.grid-column {
  display: flex;
  flex: 1 0 auto;

}

.grid-item {
  flex: 1 1 0px;
  /* background: #aaa; */
  border: 1px solid black;
  line-height: 2em;
  padding: 20px;
}

.header {
  /* background: #eee; */
  font-weight: bold;
  text-align: center;
}

.color-circle {
  height: 50px;
  width: 50px;
  display: inline-block;
  font-size: 80%;
  border-radius: 100%;
  border: 2px solid black;
  padding-right: 20px;
  margin-right: 10px;
}

.colorCheck {
  display: inline-block;

}

label:before {
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  font-size: 40px;
  font-weight: bold;
  display: inline-block;
  position: absolute;
  text-align: center;
  height: 50px;
  width: 45px;
  line-height: 45px;
}

.colorCheck input[type='checkbox']+label:before {
  content: " ";
}

.colorCheck input[type='checkbox']:checked+label:before {
  content: "✓";
}

.colorCheck input[type='checkbox'] {
  display: none;
}

/* .color-circle input[type='checkbox'] {
    display:none;
} */

button {
  border: 2px solid black;
  background: white;
  outline: none;
  /* font-weight: bold; */
  padding: 8px;
  font-size: 100%;
  font-family: 'Space Mono', monospace;
}

@media print {
   .ignorePrint{
     display: none;
   }
}
</style>
