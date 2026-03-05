import { useState } from 'react'
import './App.css'
import { Entity } from './Objects/Entity'
import Sidebar from './SideBar/SideBar'
import Table from './Table/Table'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import TypeEditor from './TypeEditor/TypeEditor'
import { TypesProvider } from './TypesContext/TypesContext'
import { DEFAULT_TYPES } from './TypesContext/TypesConfig'

const initialEntities: Entity[] = [
  new Entity('Entity1', '1', { property1: 'value1', property2: 'value2', property3: 'value3' }),
  new Entity('Entity2', '2', { property3: 'value3', property4: 'value4' }),
  new Entity('Entity3', '3', { property5: 'value5', property6: 'value6', property7: 'value7' }),
]

function App() {
  const [entities, setEntities] = useState<Entity[]>(initialEntities)

  return (
    <TypesProvider defaultTypes={DEFAULT_TYPES}>
      <h1>Punch</h1>

      <Sidebar/>

      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        
        <input className='search-bar'></input>

        <Routes>
        <Route path="/" element={
            <Table entities={entities} setEntities={setEntities} />
          } />
          <Route path="/about"  element={<TypeEditor/>} />
          <Route path="*"       element={<p>Error 404 Page not Found</p>} />
        </Routes>
      </BrowserRouter>
    </TypesProvider>
  )
}

export default App
