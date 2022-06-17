const mutateLayout = layout => layout.map( row => {
  // console.log('currentRow : ', row)
  const mutateRow = row.reduce((acc, field)=>{

    const isFieldNewEnabled = field.fieldSchema.pluginOptions?.['field-test'].enabled;
    
    if(!isFieldNewEnabled){
      return [...acc, field];
    }

    return [...acc, { ...field, fieldSchema: {...field.fieldSchema, type: 'field-test' } }]
    
  }, [] );

  // console.log('maybeRowMutated: ', mutateRow)
  return mutateRow;
})





const mutateEditViewHook = ({layout, query}) => {

  const mutatedEditLayout = mutateLayout(layout.contentType.layouts.edit)

  const enhancedLayouts = {
    ...layout.contentType.layouts,
    edit: mutatedEditLayout
  }


  return {
    query,
    layout: {
      ...layout,
      contentType: {
        ...layout.contentType,
        layouts: enhancedLayouts,

      }
    }
  };
};

export default mutateEditViewHook