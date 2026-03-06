import React, { useState } from 'react'
import './ElementRow.css'
import TextBox from '../../TextBox/TextBox'
import { Entity } from '../../Objects/Entity';
import { NavLink } from 'react-router';

interface ElementRowProps {
  Entity : Entity;
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>
}

const ElementRow : React.FC<ElementRowProps> = (props : ElementRowProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePropertyChange = (key: string, newValue: string) => {
    props.setEntities(prev => prev.map(e =>
      e._id === props.Entity._id
        ? new Entity(e.name, e._id, e.type, { ...e.properties, [key]: newValue })
        : e
    ))
  }

  return (
    <div className='element-row' id={isChecked ? 'checked' : 'unchecked'}>
      <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
      <NavLink to={`/entity-editor/${props.Entity._id}`}>{props.Entity.name}</NavLink>

      <div className='fields'>
        {Object.entries(props.Entity.properties).map(([key, value]) => (
          <TextBox
            key={key}
            label={key}
            value={value}
            onChange={(newValue) => handlePropertyChange(key, newValue)}
          />
        ))}
      </div>
    </div>
  )
}

export default ElementRow;