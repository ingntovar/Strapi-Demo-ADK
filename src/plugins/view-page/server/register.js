'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  Object.values(strapi.contentTypes).forEach((contentType) => {
    // Add tasks property
    const excludeCTBySingularName = [
      'permission',
      'user',
      'api-token',
      'file',
      'view-url',
      'locale',
      'role'
    ]
    if (contentType.uid.includes('api::') && !excludeCTBySingularName.includes(contentType.info.singularName) ) {
      contentType.attributes.viewUrl = {
        type: "relation",
        relation: "morphMany",
        target: "plugin::view-page.view-url",
        morphBy: "related",
        private: false,
        configurable: false,
      };
    }
  });
};
