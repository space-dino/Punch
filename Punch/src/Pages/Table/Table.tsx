import React, { useEffect } from 'react'
import ElementRow from './ElementRow/ElementRow'
import './Table.css'
import { useEntities } from '../../context/EntitiesContext'
import ButtonsBar from '../../Components/ButtonsBar/ButtonsBar'
import type { EntityWithRelations } from '../../DTOs/entity/EntityWithRelations'
import MultiSelect from '../../Components/MultiSelect/MultiSelect'
import configuration from '../../configuration.json'
import { getJSON } from '../../api'

interface TableProps {
}

const Table : React.FC<TableProps> = (props : TableProps) => {
  const { entities, setEntities } = useEntities();

  useEffect(() => {
    getJSON<EntityWithRelations[]>(configuration.baseUrls.data, configuration.urls.environmentsUrl + configuration.DEBUG_TENANT)
      .then((data) => setEntities(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <ButtonsBar/>
      
      <div className='table-actions-bar'>
        <input className='search-bar' placeholder='Search...'></input>
        
        <MultiSelect options={['1', '2', '3']}/>
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