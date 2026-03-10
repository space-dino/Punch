import React, { useState } from 'react'
import './MultiSelect.css'

interface MultiSelectProps {
    options: string[];
}

const MultiSelect : React.FC<MultiSelectProps> = (props : MultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div className='multiselect'>
        <div className='multiselect__handle' onMouseDown={() => setIsOpen(!isOpen)}>
            <p>Filter</p>
        </div>
        <div className={`multiselect__content${!isOpen ? '--disabled' : ''}`}>
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