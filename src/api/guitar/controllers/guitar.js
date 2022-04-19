'use strict';

/**
 *  guitar controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::guitar.guitar', ({strapi}) => ({
  async find(ctx){
    ctx.query = {...ctx.query, populate: '*'};

    const { data, meta } = await super.find(ctx);

    return {data, meta}
  }
}));
