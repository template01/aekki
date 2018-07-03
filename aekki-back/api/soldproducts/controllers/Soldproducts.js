'use strict';

/**
 * Soldproducts.js controller
 *
 * @description: A set of functions called "actions" for managing `Soldproducts`.
 */

module.exports = {

  /**
   * Retrieve soldproducts records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.soldproducts.fetchAll(ctx.query);
  },

  /**
   * Retrieve a soldproducts record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.soldproducts.fetch(ctx.params);
  },

  /**
   * Create a/an soldproducts record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.soldproducts.add(ctx.request.body);
  },

  /**
   * Update a/an soldproducts record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.soldproducts.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an soldproducts record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.soldproducts.remove(ctx.params);
  }
};
