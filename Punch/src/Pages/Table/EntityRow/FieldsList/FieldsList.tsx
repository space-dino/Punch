import React from 'react'
import TextBox from '../../../../Components/TextBox/TextBox'
import { EntityTypeInstance } from '../../../../DTOs/entity/entityType/EntityTypeInstance';
import './FieldsList.css'
import type { EntityTypeSchema } from '../../../../DTOs/entity/entityType/EntityTypeSchema';

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
          {Object.entries(props.EntityType.fieldValues).map(([key, value]) => (
              <TextBox
              key={key}
              label={key}
              value={value}
              // onChange={(newValue) => props.onChange(newValue)}
              />
          ))}
      </div>
    </div>
  )
}

export default FieldsList