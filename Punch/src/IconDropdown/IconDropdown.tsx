import React, { useState } from 'react'
import './IconDropdown.css'
import { useTypes } from '../context/TypesContext'
import type { EntityType } from '../Objects/EntityType';
import { NavLink } from 'react-router';

interface IconDropdownProps {
  label : string;
  icon : string;
  url : string;
}

const IconDropdown: React.FC<IconDropdownProps> = (props: IconDropdownProps) => {
  const { types } = useTypes();

  return (
    <div className='icon-dropdown'>
      <div className='icon-dropdown__header'>
        <div className='icon'>{props.icon}</div>

        <p>{props.label}</p>
      </div>

      <div className='icon-dropdown__content'>
        {types.map((type : EntityType) => (
          <NavLink to={`${props.url}/${type._id}`}>{type.name}</NavLink>
        ))}

        <NavLink to={props.url}>+</NavLink>
      </div>
    </div>
  )
}

export default IconDropdown