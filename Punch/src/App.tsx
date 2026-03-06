import { useState } from 'react'
import './App.css'
import { Entity } from './Objects/Entity'
import Sidebar from './SideBar/SideBar'
import Table from './Table/Table'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import TypeEditor from './TypeEditor/TypeEditor'
import { TypesProvider } from './context/TypesContext'
import { DEFAULT_TYPES } from './context/configuration'
import IconDropdown from './IconDropdown/IconDropdown'
import EntityGraph from './EntityGraph/EntityGraph'
import { EntitiesProvider } from './context/EntitiesContext'

const DEFAULT_ENTITIES: Entity[] = [
  new Entity('Entity1', '1', DEFAULT_TYPES[0], { property1: 'value1', property2: 'value2', property3: 'value3' }),
  new Entity('Entity2', '2', DEFAULT_TYPES[1], { property3: 'value3', property4: 'value4' }),
  new Entity('Entity3', '3', DEFAULT_TYPES[2], { property5: 'value5', property6: 'value6', property7: 'value7' }),
]

function App() {
  const [entities, setEntities] = useState<Entity[]>(DEFAULT_ENTITIES)

  return (
    <TypesProvider defaultTypes={DEFAULT_TYPES}>
      <h1>Punch</h1>


      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
        </nav>
        
        <Sidebar/>
        <IconDropdown label='env1' icon='🐒'/>
        <EntitiesProvider defaultEntities={DEFAULT_ENTITIES}>
          <Routes>
          <Route path="/" element={
              <Table entities={entities} setEntities={setEntities} />
            } />
            <Route path="/type-editor"       element={<TypeEditor/>} />
            <Route path="/entity-editor"     element={<EntityGraph/>} />
            <Route path="/entity-editor/:id" element={<EntityGraph/>} />
            <Route path="*"                  element={<p>Error 404 Page not Found</p>} />
          </Routes>
        </EntitiesProvider>
      </BrowserRouter>
    </TypesProvider>
  )
}

export default App
