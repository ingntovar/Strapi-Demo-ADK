import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import MapIcon from './components/MapIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "map",
      pluginId: "map-field", // the custom field is created by a color-picker plugin
      type: "json", // the color will be stored as a string
      intlLabel: {
        id: "map-field.map.label",
        defaultMessage: "Map",
      },
      intlDescription: {
        id: "map-field.map.description",
        defaultMessage: "Select any point",
      },
      icon: MapIcon, // don't forget to create/import your icon component 
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./components/MapInput"),
      },
      options: {
        // declare options here
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
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
