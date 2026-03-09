import React from 'react'
import './MultiSelect.css'

interface MultiSelectProps {
    options: string[];
}

const MultiSelect : React.FC<MultiSelectProps> = (props : MultiSelectProps) => {
    return (
    <div className='multiselect'>
        <div className='multiselect--content'>
            {props.options.map((option) => (
            <label key={option}>
                <input type='checkbox' value={option} />
                {option}
            </label>
            ))}
        </div>
    </div>
    )
}

export default MultiSelect