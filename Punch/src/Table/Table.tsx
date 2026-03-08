import React from 'react'
import ElementRow from './ElementRow/ElementRow'
import './Table.css'
import { useEntities } from '../context/EntitiesContext'
import ButtonsBar from '../ButtonsBar/ButtonsBar'

interface TableProps {
}

const Table : React.FC<TableProps> = (props : TableProps) => {
  const { entities, setEntities } = useEntities();

  return (
    <div className='table'>
      <ButtonsBar/>

      <input className='search-bar' placeholder='Search...'></input>

      {entities.map((entity) => (
        <ElementRow Entity={entity} setEntities={setEntities}/>
      ))}
    </div>
  )
}

export default Table