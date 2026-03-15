import React from 'react'
import IconDropdown from '../IconDropdown/IconDropdown'
import configuration from '../../configuration.json'
import { useLogin } from '../../context/LoginContext';
import { useEffect } from 'react'
import { getJSON } from '../../api'
import { useEnvironments } from '../../context/EnvironmentsContext'

const TopBar = () => {
  const { login } = useLogin();

  const { environments, setEnvironments, selectedEnvironment, setSelectedEnvironment } = useEnvironments();

  useEffect(() => {
    getJSON<string[]>(configuration.baseUrls.data, configuration.urls.environmentsUrl)
      .then((data) => {
        if (Array.isArray(data)) setEnvironments(data)
      })
      .catch(console.error)
  }, [])

  return (
    <div className='dropdowns-bar'>
    <IconDropdown label={login?.username ?? 'UNAUTHORIZED'} icon='🐒'
        linkOptions={[
        {label: 'Sign Out', url: configuration.urls.loginUrl}
        ]}/>
    <IconDropdown label={selectedEnvironment} icon='🦍'
        actionOptions={environments?.map(environment =>
         ({label: environment, action: () => setSelectedEnvironment(environment)}))}
        linkOptions={[
          {label: 'Add New', url: configuration.urls.environmentsUrl}
        ]}/>
    </div>
  )
}

//CONTINUE HERE ____ envs in bar

export default TopBar