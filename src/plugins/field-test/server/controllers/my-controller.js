'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('field-test')
      .service('myService')
      .getWelcomeMessage();
  },
};
