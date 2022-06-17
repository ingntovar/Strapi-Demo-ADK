// server/routes/task.js
// server/routes/task.js
'use strict';

/**
 *  router.
 */

module.exports = {
  type: 'admin',
  routes: [

    //Helper to get all content types available

    {
      method: 'GET',
      path: '/content-types',
      handler: 'viewUrl.getContentTypes',
      config: {
        policies: [],
        auth: false,
      },
    },

    //Get Settings Object

    {
      method: 'GET',
      path: '/settings',
      handler: 'viewUrl.getSettings',
      config: {
        policies: [],
        auth: false,
      },
    },

    //Set settings object

    {
      method: 'POST',
      path: '/settings',
      handler: 'viewUrl.setSettings',
      config: {
        policies: [],
        auth: false,
      },
    },

    
  ],
};