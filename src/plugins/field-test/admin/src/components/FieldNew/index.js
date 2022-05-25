import { TextInput } from '@strapi/design-system/TextInput';
import React, {useState} from 'react';
import { Button } from '@strapi/design-system/Button';

const Field = ({name, value, onChange}) => {
  

  const [currentValue , setCurrentValue] = useState(
    (!value) ? '' : JSON.parse(value).currentValue 
  )


  const handleChange = (e) => {

    setCurrentValue(e.target.value)

    const value = JSON.stringify({ currentValue  }) 
    onChange({ target: { name, value, type: 'json' }})
    
  }

  return (
    <>
    <TextInput
      label = {name}
      id={name}
      name={name}
      onChange = {handleChange}
      value={currentValue || ''}
    />
    
    <Button style={{marginTop: '20px'}}
      onClick={() => alert('hello')}
    >Hello World</Button>
    </>
  );
}

export default Field;