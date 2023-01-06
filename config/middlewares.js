module.exports = [
  'strapi::errors',
  
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        userDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', '*.tile.openstreetmap.org', 'dl.airtable.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', '*.tile.openstreetmap.org', 'dl.airtable.com' ],
          upgradeInsecureRequests: null,
        }
      }
    }
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
