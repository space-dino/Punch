import React, { useState } from 'react'
import './SideBar.css'
import { useTypes } from '../context/TypesContext'
import type { EntityTypeSchema } from '../DTOs/entity/entityType/EntityTypeSchema';
import { NavLink } from 'react-router';
import configuration from '../configuration.json';

interface SideBarProps {
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const [open, setOpen] = useState(true);
  const { types } = useTypes();

  return (
    <div className={`side-bar ${open ? 'side-bar--open' : 'side-bar--closed'}`}>
      <button onClick={() => setOpen(prev => !prev)}>
        {open ? '←' : '→'}
      </button>

      <div className='side-bar-container'>
        <div className='side-bar__content'>
          {types.map((type : EntityTypeSchema) => (
            <NavLink to={`${configuration.urls.typesUrl}/${type.label}`}>{type.label}</NavLink>
          ))}

          <NavLink to={configuration.urls.typesUrl}>+</NavLink>
        </div>

        <div className='side-bar-icons' onClick={() => setOpen(prev => !prev)}>
          {types.map((type : EntityTypeSchema) => (
            <p>{type.icon}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar