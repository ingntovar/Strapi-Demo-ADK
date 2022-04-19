'use strict';

/**
 * `ratelimit` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In ratelimit middleware.');

    await next();
  };
};
