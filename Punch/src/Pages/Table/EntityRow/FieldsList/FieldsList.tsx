import React, { useState } from 'react'
import TextBox from '../../../../Components/TextBox/TextBox'
import { EntityTypeInstance } from '../../../../DTOs/entity/entityType/EntityTypeInstance';
import './FieldsList.css'
import type { EntityTypeSchema } from '../../../../DTOs/entity/entityType/EntityTypeSchema';
import configuration from '../../../../configuration.json'

interface FieldsListProps {
  EntityType: EntityTypeInstance;
  EntityTypeSchema?: EntityTypeSchema;
  onChange?: (key: string, newValue: string) => void;
  onDelete?: (typeLabel: string) => void;
}

const FieldsList: React.FC<FieldsListProps> = ({ EntityType, EntityTypeSchema, onChange, onDelete }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const focusRef = (el: HTMLInputElement | null, key: string) => {
    if (el && focusedField === key) {
      el.focus()
      // move cursor to end
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }

  return (
    <div className='fields-list'>
      {onDelete !== undefined && <button className='delete-button' onClick={() => onDelete(EntityTypeSchema?.label ?? '')}>X</button>}
      
      <p>{EntityTypeSchema?.icon}</p>
      <div className='fields'>
        {Object.entries(EntityType.fieldValues)
          .filter(([key, value]) => !configuration.tableFilter.includes(key) && value !== '')
          .map(([key, value]) => (
            <TextBox
              key={key}
              label={key}
              value={value}
              inputRef={(el) => focusRef(el, key)}
              onFocus={() => setFocusedField(key)}
              onBlur={() => setFocusedField(null)}
              onChange={(newValue) => onChange?.(key, newValue)}
            />
          ))
        }

        <div className='unadded-fields'>
          {EntityTypeSchema?.typeFields
            .filter((field) => !configuration.tableFilter.includes(field.name))
            .filter((field) => !Object.entries(EntityType.fieldValues).find(([key, value]) => field.name === key && value !== ''))
            .map((field) => (
              <TextBox
                key={field.name}
                label={field.name}
                value={''}
                inputRef={(el) => focusRef(el, field.name)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                onChange={(newValue) => onChange?.(field.name, newValue)}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default FieldsList