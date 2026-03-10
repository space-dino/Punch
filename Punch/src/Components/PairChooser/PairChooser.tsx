import React from 'react'
import TextBox from '../TextBox/TextBox'
import './PairChooser.css'
import configuration from '../../configuration.json'
import { type DataType, Field } from '../../DTOs/entity/entityType/field/Field';

interface PairChooserProps {
  label: string;
  field: Field;
  disabled?: boolean;
  onChange?: (newField: Field) => void;
  onEnter?: (newField: Field) => void;
  className? : string;
  onRemove?: () => void;
}

const PairChooser: React.FC<PairChooserProps> = (props) => {
  const commit = () => props.onEnter?.(props.field);

  return (
    <div className="pair-chooser">
      {props.onEnter === undefined && !props.disabled &&
      <button className='delete-field-button' onClick={props.onRemove}>X</button>}

      <TextBox
        disabled={props.disabled}
        label={props.label}
        value={props.field.name}
        onChange={(newValue) => props.onChange?.(new Field(newValue, props.field.type))}
        onKeyDown={(e) => { if (e.key === 'Enter') commit() }}
      />
      <select
        disabled={props.disabled}
        value={props.field.type}
        onChange={(e) => props.onChange?.(new Field(props.field.name, e.target.value as DataType))}
        onKeyDown={(e) => { if (e.key === 'Enter') commit() }}
        onBlur={commit}
        className={props.className}
      >
        {configuration.dataTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}

export default PairChooser