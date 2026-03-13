import React from 'react'
import './TextBox.css'

interface TextBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  inputRef?: (el: HTMLInputElement | null) => void
  onChange?: (newValue: string) => void
}

const TextBox: React.FC<TextBoxProps> = ({ label, inputRef, onChange, ...rest }) => {
  return (
    <div className='text-box'>
      <input
        ref={inputRef}
        className='text-box-input'
        placeholder={label}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      <p>{label}</p>
    </div>
  )
}

export default TextBox