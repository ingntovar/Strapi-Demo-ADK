'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  Object.values(strapi.contentTypes).forEach((contentType) => {
    // Add tasks property
    contentType.attributes.viewUrl = {
      type: "relation",
      relation: "morphMany",
      target: "plugin::view-page.view-url",
      morphBy: "related",
      private: false,
      configurable: false,
    };
  });
};
