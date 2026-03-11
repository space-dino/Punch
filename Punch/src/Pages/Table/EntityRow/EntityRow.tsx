import React, { useState } from 'react'
import './EntityRow.css'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations';
import { NavLink } from 'react-router';
import configuration from '../../../configuration.json';
import { useTypes } from '../../../context/TypesContext';
import type { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema';
import FieldsList from './FieldsList/FieldsList';
import { EntityTypeInstance } from '../../../DTOs/entity/entityType/EntityTypeInstance';
import { useEntities } from '../../../context/EntitiesContext';

interface EntitytRowProps {
  Entity : EntityWithRelations;
}

const EntityRow : React.FC<EntitytRowProps> = (props : EntitytRowProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { types, baseTypes } = useTypes();
  const { setEntities } = useEntities();

  const baseTypeSchema : EntityTypeSchema | undefined = baseTypes.find((type) => type.label === props.Entity.baseType.typeSchemaLabel);
  const subTypesSchemas: EntityTypeSchema[] = types.filter((type) => 
    props.Entity.subTypes.some((subType) => subType.typeSchemaLabel === type.label)
  );

  const handlePropertyChange = (key: string, newValue: string) => {
    setEntities(prev => prev.map(e =>
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

  return (
    <div className={`entity-row ${isChecked ? 'selected' : ''}`}>
      <div className='entity-row__header'>
        <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>

        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'v' : '^'}</button>
        <p>{baseTypeSchema !== undefined ? baseTypeSchema.icon : "TypeNotFound"}</p>

        {subTypesSchemas.map((subtype) => {
          return <p>{subtype.icon}</p>
        })}

        <NavLink to={`${configuration.urls.entitiesUrl}/${props.Entity.entityId}`}>{props.Entity.subTypes.length > 0 ? '<🔗>' : '<⭕>'}</NavLink>
      </div>
        
      <div className='entity-row__fields'>
        <FieldsList EntityType={props.Entity.baseType}/>
      
        <div className={`entity-row__content${!isOpen ? '--disabled' : ''}`}>
          {props.Entity.subTypes.map((subtype) => {
            return <FieldsList EntityType={subtype}/>
          })}
        </div>

      </div>
    </div>
  )
}

export default EntityRow;