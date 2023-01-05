module.exports = ({ env }) => ({

  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  'field-test': {
    enabled: true,
    resolve: './src/plugins/field-test'
  },

  'view-page': {
    enabled: true,
    resolve: './src/plugins/view-page'
  },
  'map-field': {
    enabled: true,
    resolve: './src/plugins/map-field'
  },
});
 