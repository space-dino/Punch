import './App.css'
import Sidebar from './SideBar/SideBar'
import Table from './Table/Table'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import TypeEditor from './TypeEditor/TypeEditor'
import { TypesProvider } from './context/TypesContext'
import { DEFAULT_TYPES, DEFAULT_ENTITIES } from './dataConfig'
import IconDropdown from './IconDropdown/IconDropdown'
import EntityGraph from './EntityGraph/EntityGraph'
import { EntitiesProvider } from './context/EntitiesContext'
import ButtonsBar from './ButtonsBar/ButtonsBar'
import configuration from './configuration.json'
import EnvironmentEditor from './EnvironmentEditor/EnvironmentEditor'

function App() {
  return (
    <TypesProvider defaultTypes={DEFAULT_TYPES}>
      <h1>PUNCH</h1>

      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
        </nav>
        
        <Sidebar/>
        <ButtonsBar/>
        <IconDropdown label='env1' icon='🐒'/>
        <EntitiesProvider defaultEntities={DEFAULT_ENTITIES}>
          <Routes>
          <Route path="/" element={
              <Table/>
            } />
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
