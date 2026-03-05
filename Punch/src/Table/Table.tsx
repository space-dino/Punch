import React from 'react'
import ElementRow from '../ElementRow/ElementRow'
import { Entity } from '../Objects/Entity'
import './Table.css'

interface TableProps {
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>
}

const Table : React.FC<TableProps> = (props : TableProps) => {
  return (
    <div className='table'>
      {props.entities.map((entity) => (
        <ElementRow Entity={entity} setEntities={props.setEntities}/>
      ))}
    </div>
  )
}

export default Table