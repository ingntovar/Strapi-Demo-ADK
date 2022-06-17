/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';

import { Layout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { TextInput } from '@strapi/design-system/TextInput';

import axiosInstance from "../../utils/axiosInstance";
import ContentTypeAccordion from './ContentTypeAccordion';
import Buttons from './Buttons';


const getTheContentTypesCollections = async ( setContentTypes ) => {
  try {
    const { data } = await axiosInstance.get(`/view-page/content-types`);
    setContentTypes( data )
  } catch (err) {
    console.log(err)
  }
}




const HomePage = () => {

  const [contentTypes, setContentTypes ] = useState([])
  const [CTParentSlugs, setCTParentSlugs] = useState({})
  const [domain, setDomain] = useState('')

  useEffect( () => {
    setSavedSettings()
  }, [])

  const getSettings = async() => {
    try {
      const {data} = await axiosInstance.get(`/view-page/settings`)
      return data
    } catch (err) {
      console.log(err)
    }
  }
  
  const setSavedSettings = async () => {
    getTheContentTypesCollections( setContentTypes )

    const settingsObject = await getSettings()
    
    if('domain' in settingsObject ){
      setDomain(settingsObject.domain)
    }else{
      console.error('Error getting the domain name')
    }

    if('parentSlugs' in settingsObject){
      setCTParentSlugs(settingsObject.parentSlugs)
    }else{
      console.error('Error getting the parent slugs names')
    }
  }
  

  return (
    <Layout>
      <Box padding={10} paddingBottom={2} background="neutral0">
          <TextInput placeholder="This is a content placeholder" label="Domain" name="domain"  onChange={e => setDomain(e.target.value)} value={domain}  />
      </Box>

      {( contentTypes.length ) &&
        <ContentTypeAccordion 
          contentTypes = {contentTypes} 
          CTParentSlugs = {CTParentSlugs} 
          setCTParentSlugs = {setCTParentSlugs} 
        />
      }

      <Buttons
        CTParentSlugs = {CTParentSlugs} 
        domain = {domain} 
        setSavedSettings = {setSavedSettings}
      />
      
    </Layout>
  );
};

export default memo(HomePage);
