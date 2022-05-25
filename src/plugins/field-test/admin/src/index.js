import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
const name = pluginPkg.strapi.name;

import FieldNew from './components/FieldNew';
import mutateEditViewHook from './mutateEditViewHook';

export default {
  register(app) {

    app.addFields({
      type: 'field-test',
      Component: FieldNew
    });

    
    app.registerPlugin({
      id: pluginId,
      name,
    });
  },

  bootstrap(app) {
    app.registerHook(
      "Admin/CM/pages/EditView/mutate-edit-view-layout",
      mutateEditViewHook
    )
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
