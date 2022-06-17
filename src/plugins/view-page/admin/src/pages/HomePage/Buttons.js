import React , { useEffect, useState  } from 'react'

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Flex } from '@strapi/design-system/Flex';
import { Status } from '@strapi/design-system/Status';
import { Typography } from '@strapi/design-system/Typography';

import axiosInstance from '../../utils/axiosInstance'



const Buttons = ({domain, CTParentSlugs, setSavedSettings }) => {

   const [status, setStatus] = useState('awaiting')
   const [resultMessage, setResultMessage] = useState('')

  const handleSave = async () => {
    const newSettings = await setSettings()
    if(newSettings) setStatus('success')

  }

  const handleCancel = () => {
    setSavedSettings()
  }

  const setSettings = async () => {
    try {
      const {data} = await axiosInstance.post(`/view-page/settings`, {
        domain,
        parentSlugs: CTParentSlugs
      })
      
      return data
    } catch (err) {
      console.log(err)
      setStatus('error')
    }
  }

  useEffect(() => {
    switch (status) {
      case 'success':
        setResultMessage('Your modifications have been saved successfully')
        break;
      case 'error':
        setResultMessage('An error has been occured, please try later')
        break;
    
      default:
        break;
    }

    if(status !== 'awaiting'){
      setTimeout(() => {
        setStatus('awaiting')
      }, 3000);
    }
    
  }, [status])
  


  return (
      <Box paddingRight={10} paddingLeft={10} paddingBottom={10} background="neutral0">
        <Flex direction='row-reverse' >
          
          <Box paddingLeft={5}>
            <Button onClick={handleCancel} variant='danger' size="L" >Cancel</Button>
          </Box>

          <Box>
            <Button onClick={handleSave} variant='success' size="L" >Save</Button>
          </Box>

        </Flex>
        
        {status !== 'awaiting' &&
          <Status variant="success">
            <Typography>
              {resultMessage}
            </Typography>
          </Status>
        }

      </Box>
  )
}

export default Buttons