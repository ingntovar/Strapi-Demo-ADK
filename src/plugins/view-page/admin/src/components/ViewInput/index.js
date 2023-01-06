import React, { useState, useEffect } from "react";

import { Accordion, AccordionToggle, AccordionContent, AccordionGroup } from '@strapi/design-system/Accordion';
import { IconButton } from '@strapi/design-system/IconButton';
import { Box } from '@strapi/design-system/Box';
import Pencil from '@strapi/icons/Pencil';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Link } from '@strapi/design-system/Link';

import {useCMEditViewDataManager} from '@strapi/helper-plugin'
import axiosInstance from "../../utils/axiosInstance";

/**
 * 
 * Custom Hook to get the current view-url value, dependending on the current screen
 * 
 * 
 */

function useRelatedViewUrl(setViewUrl, setInputValue, setHasAutomaticSlug) {
  const { initialData, isSingleType, slug, allLayoutData } = useCMEditViewDataManager();

  const refetchViewUrl = async () => {
    try {
      const {data}  = await axiosInstance.get(
        `/content-manager/${
          isSingleType ? "single-types" : "collection-types"
        }/${slug}/${isSingleType ? "" : initialData.id}?populate=viewUrl`
      );

      if(!data.viewUrl){ //Setting automatic link in case there's no instance of any previous link on the DB
        setHasAutomaticSlug(true)
        const {domain, parentSlugs} = await getSettings()
        const currentContentType = allLayoutData.contentType.info.pluralName
        let theLink = ''
        const maybeId = initialData.id
        const maybeSlug = initialData.slug
        
        const currentSlug = (maybeSlug === undefined) ? maybeId : maybeSlug
        
        if(isSingleType){
          const slugSingular = allLayoutData.contentType.info.singularName
          theLink = `${domain}/${slugSingular}`
        }else{
          const currentParentSlug = parentSlugs[currentContentType]
          theLink = `${domain}/${currentParentSlug}/${currentSlug}`
        }
        
        setInputValue(theLink)
        setViewUrl(theLink)
      }else{
        setInputValue(data.viewUrl[0].url)
        setViewUrl(data.viewUrl)
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(async () => {
    await refetchViewUrl();
  }, [initialData, isSingleType, axiosInstance ]);

  return { refetchViewUrl };
}

/**
 * 
 * Getting settings to render on the View Url editor UI
 * 
 * 
 */
const getSettings = async () => {
  const {data} = await axiosInstance.get('/view-page/settings')
  return data
}

/**
 *
 * 
 * MAIN COMPONENT
 * 
 * 
 */

const ViewInput = () => {
  const { allLayoutData, slug, initialData, }  =useCMEditViewDataManager()
  
  const [inputValue, setInputValue] = useState( '' )
  const [viewUrl, setViewUrl] = useState(null)
  const [hasAutomaticSlug, setHasAutomaticSlug] = useState(false)
  
  const { refetchViewUrl } = useRelatedViewUrl(setViewUrl, setInputValue, setHasAutomaticSlug)
  
  const [expanded, setExpanded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)

  /**
   * 
   * Handle the form edit button
   * To enabled or disabled the input text
   *  
   */

  const handleEdit = () => {
    if(isDisabled){
      return setIsDisabled(false)
    }
    return setIsDisabled(true)
  }

  /**
   * 
   * Handle the injected form
   * Two options to trigger: Add a new view-url 'post' or update with the current id. 
   *  
   */

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent submitting parent form
    e.stopPropagation();
    try {
      await refetchViewUrl()
      if(viewUrl === null || hasAutomaticSlug ){
        
        await axiosInstance.post(
          "/content-manager/collection-types/plugin::view-page.view-url",
          {
            url: inputValue,
            related: {
              __type: slug,
              id: initialData.id,
            },
          }
        );

        setHasAutomaticSlug(false)
      }else{
        await axiosInstance.put(
          `/content-manager/collection-types/plugin::view-page.view-url/${viewUrl[0].id}`,
          {
            url: inputValue,
            related: {
              __type: slug,
              id: initialData.id,
            },
          }
        );
      }
      await refetchViewUrl(); // Refetch tasks list so it includes the created one
      setIsDisabled(true)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <Accordion expanded={expanded} onToggle={() => setExpanded(s => !s)} id="acc-2" variant="secondary">
        <AccordionToggle title={`View ${allLayoutData.contentType.info.singularName}`} action={<IconButton onClick={handleEdit} label="Edit" icon={<Pencil/>} />} />
        <AccordionContent>
          <Box padding={3}>
            <TextInput 
              placeholder="Edit content url" 
              aria-label="View Url"  
              name="content" 
              onChange={e => setInputValue(e.target.value)} 
              value={inputValue} 
              disabled={isDisabled} 
            />
            {(viewUrl) && (
              <Box paddingTop={5}>
                <Link href={inputValue} isExternal>{`View ${allLayoutData.contentType.info.singularName}`}</Link>
              </Box>
            )}
          
          </Box>
          {(!isDisabled) && (
            <Box padding={3}>
              <Button 
                variant='success' 
                size="S"
                onClick = {handleSubmit}
              >Save</Button>
            </Box>
          )}
        </AccordionContent>
      </Accordion>
    </div>
  )
}

export default ViewInput