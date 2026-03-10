import React, { useState } from 'react'
import './EntityRow.css'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations';
import { NavLink } from 'react-router';
import configuration from '../../../configuration.json';
import { useTypes } from '../../../context/TypesContext';
import type { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema';
import FieldsList from './FieldsList/FieldsList';

interface EntitytRowProps {
  Entity : EntityWithRelations;
  setEntities: React.Dispatch<React.SetStateAction<EntityWithRelations[]>>;
}

const EntityRow : React.FC<EntitytRowProps> = (props : EntitytRowProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { types, baseTypes } = useTypes();

  const baseTypeSchema : EntityTypeSchema | undefined = baseTypes.find((type) => type.label === props.Entity.baseType.typeSchemaLabel);
  const subTypesSchema: EntityTypeSchema[] = types.filter((type) => 
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
      
      <FieldsList Entity={props.Entity} setEntities={props.setEntities}/>

    </div>
  )
}

export default EntityRow;