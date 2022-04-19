'use strict';

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({strapi})=>({
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, populate: '*' }
    
    // Calling the default core action
    const { data, meta } = await super.find(ctx);


    return { data, meta };
  }
}));
