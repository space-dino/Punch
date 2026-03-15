import { useState } from 'react'
import './IconPicker.css'
import configuration from '../../configuration.json'

interface IconPickerProps {
    icon: string;
    onIconChange: (newIcon: string) => void;
}

const IconPicker : React.FC<IconPickerProps> = (props : IconPickerProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={`icon-picker ${isOpen ? 'open' : ''}`}>
        <button className='icon-picker-toggle' onClick={() => setIsOpen(!isOpen)}>^</button>
        <p>{props.icon}</p>

        <div className='icon-picker__content'>
            {configuration.iconOptions.map((iconOption) => {
                return <button className='icon-option'
                    onClick={() =>{ props.onIconChange(iconOption) ; setIsOpen(false)} }>
                    {iconOption}
                </button>
            })}
        </div>
    </div>
  )
}

export default IconPicker