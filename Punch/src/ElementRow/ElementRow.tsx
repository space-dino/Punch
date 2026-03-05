import React, { useState } from 'react'
import './../App.css'
import './ElementRow.css'
import TextBox from '../TextBox/TextBox'
import { Entity } from '../Objects/Entity';

interface ElementRowProps {
  Entity : Entity;
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>
}

const ElementRow : React.FC<ElementRowProps> = (props : ElementRowProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePropertyChange = (key: string, newValue: string) => {
    props.setEntities(prev => prev.map(e =>
      e._id === props.Entity._id
        ? new Entity(e.name, e._id, { ...e.properties, [key]: newValue })
        : e
    ))
  }

  return (
    <div className='element-row' id={isChecked ? 'checked' : 'unchecked'}>
      <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
      {Object.entries(props.Entity.properties).map(([key, value]) => (
        <TextBox
          key={key}
          label={key}
          value={value}
          onChange={(newValue) => handlePropertyChange(key, newValue)}
        />
      ))}
    </div>
  )
}

export default ElementRow;