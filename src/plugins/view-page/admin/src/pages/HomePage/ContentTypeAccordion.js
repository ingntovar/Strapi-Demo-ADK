import React, {useState, useEffect} from 'react'

import { Accordion, AccordionToggle, AccordionContent, AccordionGroup } from '@strapi/design-system/Accordion';
import { IconButton } from '@strapi/design-system/IconButton';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { TextInput } from '@strapi/design-system/TextInput';

import Pencil from '@strapi/icons/Pencil';
import User from '@strapi/icons/User';


const ContentTypeAccordion = ({contentTypes, CTParentSlugs, setCTParentSlugs}) => {

  
  if(contentTypes == null || contentTypes == undefined || contentTypes.length < 1) return
  
  const [expandedObject, setExpanded] = useState({})


  useEffect(() => {
    
    let expanded = {}
    let parentSlugs = {}
    contentTypes.forEach(contentType => {
      expanded[contentType] = true
      parentSlugs[contentType] = '' //To avoid uncontrollable management of this state on the jsx component; the object key is not defined at first
    });
    
    setCTParentSlugs(parentSlugs)
    setExpanded(expanded)

  }, [])
  
  
  
  const handleAccordionToggle = contentType => {
    setExpanded({
      ...expandedObject,
      [contentType] : !expandedObject[contentType]
    })
  }

  const handleParentSlugs = e => {
    let currentId = e.target.id
    let currentValue = e.target.value

    setCTParentSlugs({
      ...CTParentSlugs,
      [currentId] : currentValue
    })  
  }

  return (
    <div>
        <Box padding={8} background="neutral0">
          <AccordionGroup  label="Parent Slugs">
            
            { contentTypes.map( contentType => (

              <Accordion  key={contentType} expanded={expandedObject[contentType]} onToggle={ () => handleAccordionToggle(contentType) } size="S">
                <AccordionToggle startIcon={<User aria-hidden={true} />} action={<Stack horizontal spacing={0}>
                      <IconButton noBorder onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />
                    </Stack>} title={contentType.replace(/^\w/, (c) => c.toUpperCase())} togglePosition="left" />
                <AccordionContent>
                  <Box padding={3}>
                    <TextInput id={contentType} placeholder={contentType} label="Slug" name="slug"  onChange={handleParentSlugs} value={CTParentSlugs[contentType]}  />
                  </Box>
                </AccordionContent>
              </Accordion>
            
            )) }
            
          </AccordionGroup>
        </Box>
      </div>
  )
}

export default ContentTypeAccordion



