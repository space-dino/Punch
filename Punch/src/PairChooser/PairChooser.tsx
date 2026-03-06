import React from 'react'
import TextBox from '../TextBox/TextBox'
import './PairChooser.css'

interface PairChooserProps {
    label : string;
    value : string;
    disabled? : boolean;
}

const PairChooser : React.FC<PairChooserProps> = (props : PairChooserProps) => {
  return (
    <div className="pair-chooser">
        <TextBox disabled={props.disabled} label={props.label} value={props.value}/>
        <select disabled={props.disabled}>
            <option>hello1</option>
            <option>hello2</option>
            <option>hello3</option>
        </select>
    </div>
  )
}

export default PairChooser