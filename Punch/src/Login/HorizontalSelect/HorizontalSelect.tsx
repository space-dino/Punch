import React from 'react'
import './HorizontalSelect.css'

interface HorizontalSelectProps {
  options: string[]
  selectedOption?: string
  onSelectOption?: (option: string) => void
}

const HorizontalSelect = (props: HorizontalSelectProps) => {
    const [selectedOption, setSelectedOption] = React.useState<string>(props.selectedOption || props.options[0])

    const handleSelectOption = (option: string) => {
        setSelectedOption(option)
        props.onSelectOption?.(option)
    }

  return (
    <div className='horizontal-select'>
        {props.options?.map((option) => (
            <button className={`horizontal-select-option${selectedOption === option ? ' selected' : ''}`} key={option} onClick={() => handleSelectOption(option)}>
                {option}
            </button>
        ))}
    </div>
  )
}

export default HorizontalSelect