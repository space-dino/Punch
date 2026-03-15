import React from 'react'
import './IconDropdown.css'
import { NavLink } from 'react-router';

interface IconDropdownProps {
  label : string;
  icon : string;
  linkOptions? : {label: string, url: string}[];
  actionOptions? : {label: string, action: () => void}[];
}

const IconDropdown: React.FC<IconDropdownProps> = (props: IconDropdownProps) => {
  return (
    <div className='icon-dropdown'>
      <div className='icon-dropdown__header'>
        <div className='icon'>{props.icon}</div>

        <p>{props.label}</p>
      </div>

      <div className='icon-dropdown__content'>
        {props.linkOptions?.map((option : {label: string, url: string}) => (
          <NavLink to={option.url}>{option.label}</NavLink>
        ))}
        {props.actionOptions?.map((option : {label: string, action: () => void}) => (
          <button onClick={option.action}>{option.label}</button>
        ))}
      </div>
    </div>
  )
}

export default IconDropdown