import React from 'react'
import './TextBox.css'

interface TextBoxProps {
  label : string;
  value : string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const TextBox : React.FC<TextBoxProps> = (props : TextBoxProps) => {
  return (
    <div className={'text-box'}>
        <input type='text'
          className={'text-box-input' + (props.disabled ? '--disabled' : '')}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
          value={props.value}
          placeholder='Enter text here...'></input>
        <p>{props.label}</p>
    </div>
  )
}

export default TextBox