import React, { useState } from 'react'
import './SideBar.css'
import { useTypes } from '../TypesContext/TypesContext'
import type { EntityType } from '../Objects/EntityType';
import { NavLink } from 'react-router';

interface IconDropdownProps {
}

const IconDropdown: React.FC<IconDropdownProps> = (props: IconDropdownProps) => {
  const [open, setOpen] = useState(true);
  const { types } = useTypes();

  return (
    <div className={`side-bar ${open ? 'side-bar--open' : 'side-bar--closed'}`}>
      <button onClick={() => setOpen(prev => !prev)}>
        {open ? '←' : '→'}
      </button>

      <div className='side-bar__content'>
        {types.map((type : EntityType) => (
          <p>{type.name}</p>
        ))}

        <NavLink to="/type-editor">+</NavLink>
      </div>
    </div>
  )
}

export default IconDropdown