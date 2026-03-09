import React, { useEffect, useState } from 'react'
import ElementRow from './ElementRow/ElementRow'
import './Table.css'
import { useEntities } from '../context/EntitiesContext'
import ButtonsBar from '../ButtonsBar/ButtonsBar'
import type { EntityWithRelations } from '../DTOs/entity/EntityWithRelations'
import MultiSelect from '../MultiSelect/MultiSelect'

interface TableProps {
}

const Table : React.FC<TableProps> = (props : TableProps) => {
  const { entities, setEntities } = useEntities();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("ngrok-skip-browser-warning", "true");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as const
    };

    fetch("https://perkily-unsanguineous-roman.ngrok-free.dev/environments/tenant_google", requestOptions)
      .then((response) => response.json())
      .then((data: EntityWithRelations[]) => {
        setEntities(data);
      })
      .catch((error) => console.error(error))
  }, []);

  return (
    <>
      <ButtonsBar/>
      
      <div className='table-actions-bar'>
        <input className='search-bar' placeholder='Search...'></input>
        
        <MultiSelect/>
      </div>

      <div className='table'>  
        {entities.length > 0 ? entities.map((entity) => (
          <ElementRow Entity={entity} setEntities={setEntities}/>
        )) : 'No Data Here );'}
      </div>
    </>
  )
}

export default Table