import React from 'react'
import TextBox from '../../../../Components/TextBox/TextBox'
import { EntityWithRelations } from '../../../../DTOs/entity/EntityWithRelations';
import { EntityTypeInstance } from '../../../../DTOs/entity/entityType/EntityTypeInstance';
import './FieldsList.css'

interface FieldsListProps {
  EntityType : EntityTypeInstance;
//   onChange : (newValue : string) => void;
}

const FieldsList : React.FC<FieldsListProps> = (props : FieldsListProps) => {
  return (
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
  )
}

export default FieldsList