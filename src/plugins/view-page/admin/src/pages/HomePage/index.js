/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Layout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { TextInput } from '@strapi/design-system/TextInput';


import axiosInstance from "../../utils/axiosInstance";
import ContentTypeAccordion from './ContentTypeAccordion';


const getTheContentTypesCollections = ( setContentTypes, setError ) => {



  const refetchContentTypes = async () => {
    try {
      const { data } = await axiosInstance.get(`/view-page/content-types`);

      setContentTypes( data )
    } catch (e) {
      setError(true)
    }
  };

  refetchContentTypes()


}




const HomePage = () => {


  const [error, setError] = useState(false)
  const [content, setContent] = useState('')
  const [contentTypes, setContentTypes ] = useState([])

  useEffect(() => {
    
    getTheContentTypesCollections( setContentTypes, setError )

  }, [] )
  

  return (
    <Layout>
      <Box padding={10}>
          <TextInput placeholder="This is a content placeholder" label="Domain" name="domain" error={content.length > 5 ? 'Content is too long' : undefined} onChange={e => setContent(e.target.value)} value={content}  />
      </Box>

      {( contentTypes.length ) &&
        <ContentTypeAccordion contentTypes = {contentTypes}  />
      }

      

    </Layout>
  );
};

export default memo(HomePage);
