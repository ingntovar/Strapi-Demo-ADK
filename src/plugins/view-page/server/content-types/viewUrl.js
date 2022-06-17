module.exports = {
  info: {
    tableName: "view-url",
    singularName: "view-url", // kebab-case mandatory
    pluralName: "view-urls", // kebab-case mandatory
    displayName: "View Url",
    description: "A view url to the frontend",
    kind: "collectionType",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: false,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    url: {
      type: "string",
      required: true,
      maxLength: 200,
    },
    related: {
      type: "relation",
      relation: "morphToOne",
    },
  },
};