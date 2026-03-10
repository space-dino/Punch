import React from 'react'
import TextBox from '../../../../Components/TextBox/TextBox'
import { EntityWithRelations } from '../../../../DTOs/entity/EntityWithRelations';
import { EntityTypeInstance } from '../../../../DTOs/entity/entityType/EntityTypeInstance';
import './FieldsList.css'

interface FieldsListProps {
  Entity : EntityWithRelations;
  setEntities: React.Dispatch<React.SetStateAction<EntityWithRelations[]>>;
}

const FieldsList : React.FC<FieldsListProps> = (props : FieldsListProps) => {
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

  return (
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
  )
}

export default FieldsList