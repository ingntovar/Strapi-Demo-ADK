// server/controllers/task.js
'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::view-page.view-url',  ({strapi}) => ({
  async getContentTypes(ctx) {
    try {
      
      ctx.body = await strapi
        .plugin('view-page')
        .service('viewUrl')
        .getContentTypesCollections()

    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));

