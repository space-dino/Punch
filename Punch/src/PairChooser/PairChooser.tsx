import React from 'react'
import TextBox from '../TextBox/TextBox'
import './PairChooser.css'
import configuration from '../configuration.json'

interface PairChooserProps {
    label : string;
    value : string;
    disabled? : boolean;
    onChange?: (newValue: string) => void;
}

const PairChooser : React.FC<PairChooserProps> = (props : PairChooserProps) => {
  return (
    <div className="pair-chooser">
        <TextBox disabled={props.disabled}
          label={props.label}
          value={props.value}
          onChange={props.onChange}/>
        <select disabled={props.disabled}>
            {configuration.dataTypes.map((type) => {
              return <option>{type}</option>
            })}
        </select>
    </div>
  )
}

export default PairChooser