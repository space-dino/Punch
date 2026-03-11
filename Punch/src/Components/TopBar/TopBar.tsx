import React from 'react'
import IconDropdown from '../IconDropdown/IconDropdown'
import configuration from '../../configuration.json'

const TopBar = () => {
  return (
    <div className='dropdowns-bar'>
    <IconDropdown label='User1' icon='🐒'
        options={[
        {label: 'Sign Out', url: configuration.urls.loginUrl}
        ]}/>
    <IconDropdown label='Env1' icon='🦍'
        options={[
        {label: 'Sign Out', url: configuration.urls.environmentsUrl}
        ]}/>
    </div>
  )
}

export default TopBar