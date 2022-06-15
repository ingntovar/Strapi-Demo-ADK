// server/services/task.js
'use strict';

const { createCoreService } = require('@strapi/strapi').factories;


module.exports = createCoreService('plugin::view-page.view-url', ({strapi}) => ({

  async  getContentTypesCollections() {
    let contentTypeNames = [];
    Object.values(strapi.contentTypes).forEach(contentType => {
      if (contentType.uid.includes('api::') && contentType.kind === 'collectionType' ) {
        contentTypeNames.push(contentType.info.pluralName);
      }
    });
    const contentTypes = JSON.stringify( contentTypeNames );
    return  contentTypes;
  },
  
}));