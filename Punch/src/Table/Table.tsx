import React from 'react'
import ElementRow from './ElementRow/ElementRow'
import './Table.css'
import { useEntities } from '../context/EntitiesContext'

interface TableProps {
}

const Table : React.FC<TableProps> = (props : TableProps) => {
  const { entities, setEntities } = useEntities();

  return (
    <div className='table'>
      <input className='search-bar' placeholder='Search...'></input>

      {entities.map((entity) => (
        <ElementRow Entity={entity} setEntities={setEntities}/>
      ))}
    </div>
  )
}

export default Table