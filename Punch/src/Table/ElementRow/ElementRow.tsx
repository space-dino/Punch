import React, { useState } from 'react'
import './ElementRow.css'
import TextBox from '../../TextBox/TextBox'
import { EntityWithRelations } from '../../DTOs/entity/EntityWithRelations';
import { NavLink } from 'react-router';
import configuration from '../../configuration.json';
import { useTypes } from '../../context/TypesContext';

interface ElementRowProps {
  Entity : EntityWithRelations;
  setEntities: React.Dispatch<React.SetStateAction<EntityWithRelations[]>>;
}

const ElementRow : React.FC<ElementRowProps> = (props : ElementRowProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { types } = useTypes();

  const handlePropertyChange = (key: string, newValue: string) => {
    props.setEntities(prev => prev.map(e =>
      e.strongId === props.Entity.strongId
        // ? new Entity(e.name, e.strongId, e.type, { ...e.properties, [key]: newValue })
        ? new EntityWithRelations(e.strongId, e.baseType, { ...e.subTypes, [key]: newValue }, e.relations)
        : e
    ));
  }

  const typeSchema = types.find((type) => type.label === props.Entity.baseType.typeSchemaLabel);

  return (
    <div className='element-row' id={isChecked ? 'checked' : 'unchecked'}>
      <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
      <p>{typeSchema !== undefined ? typeSchema.icon : "TypeNotFound"}</p>
      <NavLink to={`${configuration.urls.entitiesUrl}/${props.Entity.strongId}`}>{props.Entity.strongId}</NavLink>

      <div className='fields'>
        {Object.entries(props.Entity.baseType.fieldValues).map(([key, value]) => (
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