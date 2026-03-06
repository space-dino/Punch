import React, { useState } from 'react'
import './IconDropdown.css'
import { useTypes } from '../TypesContext/TypesContext'
import type { EntityType } from '../Objects/EntityType';
import { NavLink } from 'react-router';

interface IconDropdownProps {
}

const IconDropdown: React.FC<IconDropdownProps> = (props: IconDropdownProps) => {
  const [open, setOpen] = useState(true);
  const { types } = useTypes();

  return (
    <div className={`icon-dropdown ${open ? 'icon-dropdown--open' : 'icon-dropdown--closed'}`}>
      <button onClick={() => setOpen(prev => !prev)}>
        {open ? '←' : '→'}
      </button>

      <div className='icon-dropdown__content'>
        {types.map((type : EntityType) => (
          <p>{type.name}</p>
        ))}

        <NavLink to="/type-editor">+</NavLink>
      </div>
    </div>
  )
}

export default IconDropdown