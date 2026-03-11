import React from 'react'
import TextBox from '../../../../Components/TextBox/TextBox'
import { EntityTypeInstance } from '../../../../DTOs/entity/entityType/EntityTypeInstance';
import './FieldsList.css'
import type { EntityTypeSchema } from '../../../../DTOs/entity/entityType/EntityTypeSchema';
import configuration from '../../../../configuration.json'

interface FieldsListProps {
  EntityType : EntityTypeInstance;
  EntityTypeSchema? : EntityTypeSchema;
//   onChange : (newValue : string) => void;
}

const FieldsList : React.FC<FieldsListProps> = (props : FieldsListProps) => {
  return (
    <div className='fields-list'>
      <p>{props.EntityTypeSchema?.icon}</p>
      <div className='fields'>
        {Object.entries(props.EntityType.fieldValues)
          .filter(([key]) => !configuration.tableFilter.includes(key))
          .map(([key, value]) => (
            <TextBox
              key={key}
              label={key}
              value={value}
            />
          ))
        }
      </div>
    </div>
  )
}

export default FieldsList