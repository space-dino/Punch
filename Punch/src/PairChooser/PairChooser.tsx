import React from 'react'
import TextBox from '../TextBox/TextBox'
import './PairChooser.css'
import configuration from '../configuration.json'
import { type DataType, Field } from '../DTOs/entity/entityType/field/Field';

interface PairChooserProps {
    label : string;
    field : Field;
    disabled? : boolean;
    onChange?: (newField: Field) => void;
}

const PairChooser : React.FC<PairChooserProps> = (props : PairChooserProps) => {
  return (
    <div className="pair-chooser">
        <TextBox disabled={props.disabled}
          label={props.label}
          value={props.field.name}
          onChange={(newValue) => props.onChange?.(new Field(newValue, props.field.type))}
        />
        <select disabled={props.disabled} value={props.field.type} onChange={(e) => props.onChange && props.onChange(new Field(props.field.name, e.target.value as DataType))}>
            {configuration.dataTypes.map((type) => {
              return <option>{type}</option>
            })}
        </select>
    </div>
  )
}

export default PairChooser