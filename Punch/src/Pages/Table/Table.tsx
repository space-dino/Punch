import React, { useEffect, useState } from 'react'
import EntityRow from './EntityRow/EntityRow'
import './Table.css'
import { useEntities } from '../../context/EntitiesContext'
import ButtonsBar from '../../Components/ButtonsBar/ButtonsBar'
import { EntityWithRelations } from '../../DTOs/entity/EntityWithRelations'
import MultiSelect from '../../Components/MultiSelect/MultiSelect'
import configuration from '../../configuration.json'
import { getJSON } from '../../api'
import { useNavigate } from 'react-router'
import { useLogin } from '../../context/LoginContext'
import { EntityTypeInstance } from '../../DTOs/entity/entityType/EntityTypeInstance'

interface TableProps {
}

const defaultDraft = () => {
  const id = crypto.randomUUID();

  return new EntityWithRelations(
    id,
    new EntityTypeInstance("Person", {"entity_id" : id}),
    [],
    []
  )
}

const Table: React.FC<TableProps> = () => {
  const { entities, setEntities } = useEntities()
  const { login } = useLogin()
  const navigate = useNavigate()

  const [draft, setDraft] = useState<EntityWithRelations>(defaultDraft())

  useEffect(() => {
    if (login === undefined) {
      navigate(configuration.urls.loginUrl)
    } else {
      getJSON<EntityWithRelations[]>(configuration.baseUrls.data, configuration.urls.environmentsUrl + configuration.DEBUG_TENANT)
        .then((data) => setEntities(data))
        .catch(console.error)
    }
  }, [])

  const handleAddDraft = () => {
    setEntities(prev => [...prev, draft]);
    setDraft(defaultDraft());
  }

  return (
    <>
      <ButtonsBar />

      <div className='table-actions-bar'>
        <input className='search-bar' placeholder='Search...' />
        <MultiSelect options={['1', '2', '3']} />
      </div>

      <div className='new-entity-row'>
        <EntityRow Entity={draft} onDraftChange={setDraft} />
        <button onClick={handleAddDraft}>+</button>
      </div>

      <div className='table'>
        {(login !== undefined && entities.length > 0)
          ? entities.map((entity) => <EntityRow key={entity.entityId} Entity={entity} />)
          : 'No Data Here );'
        }
      </div>
    </>
  )
}

export default Table