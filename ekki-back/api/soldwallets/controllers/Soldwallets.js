'use strict';

/**
 * Soldwallets.js controller
 *
 * @description: A set of functions called "actions" for managing `Soldwallets`.
 */

module.exports = {

  /**
   * Retrieve soldwallets records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.soldwallets.fetchAll(ctx.query);
  },

  /**
   * Retrieve a soldwallets record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.soldwallets.fetch(ctx.params);
  },

  /**
   * Create a/an soldwallets record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.soldwallets.add(ctx.request.body);
  },

  /**
   * Update a/an soldwallets record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.soldwallets.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an soldwallets record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.soldwallets.remove(ctx.params);
  }
};
