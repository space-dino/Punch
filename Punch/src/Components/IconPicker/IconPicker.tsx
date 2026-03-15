import { useState } from 'react'
import './IconPicker.css'
import configuration from '../../configuration.json'

const IconPicker = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [icon, setIcon] = useState<string>('➕')

  return (
    <div className={`icon-picker ${isOpen ? 'open' : ''}`}>
        <button className='icon-picker-toggle' onClick={() => setIsOpen(!isOpen)}>^</button>
        <p>{icon}</p>

        <div className='icon-picker__content'>
            {configuration.iconOptions.map((icon) => {
                return <button className='icon-option'
                    onClick={() => {setIcon(icon) ; setIsOpen(false) } }>
                    {icon}
                </button>
            })}
        </div>
    </div>
  )
}

export default IconPicker