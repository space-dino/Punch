import React, { useEffect, useState } from 'react'
import EntityRow from './EntityRow/EntityRow'
import './Table.css'
import { useEntities } from '../../context/EntitiesContext'
import ButtonsBar from '../../Components/ButtonsBar/ButtonsBar'
import { EntityWithRelations } from '../../DTOs/entity/EntityWithRelations'
import configuration from '../../configuration.json'
import { getJSON, postJSON } from '../../api'
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
  const { baseTypes } = useTypes();

  const [draft, setDraft] = useState<EntityWithRelations>(defaultDraft());

  useEffect(() => {
    getJSON<EntityWithRelations[]>(configuration.baseUrls.data, configuration.urls.environmentsUrl + configuration.DEBUG_TENANT)
      .then((data) => setEntities(data))
      .catch(console.error)
  }, [])

  const handleAddDraft = () => {
    setEntities(prev => [...prev, draft]);
    setDraft(defaultDraft());

    postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + configuration.urls.baseTypesUrl +  "/" + draft.entityId, draft.baseType, 'POST')
      .then(({ status, body }) => {
        alert('status:' + status);
        console.log('body:', body);
      })
      .catch(console.error)
  }

  const draftFilled: boolean = Object.entries(draft.baseType.fieldValues)
  .filter(([key]) => !configuration.tableFilter.includes(key))
  .some(([, value]) => value !== '' && value !== undefined)

  return (
    <>

      <div className='table-actions-bar'>
        <ButtonsBar />
        <input className='search-bar' placeholder='Search...' />
      </div>

      <div className='new-entity-row'>
        {<select className='basetype-select' value={draft.baseType.typeSchemaLabel} 
          onChange={(e) => setDraft(new EntityWithRelations(
            draft.entityId,
            new EntityTypeInstance(e.target.value, { entity_id: draft.entityId }),
            draft.subTypes,
            draft.relations
          ))}>
          {baseTypes.map((baseType) => {
              return <option>{baseType.label}</option>
          })}
        </select>}
        <EntityRow Entity={draft} onDraftChange={setDraft} />
        <button onClick={handleAddDraft}
          disabled={!draftFilled}>
            +
        </button>
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