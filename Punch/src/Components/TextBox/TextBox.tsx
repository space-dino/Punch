import React from 'react'
import './TextBox.css'

interface TextBoxProps {
  label: string
  name?: string
  value?: string
  disabled?: boolean
  type?: 'text' | 'password'
  onChange?: (newValue: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const TextBox : React.FC<TextBoxProps> = (props : TextBoxProps) => {
  return (
    <div className={'text-box'}>
        <input type={props.type || 'text'}
          className={'text-box-input'}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
          onKeyDown={(e) => props.onKeyDown?.(e)}
          value={props.value}
          name={props.name}
          placeholder={props.label}></input>
        <p>{props.label}</p>
    </div>
  )
}

export default TextBox