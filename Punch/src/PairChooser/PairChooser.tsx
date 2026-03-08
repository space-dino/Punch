import React from 'react'
import TextBox from '../TextBox/TextBox'
import './PairChooser.css'
import configuration from '../configuration.json'
import { type DataType, Field } from '../DTOs/entity/entityType/field/Field';

interface PairChooserProps {
    label: string;
    field: Field;
    disabled?: boolean;
    onChange?: (newField: Field) => void;
    onEnter?: (newField: Field) => void;
}

const PairChooser: React.FC<PairChooserProps> = (props) => {
  const { field } = props

  const commit = () => props.onEnter?.(field);

  return (
    <div className="pair-chooser">
      <TextBox
        disabled={props.disabled}
        label={props.label}
        value={field.name}
        onChange={(newValue) => props.onChange?.(new Field(newValue, field.type))}
        onKeyDown={(e) => { if (e.key === 'Enter') commit() }}
      />
      <select
        disabled={props.disabled}
        value={field.type}
        onChange={(e) => props.onChange?.(new Field(field.name, e.target.value as DataType))}
        onKeyDown={(e) => { if (e.key === 'Enter') commit() }}
        onBlur={commit}
      >
        {configuration.dataTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}

export default PairChooser