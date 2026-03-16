import IconDropdown from '../IconDropdown/IconDropdown'
import configuration from '../../configuration.json'
import { useLogin } from '../../context/LoginContext';
import { useEffect } from 'react'
import { getJSON } from '../../api'
import { useEnvironments } from '../../context/EnvironmentsContext'
import { useNavigate } from 'react-router';

const TopBar = () => {
  const { login } = useLogin();
  const navigate = useNavigate();

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
    <IconDropdown label={selectedEnvironment !== '' ? selectedEnvironment : 'No Environment Selected'} icon='🦍'
        actionOptions={environments?.map(environment =>
         ({label: environment, action: () => { setSelectedEnvironment(environment); navigate('/') } }))}
        linkOptions={[
          {label: 'Add New', url: configuration.urls.environmentsUrl}
        ]}/>
    </div>
  )
}

//CONTINUE HERE ____ envs in bar

export default TopBar