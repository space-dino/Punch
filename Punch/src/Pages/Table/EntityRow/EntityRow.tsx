import React, { useState, useRef } from 'react'
import './EntityRow.css'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations';
import { NavLink } from 'react-router';
import configuration from '../../../configuration.json';
import { useTypes } from '../../../context/TypesContext';
import type { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema';
import FieldsList from './FieldsList/FieldsList';
import { EntityTypeInstance } from '../../../DTOs/entity/entityType/EntityTypeInstance';
import { useEntities } from '../../../context/EntitiesContext';
import { postJSON } from '../../../api';
import { UpdatedEntity } from '../../../DTOs/entity/UpdatedEntity';

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

  const sendPropertyChange = (key: string, newValue: string) => {
    const baseEntity = new UpdatedEntity({key, newValue});
    baseEntity !== undefined ? postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + "/" + props.Entity.entityId, baseEntity, 'PUT')
      .then(({ status, body }) => {
        alert('status:' + status);
        console.log('body:', body);
      })
      .catch(console.error) : {}
  }

  const debounceTimer = useRef<Record<string, number>>({});
  const latestPendingValues = useRef<Record<string, string>>({});

  const schedulePropertyChangeSend = (key: string, newValue: string, delay = 500) => {
    latestPendingValues.current[key] = newValue;

    if (debounceTimer.current[key]) {
      window.clearTimeout(debounceTimer.current[key]);
    }

    debounceTimer.current[key] = window.setTimeout(() => {
      const pendingValue = latestPendingValues.current[key];
      delete debounceTimer.current[key];
      delete latestPendingValues.current[key];
      sendPropertyChange(key, pendingValue);
    }, delay);
  }

  const handleSubTypePropertyChange = (typeSchemaLabel: string, key: string, newValue: string) => {
    setEntities(prev => prev.map(e =>
      e.entityId === props.Entity.entityId
        ? new EntityWithRelations(
            e.entityId,
            e.baseType,
            e.subTypes.map(sub =>
              sub.typeSchemaLabel === typeSchemaLabel
                ? new EntityTypeInstance(sub.typeSchemaLabel, { ...sub.fieldValues, [key]: newValue })
                : sub
            ),
            e.relations
          )
        : e
    ))
  }

  return (
    <div className={`entity-row ${isChecked ? 'selected' : ''}`}>
      <div className='entity-row__header'>
        <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>

        <div className={`subtype-icons-row ${isOpen ? ' open' : ''}`}>
          {subTypesSchemas.length > 0 && <button className={`open-button${isOpen ? ' open' : ''}`} onClick={() => setIsOpen(!isOpen)}>^</button>}
          {subTypesSchemas.map((subtype) => {
            return <p>{subtype.icon}</p>
          })}
        </div>

        <NavLink to={`${configuration.urls.entitiesUrl}/${props.Entity.entityId}`}>{ props.Entity.relations.length > 0 ? '<🔗>' : '<⭕>'}</NavLink>
      </div>
        
      <div className='entity-row__fields'>
        <FieldsList
          EntityType={props.Entity.baseType}
          EntityTypeSchema={baseTypeSchema}
          onChange={(key, newValue) => { handlePropertyChange(key, newValue); schedulePropertyChangeSend(key, newValue); }}
        />

        <div className={`entity-row__content${!isOpen ? '--disabled' : ''}`}>
          {props.Entity.subTypes.map((subtype) => (
            <FieldsList
              key={subtype.typeSchemaLabel}
              EntityType={subtype}
              EntityTypeSchema={subTypesSchemas.find((schema) => schema.label === subtype.typeSchemaLabel)}
              onChange={(key, newValue) => handleSubTypePropertyChange(subtype.typeSchemaLabel, key, newValue)}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default EntityRow;