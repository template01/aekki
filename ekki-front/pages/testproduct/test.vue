<template>
<div>
  baconnnn
  <button
    class="snipcart-add-item"
    data-item-id="2"
    data-item-name="Bacon"
    data-item-price="3.00"
    data-item-weight="20"
    data-item-url="http://74f037b1.ngrok.io/testproduct/test"
    data-item-description="Some fresh bacon">
    Buy bacon
</button>
</div>
</template>

<script>

import _ from 'lodash';

export default {
  components: {

  },
  computed: {
    // mix the getters into computed with object spread operator

  },
  data: function() {
    return {
      input: 'test',
      viewing: [],
      wallets: [],

    }
  },
  methods: {

  },

  mounted() {


  }
}
</script>

<style>

</style>
