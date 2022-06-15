import React, {useState, useEffect} from 'react'

import { Accordion, AccordionToggle, AccordionContent, AccordionGroup } from '@strapi/design-system/Accordion';
import { IconButton } from '@strapi/design-system/IconButton';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';

import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import User from '@strapi/icons/User';

const ContentTypeAccordion = ({contentTypes}) => {

  
  if(contentTypes == null || contentTypes == undefined || contentTypes.length < 1) return
  
  const [expandedObject, setExpanded] = useState(true);

  useEffect(() => {
    
    let expanded = {}
    contentTypes.map(contentType => {(
      expanded[contentType] = true
    )});
    setExpanded(expanded)
  }, [ ])
  
  const handleAccordionToggle = contentType => {
    setExpanded({
      ...expandedObject,
      [contentType] : !expandedObject[contentType]
    })
  }

  
  return (
    <div>
        <Box padding={8} background="neutral0">
          <AccordionGroup  label="Label" >
            
            { contentTypes.map( contentType => (

              <Accordion  key={contentType} expanded={expandedObject[contentType]} onToggle={ () => handleAccordionToggle(contentType) } size="S">
                <AccordionToggle startIcon={<User aria-hidden={true} />} action={<Stack horizontal spacing={0}>
                      <IconButton noBorder onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />
                      <IconButton noBorder onClick={() => console.log('delete')} label="Delete" icon={<Trash />} />
                    </Stack>} title={contentType.replace(/^\w/, (c) => c.toUpperCase())} togglePosition="left" />
                <AccordionContent>
                  <Box padding={3}>
                    <Typography>{contentType}</Typography>
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



