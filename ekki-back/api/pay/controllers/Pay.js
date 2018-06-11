'use strict';
const fetch = require('node-fetch');
const base64 = require('base-64');

// const snipapi =  require('../../../config/functions/snipapi.json')
// var snipApi =  snipapi.key
// var encodedSnipApi = base64.encode(':' + snipApi)



// CAN WORK AS WEBHOOK!

/**
 * Pay.js controller
 *
 * @description: A set of functions called "actions" for managing `Pay`.
 */

module.exports = {
  create: async (ctx) => {
    console.log(ctx.request.header['x-snipcart-requesttoken'])
    if(ctx.request.header['x-snipcart-requesttoken']){

      console.log(true)
      validate(ctx.request.header['x-snipcart-requesttoken'])
    }
    // console.log(ctx.request.body)
    // return strapi.services.wallets.add(ctx.request.body);
    // return strapi.services.pay.add(ctx.request.body);
  },

};


function validate(token) {
  var encodedSnipApi = base64.encode(':' + token)

  fetch('https://app.snipcart.com/api/requestvalidation/' + token, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + encodedSnipApi
      },
    })
    .then(res => res.json())
    .then(function(result) {
      //if not empty - IF ORDER REALLY HAS BEEN PLACED
      console.log(result)
      // if (!_.isEmpty(result)) {
      //   console.log(result.items)
      //   for (var i = 0, len = result.items.length; i < len; i++) {
      //    console.log(result.items[i].id)
      //    sendItemSold(result.items[i].id)
      //    // dublicate + remove product
      //    duplicateAndDelete(result.items[i].id)
      //   }
      // }
    });
}
