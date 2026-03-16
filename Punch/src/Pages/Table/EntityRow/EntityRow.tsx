import React, { useState } from 'react'
import './EntityRow.css'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations'
import { useTypes } from '../../../context/TypesContext'
import FieldsList from './FieldsList/FieldsList'
import EntityRowHeader from './EntityRowHeader/EntityRowHeader'
import AddSubtypeBar from './AddSubtypeBar/AddSubtypeBar'
import { useEntityRow } from './useEntityRow'
import { useEnvironments } from '../../../context/EnvironmentsContext'

interface EntityRowProps {
  Entity: EntityWithRelations;
  onDraftChange?: (updated: EntityWithRelations) => void;
  onSelectChange?: (selected: boolean, id: string) => void;
  isRelated?: boolean;
}

const EntityRow: React.FC<EntityRowProps> = ({ Entity, onDraftChange, onSelectChange, isRelated }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { types } = useTypes();
  const { selectedEnvironment } = useEnvironments()

  const {
    baseTypeSchema,
    subTypesSchemas,
    handlePropertyChange,
    schedulePropertyChangeSend,
    handleSubTypePropertyChange,
    addSubtype,
    deleteSubtype
  } = useEntityRow(Entity, onDraftChange);

  return (
    <div className={`entity-row ${isChecked ? 'selected' : ''}`}>
      <EntityRowHeader
        Entity={Entity}
        isChecked={isChecked}
        isOpen={isOpen}
        isDraft={!!onDraftChange}
        subTypesSchemas={subTypesSchemas}
        onToggleCheck={() => {setIsChecked(!isChecked) ; onSelectChange?.(!isChecked, Entity.entityId)}}
        onToggleOpen={() => setIsOpen(!isOpen)}
        isTenantRelated={subTypesSchemas.some(subtype => types.includes(subtype)) ||
          (Entity.relations && Entity.relations.some(relation => relation.tenantId === selectedEnvironment)) ||
          (isRelated ?? true)
        }
      />

      <div className='entity-row__fields'>
        <FieldsList
          EntityType={Entity.baseType}
          EntityTypeSchema={baseTypeSchema}
          onChange={(key, newValue) => { handlePropertyChange(key, newValue); if(onDraftChange === undefined) { schedulePropertyChangeSend(key, newValue, Entity.baseType.typeSchemaLabel)} }}
        />

        <div className={`entity-row__content${!isOpen ? '--disabled' : ''}`}>
          {Entity.subTypes.map((subtype) => (
            <FieldsList
              key={subtype.typeSchemaLabel}
              EntityType={subtype}
              EntityTypeSchema={subTypesSchemas.find((s) => s.label === subtype.typeSchemaLabel)}
              onChange={(key, newValue) => handleSubTypePropertyChange(subtype.typeSchemaLabel, key, newValue)}
              onDelete={deleteSubtype}
            />
          ))}

          <AddSubtypeBar
            onAdd={(selection) => addSubtype(selection || types[0]?.label, setIsOpen)}
            Entity={Entity}
          />
        </div>
      </div>
    </div>
  )
}

export default EntityRow