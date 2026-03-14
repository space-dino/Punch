import React, { useState } from 'react'
import './EntityRow.css'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations'
import { useTypes } from '../../../context/TypesContext'
import FieldsList from './FieldsList/FieldsList'
import EntityRowHeader from './EntityRowHeader/EntityRowHeader'
import AddSubtypeBar from './AddSubtypeBar/AddSubtypeBar'
import { useEntityRow } from './useEntityRow'

interface EntityRowProps {
  Entity: EntityWithRelations;
  onDraftChange?: (updated: EntityWithRelations) => void;
}

const EntityRow: React.FC<EntityRowProps> = ({ Entity, onDraftChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { types } = useTypes();

  const {
    baseTypeSchema,
    subTypesSchemas,
    handlePropertyChange,
    schedulePropertyChangeSend,
    handleSubTypePropertyChange,
    addSubtype,
  } = useEntityRow(Entity, onDraftChange);

  return (
    <div className={`entity-row ${isChecked ? 'selected' : ''}`}>
      <EntityRowHeader
        Entity={Entity}
        isChecked={isChecked}
        isOpen={isOpen}
        isDraft={!!onDraftChange}
        subTypesSchemas={subTypesSchemas}
        onToggleCheck={() => setIsChecked(!isChecked)}
        onToggleOpen={() => setIsOpen(!isOpen)}
      />

      <div className='entity-row__fields'>
        <FieldsList
          EntityType={Entity.baseType}
          EntityTypeSchema={baseTypeSchema}
          onChange={(key, newValue) => { handlePropertyChange(key, newValue); schedulePropertyChangeSend(key, newValue) }}
        />

        <div className={`entity-row__content${!isOpen ? '--disabled' : ''}`}>
          {Entity.subTypes.map((subtype) => (
            <FieldsList
              key={subtype.typeSchemaLabel}
              EntityType={subtype}
              EntityTypeSchema={subTypesSchemas.find((s) => s.label === subtype.typeSchemaLabel)}
              onChange={(key, newValue) => handleSubTypePropertyChange(subtype.typeSchemaLabel, key, newValue)}
            />
          ))}

          <AddSubtypeBar
            onAdd={(selection) => addSubtype(selection || types[0]?.label, setIsOpen)}
          />
        </div>
      </div>
    </div>
  )
}

export default EntityRow