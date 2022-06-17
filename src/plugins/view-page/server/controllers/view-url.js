// server/controllers/task.js
'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::view-page.view-url',  ({strapi}) => ({
  //For Content Types Route:
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

  //For Set Settings Route
  async setSettings(ctx){
    const { body } = ctx.request;
    try {
      await strapi
      .plugin('view-page')
      .service('viewUrl')
      .setSettingsService( body )
      ctx.body = await strapi
        .plugin('view-page')
        .service('viewUrl')
        .getSettingsService();
    } catch (err) {
      ctx.throw(500, err);
    }

  },

  //For Get Settings Route
  async getSettings(ctx){
    try {
      ctx.body = await strapi
      .plugin('view-page')
      .service('viewUrl')
      .getSettingsService()
    } catch (err) {
      ctx.throw(500, err);
    }
  }

}));

