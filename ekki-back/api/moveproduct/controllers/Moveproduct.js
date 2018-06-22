'use strict';

/**
 * Moveproduct.js controller
 *
 * @description: A set of functions called "actions" for managing `Moveproduct`.
 */

module.exports = {

  create: async (ctx) => {
    // return strapi.services.moveproduct.add(ctx.request.body);
    console.log(ctx.request.header['x-snipcart-requesttoken'])
    console.log(ctx.request.body.content.items)
    var requesttoken = ctx.request.header['x-snipcart-requesttoken']


    // PSEUDO STEPS

    // WITH THE REQUEST TOKEN fetch
    // (this is pseudo bash)
    // curl -i -H 'Accept:application/json' -H 'Authorization:Basic {{YOURAPIKEY+:}}' https://app.snipcart.com/api/requestvalidation/{{requesttoken}}

    // IF response 200{{

    // console.log(ctx.request.body.content.items)
    // var moveitem = ctx.request.body.content.items[0].id
    // return strapi.services.wallets.remove({'_id':'moveitem'});

      //}}

    return {
      "success": false,
      "body": ctx.request.body
    }

  }
};
