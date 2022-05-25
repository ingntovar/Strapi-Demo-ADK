'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('view-page')
      .service('myService')
      .getWelcomeMessage();
  },
};
