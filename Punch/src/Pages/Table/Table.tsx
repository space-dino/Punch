import React, { useEffect, useState } from 'react'
import EntityRow from './EntityRow/EntityRow'
import './Table.css'
import { useEntities } from '../../context/EntitiesContext'
import ButtonsBar from '../../Components/ButtonsBar/ButtonsBar'
import { EntityWithRelations } from '../../DTOs/entity/EntityWithRelations'
import configuration from '../../configuration.json'
import { getJSON } from '../../api'
import { useLogin } from '../../context/LoginContext'
import { EntityTypeInstance } from '../../DTOs/entity/entityType/EntityTypeInstance'
import { useTypes } from '../../context/TypesContext'

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
  const { entities, setEntities } = useEntities();
  const { login } = useLogin();
  const { types, baseTypes } = useTypes();

  const [draft, setDraft] = useState<EntityWithRelations>(defaultDraft());

  useEffect(() => {
    getJSON<EntityWithRelations[]>(configuration.baseUrls.data, configuration.urls.environmentsUrl + configuration.DEBUG_TENANT)
      .then((data) => setEntities(data))
      .catch(console.error)
  }, [draft])

  const handleAddDraft = () => {
    setEntities(prev => [...prev, draft]);
    setDraft(defaultDraft());
  }

  return (
    <>
      <ButtonsBar />

      <div className='table-actions-bar'>
        <input className='search-bar' placeholder='Search...' />
      </div>

      <div className='new-entity-row'>
        {<select className='basetype-select' value={draft.baseType.typeSchemaLabel} onChange={(e) => 
          {draft.baseType = new EntityTypeInstance(e.target.value, {})}}>
          {baseTypes.map((baseType) => {
              return <option>{baseType.label}</option>
          })}
          {types.map((baseType) => {
              return <option>{baseType.label}</option>
          })}
        </select>}
        <EntityRow Entity={draft} onDraftChange={setDraft} />
        <button onClick={handleAddDraft}>+</button>
      </div>

      <div className='table'>
        {(entities.length > 0)
          ? entities.map((entity) => <EntityRow key={entity.entityId} Entity={entity} />)
          : 'No Data Here );'
        }
      </div>
    </>
  )
}

export default Table