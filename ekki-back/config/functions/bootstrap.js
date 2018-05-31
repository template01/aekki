'use strict';
const fetch = require('node-fetch');
const base64 = require('base-64');
const _ = require('lodash');
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
         // remove product
         strapi.services.wallets.remove({'_id':result.items[i].id});
        }
      }
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
  var io = require('socket.io')(strapi.server);
  // var users = [];
  io.on('connection', function(socket) {


    // strapi.services.soldwallets.add(strapi.services.wallets.fetch({'_id':'5b0fc5dc1a1ab63395f6be12'}));

    socket.emit('hello', JSON.stringify({
      message: 'Hello World'
    }));
    // socket.user_id = (Math.random() * 100000000000000); // not so secure
    // users.push(socket); // save the socket to use it later
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

      // users.forEach((user, i) => {
      //   // delete saved user when they disconnect
      //   if(user.user_id === socket.user_id) users.splice(i, 1);
      // });
    });
    socket.on('item ordered', function(token) {
      console.log(token)


      setTimeout(function() {
        deleteProduct(token)
      }, 500)
      setTimeout(function() {
        deleteProduct(token)
      }, 1000)
      setTimeout(function() {
        deleteProduct(token)
      }, 1500)
    });
  });

  strapi.io = io;
  // send to all users connected
  strapi.emitToAllUsers = view => io.emit('wallet_view', view);
  cb();
};
