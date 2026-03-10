import React, { useState } from 'react'
import './ElementRow.css'
import TextBox from '../../../Components/TextBox/TextBox'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations';
import { NavLink } from 'react-router';
import configuration from '../../../configuration.json';
import { useTypes } from '../../../context/TypesContext';
import { EntityTypeInstance } from '../../../DTOs/entity/entityType/EntityTypeInstance';
import type { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema';

interface ElementRowProps {
  Entity : EntityWithRelations;
  setEntities: React.Dispatch<React.SetStateAction<EntityWithRelations[]>>;
}

const ElementRow : React.FC<ElementRowProps> = (props : ElementRowProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { types, baseTypes } = useTypes();

  const handlePropertyChange = (key: string, newValue: string) => {
    props.setEntities(prev => prev.map(e =>
      e.entityId === props.Entity.entityId
        ? new EntityWithRelations(
          e.entityId,
          new EntityTypeInstance(
            e.baseType.typeSchemaLabel,
            { ...e.baseType.fieldValues, [key]: newValue }
          ),
          e.subTypes,
          e.relations
        )
        : e
    ));
  }

  const baseTypeSchema : EntityTypeSchema | undefined = baseTypes.find((type) => type.label === props.Entity.baseType.typeSchemaLabel);
  const subTypesSchema: EntityTypeSchema[] = baseTypes.filter((type) => 
    props.Entity.subTypes.some((subType) => subType.typeSchemaLabel === type.label)
  );

  return (
    <div className='element-row' id={isChecked ? 'checked' : 'unchecked'}>
      <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
      <p>{baseTypeSchema !== undefined ? baseTypeSchema.icon : "TypeNotFound"}</p>

      {subTypesSchema.map((subtype) => {
        return <p>{subtype.icon}</p>
      })}

      <NavLink to={`${configuration.urls.entitiesUrl}/${props.Entity.entityId}`}>{props.Entity.subTypes.length > 0 ? '<🔗>' : '<⭕>'}</NavLink>

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