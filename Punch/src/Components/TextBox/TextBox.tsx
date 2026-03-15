import React from 'react'
import './TextBox.css'
import type { DataType } from '../../DTOs/entity/entityType/field/Field'

const dataTypeAttributes: Record<DataType, React.InputHTMLAttributes<HTMLInputElement>> = {
  String:  { type: 'text' },
  Number:  { type: 'number' },
  Boolean: { type: 'checkbox' },
  Date:    { type: 'date' },
}

interface TextBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  inputRef?: (el: HTMLInputElement | null) => void
  onChange?: (newValue: string) => void
  dataType?: DataType
  alphanumericOnly?: boolean
}

const TextBox: React.FC<TextBoxProps> = ({ label, inputRef, onChange, dataType, alphanumericOnly, ...rest }) => {
  const typeAttrs = dataType ? dataTypeAttributes[dataType] : {}

  return (
    <div className='text-box'>
      <input
        ref={inputRef}
        className='text-box-input'
        placeholder={label}
        onChange={(e) => {
          const value = alphanumericOnly
            ? e.target.value.replace(/[^a-zA-Z0-9_]/g, '')
            : e.target.value
          onChange?.(value)
        }}
        {...typeAttrs}   // apply type/pattern from dataType
        {...rest}        // explicit props override dataType defaults
      />
      <p>{label}</p>
    </div>
  )
}

export default TextBox