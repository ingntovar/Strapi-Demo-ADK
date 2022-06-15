// server/routes/task.js
// server/routes/task.js
'use strict';

/**
 *  router.
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/content-types',
      handler: 'viewUrl.getContentTypes',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};