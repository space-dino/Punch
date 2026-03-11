import React from 'react'
import IconDropdown from '../IconDropdown/IconDropdown'
import configuration from '../../configuration.json'
import { useLogin } from '../../context/LoginContext';

const TopBar = () => {
    const { login } = useLogin();

  return (
    <div className='dropdowns-bar'>
    <IconDropdown label={login?.username ?? 'UNAUTHORIZED'} icon='🐒'
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