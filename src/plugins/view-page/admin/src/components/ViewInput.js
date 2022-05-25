import React, { useState, useEffect } from "react";

import { Accordion, AccordionToggle, AccordionContent, AccordionGroup } from '@strapi/design-system/Accordion';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';
import { Box } from '@strapi/design-system/Box';
import Pencil from '@strapi/icons/Pencil';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';


import {useCMEditViewDataManager} from '@strapi/helper-plugin'
import axiosInstance from "../utils/axiosInstance";
import { handleSubmit } from "./helpers";


function useRelatedViewUrl(status, setStatus, setInputValue) {
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
  const { refetchViewUrl } = useRelatedViewUrl(status, setStatus, setInputValue)
  
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

      // Create task and link it to the related entry
      const urlToSave = await axiosInstance.post(
        "/content-manager/collection-types/plugin::view-page.view-url/3",
        {
          url: inputValue,
          related: {
            __type: slug,
            id: initialData.id,
          },
        }
      );

      console.log(urlToSave)

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
              hint="View url" 
              onChange={e => setInputValue(e.target.value)} 
              value={inputValue} 
              disabled={isDisabled} 
            />
          </Box>
          <Box padding={3}>
            <Button 
              variant='success' 
              size="S"
              onClick = {handleSubmit}
            >Save</Button>
          </Box>
        </AccordionContent>
      </Accordion>
    </div>
  )
}

export default ViewInput