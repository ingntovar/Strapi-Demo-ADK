'use strict';

/**
 *  home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home.home', ({strapi}) => ({
  async find(ctx){

    const { data, meta } = await super.find(ctx);

    const {createdAt, updatedAt, publishedAt, ...cleanData } = data.attributes;
    data.attributes = cleanData;

    return {data, meta}
  }
}));