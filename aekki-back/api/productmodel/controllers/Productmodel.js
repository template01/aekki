'use strict';

/**
 * Productmodel.js controller
 *
 * @description: A set of functions called "actions" for managing `Productmodel`.
 */

module.exports = {

  /**
   * Retrieve productmodel records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.productmodel.fetchAll(ctx.query);
  },

  /**
   * Retrieve a productmodel record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.productmodel.fetch(ctx.params);
  },

  /**
   * Create a/an productmodel record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.productmodel.add(ctx.request.body);
  },

  /**
   * Update a/an productmodel record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.productmodel.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an productmodel record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.productmodel.remove(ctx.params);
  }
};
