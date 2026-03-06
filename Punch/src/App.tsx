import { useState } from 'react'
import './App.css'
import { Entity } from './Objects/Entity'
import Sidebar from './SideBar/SideBar'
import Table from './Table/Table'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import TypeEditor from './TypeEditor/TypeEditor'
import { TypesProvider } from './context/TypesContext'
import { DEFAULT_TYPES, DEFAULT_ENTITIES } from './configuration'
import IconDropdown from './IconDropdown/IconDropdown'
import EntityGraph from './EntityGraph/EntityGraph'
import { EntitiesProvider } from './context/EntitiesContext'
import ButtonsBar from './ButtonsBar/ButtonsBar'



function App() {
  return (
    <TypesProvider defaultTypes={DEFAULT_TYPES}>
      <h1>Punch</h1>


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
