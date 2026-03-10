import './App.css'
import './GradientShift.css'
import Sidebar from './Components/SideBar/SideBar'
import Table from './Pages/Table/Table'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import TypeEditor from './Pages/TypeEditor/TypeEditor'
import { TypesProvider } from './context/TypesContext'
import { DEFAULT_TYPES, DEFAULT_ENTITIES } from './dataConfig'
import IconDropdown from './Components/IconDropdown/IconDropdown'
import EntityGraph from './Pages/EntityGraph/EntityGraph'
import { EntitiesProvider } from './context/EntitiesContext'
import configuration from './configuration.json'
import EnvironmentEditor from './Pages/EnvironmentEditor/EnvironmentEditor'
import Login from './Pages/Login/Login'
import { BASE_TYPES } from './dataConfig';
import TitleBar from './Components/TitleBar/TitleBar'

function App() {
  return (
    <TypesProvider defaultTypes={DEFAULT_TYPES} defaultBaseTypes={BASE_TYPES}>
      <title>Punch</title>
      <link rel="icon" href="/icon.png"/>
      <TitleBar/>

      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
        </nav>
        
        <Sidebar/>

        <div className='dropdowns-bar'>
          <IconDropdown label='User1' icon='🐒' url={configuration.urls.loginUrl}/>
          <IconDropdown label='Env1' icon='🦍' url={configuration.urls.environmentsUrl}/>
        </div>

        <EntitiesProvider defaultEntities={DEFAULT_ENTITIES}>
          <Routes>
            <Route path="/"                                           element={<Table/>} />
            <Route path={configuration.urls.loginUrl}                 element={<Login/>} />
            <Route path={`${configuration.urls.loginUrl}/:id`}        element={<Login/>} />
            <Route path={configuration.urls.typesUrl}                 element={<TypeEditor/>} />
            <Route path={`${configuration.urls.typesUrl}/:id`}        element={<TypeEditor/>} />
            <Route path={configuration.urls.entitiesUrl}              element={<EntityGraph/>} />
            <Route path={`${configuration.urls.entitiesUrl}/:id`}     element={<EntityGraph/>} />
            <Route path={configuration.urls.environmentsUrl}          element={<EnvironmentEditor/>} />
            <Route path={`${configuration.urls.environmentsUrl}/:id`} element={<EnvironmentEditor/>} />
            <Route path="*"                                           element={<p>Error 404 Page not Found</p>} />
          </Routes>
        </EntitiesProvider>
      </BrowserRouter>
    </TypesProvider>
  )
}

export default App
