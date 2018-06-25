'use strict';

const fetch = require('node-fetch');
const base64 = require('base-64');
const _ = require('lodash');

const snipapi = require('../../../snipapi.json')
var snipApi = snipapi.key
var encodedSnipApi = base64.encode(':' + snipApi)


function duplicateAndDelete(id) {
  fetch('http://localhost:1337/product/' + id, {
      method: 'GET',

    })
    .then(res => res.json())
    .then(function(result) {
      //if not empty - IF ORDER REALLY HAS BEEN PLACED
      console.log(result)
      // duplicate item
      strapi.services.soldproducts.add(result);
      // delet product item
      strapi.services.product.remove({
        '_id': id
      });
    });
}

function sendItemSold(id) {
  strapi.emitSoldItemToAllUsers(id);
}

function verifyTokenAndProcess(requesttoken, results) {
  fetch('https://app.snipcart.com/api/requestvalidation/' + requesttoken, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + encodedSnipApi
      },
    })
    .then(res => res.json())
    .then(function() {
      //if not empty - IF ORDER REALLY HAS BEEN PLACED
      console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees')
      if (!_.isEmpty(results)) {
        // console.log(results.items)
        for (var i = 0, len = results.items.length; i < len; i++) {
          console.log(results.items[i].id)
          sendItemSold(results.items[i].id)
          // dublicate + remove product
          duplicateAndDelete(results.items[i].id)
        }
      }
    });
}

/**
 * Moveproduct.js controller
 *
 * @description: A set of functions called "actions" for managing `Moveproduct`.
 */




module.exports = {

  create: async (ctx) => {





    // return strapi.services.moveproduct.add(ctx.request.body);
    console.log(ctx.request.header['x-snipcart-requesttoken'])
    console.log(ctx.request.body.eventName)

    var eventName = ctx.request.body.eventName
    // console.log(ctx.request)
    // console.log(ctx.request.body.content.items)
    var requesttoken = ctx.request.header['x-snipcart-requesttoken']


    if (eventName === 'order.completed') {
      console.log('completed')
      verifyTokenAndProcess(requesttoken, ctx.request.body.content)
    }

    if (eventName === 'order.status.changed') {
      console.log('cahnged')
    }



    // PSEUDO STEPS

    // WITH THE REQUEST TOKEN fetch
    // (this is pseudo bash)
    // curl -i -H 'Accept:application/json' -H 'Authorization:Basic {{YOURAPIKEY+:}}' https://app.snipcart.com/api/requestvalidation/{{requesttoken}}

    // IF response 200{{

    // console.log(ctx.request.body.content.items)
    // var moveitem = ctx.request.body.content.items[0].id
    // return strapi.services.product.remove({'_id':'moveitem'});

    //}}

    return {
      "success": false,
      "body": ctx.request.body
    }

  }
};
