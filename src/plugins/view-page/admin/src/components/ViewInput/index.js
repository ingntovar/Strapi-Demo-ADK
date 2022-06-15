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

function useRelatedViewUrl(setViewUrl, setStatus, setInputValue, setScreenData) {
  const { initialData, isSingleType, slug } = useCMEditViewDataManager();

  const refetchViewUrl = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/content-manager/${
          isSingleType ? "single-types" : "collection-types"
        }/${slug}/${isSingleType ? "" : initialData.id}?populate=viewUrl`
      );

      console.log('que es esto? ',data)

      setStatus("success");
      setInputValue(data.viewUrl[0].url)
      setViewUrl(data.viewUrl)
      setScreenData(data)
    } catch (e) {
      setStatus("error");
    }
  };

  useEffect(async () => {
    await refetchViewUrl();
  }, [initialData, isSingleType, axiosInstance, setStatus]);

  return { refetchViewUrl };
}








const ViewInput = () => {
  const { allLayoutData, slug, initialData }  =useCMEditViewDataManager()
  
  const [status, setStatus] = useState("loading")
  const [inputValue, setInputValue] = useState( '' )
  const [viewUrl, setViewUrl] = useState(null)
  const [screenData, setScreenData] = useState({})
  
  const { refetchViewUrl } = useRelatedViewUrl(setViewUrl, setStatus, setInputValue, setScreenData)
  
  const [expanded, setExpanded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)


 


  const handleEdit = () => {
    if(isDisabled){
      return setIsDisabled(false)
    }

    return setIsDisabled(true)
  }

  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    console.log('submitted')

    try {
      // Show loading state
      setStatus("loading");

      await refetchViewUrl()
      if(viewUrl === null){

        const urlToSave = await axiosInstance.post(
          "/content-manager/collection-types/plugin::view-page.view-url",
          {
            url: inputValue,
            related: {
              __type: slug,
              id: initialData.id,
            },
          }
        );
        console.log(urlToSave)
      }else{
        const urlToSave = await axiosInstance.put(
          `/content-manager/collection-types/plugin::view-page.view-url/${viewUrl[0].id}`,
          {
            url: inputValue,
            related: {
              __type: slug,
              id: initialData.id,
            },
          }
        );
        console.log(urlToSave)
      }

      console.log('input',inputValue)


      // Refetch tasks list so it includes the created one
      await refetchViewUrl();

      // Remove loading and close popup
      setStatus("success");
      setIsDisabled(true)
    } catch (e) {
      console.log(e)
      setStatus("error");
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