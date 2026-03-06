import React, { useState } from 'react'
import './IconDropdown.css'
import { useTypes } from '../context/TypesContext'
import type { EntityType } from '../Objects/EntityType';
import { NavLink } from 'react-router';

interface IconDropdownProps {
  label : string;
  icon : string;
}

const IconDropdown: React.FC<IconDropdownProps> = (props: IconDropdownProps) => {
  const [open, setOpen] = useState(true);
  const { types } = useTypes();

  return (
    <div className={`icon-dropdown ${open ? 'icon-dropdown--open' : 'icon-dropdown--closed'}`}>
      <div className='icon-dropdown__header' onClick={() => setOpen(prev => !prev)}>
        <div className='icon'>{props.icon}</div>

        <p>{props.label}</p>
      </div>

      <div className='icon-dropdown__content'>
        {types.map((type : EntityType) => (
          <p>{type.name}</p>
        ))}

        <NavLink to="/env-editor">+</NavLink>
      </div>
    </div>
  )
}

export default IconDropdown