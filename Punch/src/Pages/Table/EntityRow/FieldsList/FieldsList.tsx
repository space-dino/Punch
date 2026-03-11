import React from 'react'
import TextBox from '../../../../Components/TextBox/TextBox'
import { EntityTypeInstance } from '../../../../DTOs/entity/entityType/EntityTypeInstance';
import './FieldsList.css'
import type { EntityTypeSchema } from '../../../../DTOs/entity/entityType/EntityTypeSchema';
import configuration from '../../../../configuration.json'

interface FieldsListProps {
  EntityType: EntityTypeInstance
  EntityTypeSchema?: EntityTypeSchema
  onChange?: (key: string, newValue: string) => void
}

const FieldsList: React.FC<FieldsListProps> = ({ EntityType, EntityTypeSchema, onChange }) => {
  return (
    <div className='fields-list'>
      <p>{EntityTypeSchema?.icon}</p>
      <div className='fields'>
        {Object.entries(EntityType.fieldValues)
          .filter(([key]) => !configuration.tableFilter.includes(key))
          .map(([key, value]) => (
            <TextBox
              key={key}
              label={key}
              value={value}
              onChange={(newValue) => onChange?.(key, newValue)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default FieldsList