'use strict';
const fetch = require('node-fetch');
const base64 = require('base-64');
const _ = require('lodash');
var io = require('socket.io')(strapi.server);

const snipapi =  require('./snipapi.json')
var snipApi =  snipapi.key
var encodedSnipApi = base64.encode(':' + snipApi)

function deleteProduct(token) {
  fetch('https://app.snipcart.com/api/orders/' + token, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + encodedSnipApi
      },
    })
    .then(res => res.json())
    .then(function(result) {
      //if not empty - IF ORDER REALLY HAS BEEN PLACED
      if (!_.isEmpty(result)) {
        console.log(result.items)
        for (var i = 0, len = result.items.length; i < len; i++) {
         console.log(result.items[i].id)
         sendItemSold(result.items[i].id)
         // dublicate + remove product
         duplicateAndDelete(result.items[i].id)
        }
      }
    });
}

function sendItemSold(id){
  io.sockets.emit('item set ordered', {
    id: id
    // id: '5b1130001423b157946e4758'
  });
}

function duplicateAndDelete(id){
  fetch('http://localhost:1337/wallets/' + id, {
      method: 'GET',

    })
    .then(res => res.json())
    .then(function(result) {
      //if not empty - IF ORDER REALLY HAS BEEN PLACED
      console.log(result)
      // duplicate item
      strapi.services.soldwallets.add(result);
      // delet wallet item
      strapi.services.wallets.remove({'_id':id});
    });
}
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */
//
// module.exports = cb => {
//   cb();
// };
//
module.exports = cb => {
  // var users = [];
  io.on('connection', function(socket) {


    // strapi.services.soldwallets.add(strapi.services.wallets.fetch({'_id':'5b0fc5dc1a1ab63395f6be12'}));

    socket.emit('hello', JSON.stringify({
      message: 'Hello World'
    }));
    socket.on('disconnect', () => {
      console.log('exittttttttttttttttttttttttttttttttt')

      // on DISCONNECT remove viewing
      var disconnectUrl = socket.handshake.headers.referer
      if (disconnectUrl.includes("wallets")) {
        // get walletid
        var id = disconnectUrl.split("/").pop()
        // emit disconnect
        io.sockets.emit('wallet_view', [id, "false"]);
        // set db
        return strapi.services.productview.edit({
          'viewingid': id
        }, {
          "viewing": false
        });
      }

    });
    socket.on('item ordered', function(token) {
      setTimeout(function() {
        // deleteProduct(token)
      }, 500)
      setTimeout(function() {
        // deleteProduct(token)
      }, 1000)
      setTimeout(function() {
        // deleteProduct(token)
      }, 1500)
    });
  });

  strapi.io = io;
  // send to all users connected
  strapi.emitToAllUsers = view => io.emit('wallet_view', view);
  cb();
};
