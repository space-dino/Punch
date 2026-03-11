import React from 'react'
import './IconDropdown.css'
import { NavLink } from 'react-router';

interface IconDropdownProps {
  label : string;
  icon : string;
  options : {label: string, url: string}[];
}

const IconDropdown: React.FC<IconDropdownProps> = (props: IconDropdownProps) => {
  return (
    <div className='icon-dropdown'>
      <div className='icon-dropdown__header'>
        <div className='icon'>{props.icon}</div>

        <p>{props.label}</p>
      </div>

      <div className='icon-dropdown__content'>
        {props.options.map((option : {label: string, url: string}) => (
          <NavLink to={option.url}>{option.label}</NavLink>
        ))}
      </div>
    </div>
  )
}

export default IconDropdown