// server/services/task.js
'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

const getPluginStore = () =>{
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'view-page'
  })
}

const createDefaultConfig = async () => {
  const pluginStore = getPluginStore();
  const contentTypes = JSON.parse(getContentTypes());

  const value = {
    domain: 'mydomain.com',
    parentSlugs:{}
  };
  contentTypes.forEach(ctype => {
    value.parentSlugs[ctype] = ctype;
  });

  await pluginStore.set({
    key: 'settings', 
    value
  });

  return pluginStore.get({
    key: 'settings'
  });

}

const getContentTypes = () => {
  let contentTypeNames = [];
  Object.values(strapi.contentTypes).forEach(contentType => {
    if (contentType.uid.includes('api::') && contentType.kind === 'collectionType' ) {
      contentTypeNames.push(contentType.info.pluralName);
    }
  });
  const contentTypes = JSON.stringify( contentTypeNames);
  return contentTypes
}




module.exports = createCoreService('plugin::view-page.view-url', ({strapi}) => ({

  //For GET /content-types route:
  async  getContentTypesCollections() {

    const contentTypesCollection = getContentTypes();
    
    return  contentTypesCollection;
  },

  //For POST /settings route
  async setSettingsService(settings){
    const value = settings;
    const pluginStore = getPluginStore();
    await pluginStore.set({
      key: 'settings', value
    });
    
    return pluginStore.get({
      key: 'settings'
    });
  },

  //For GET /settings route
  async getSettingsService(){
    const pluginStore = getPluginStore();
    let config = await pluginStore.get({
      key: 'settings',
    });
    if(!config || Object.keys(config).length <= 0 ){
      config = await createDefaultConfig();
    }
    
    return config;
  },

  
}));