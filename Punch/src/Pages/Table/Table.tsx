import React, { useEffect, useState } from 'react'
import EntityRow from './EntityRow/EntityRow'
import './Table.css'
import { useEntities } from '../../context/EntitiesContext'
import TableActionsBar from './TableActionsBar/TableActionsBar'
import { EntityWithRelations } from '../../DTOs/entity/EntityWithRelations'
import configuration from '../../configuration.json'
import { getJSON, postJSON } from '../../api'
import { EntityTypeInstance } from '../../DTOs/entity/entityType/EntityTypeInstance'
import { useTypes } from '../../context/TypesContext'
import { useEnvironments } from '../../context/EnvironmentsContext'
import type { SearchResult } from '../../DTOs/SearchResult'

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
};

const Table: React.FC<TableProps> = () => {
  const { entities, setEntities } = useEntities();
  const { baseTypes } = useTypes();
  const [selected, setSelected] = useState<string[]>([]);
  const { selectedEnvironment } = useEnvironments();
  const [query, setQuery] = useState<string>('')

  const [draft, setDraft] = useState<EntityWithRelations>(defaultDraft());
  const [filtered, setFiltered] = useState<EntityWithRelations[]>([]);

  useEffect(() => {
    getJSON<EntityWithRelations[]>(configuration.baseUrls.data, configuration.urls.environmentsUrl + '/' + selectedEnvironment)
      .then((data) => setEntities(data))
      .catch(console.error)
  }, [selectedEnvironment])

  const handleAddDraft = () => {
    setEntities(prev => [...prev, draft]);
    setDraft(defaultDraft());

    postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + configuration.urls.baseTypesUrl +  "/" + draft.entityId + '/' + selectedEnvironment, draft.baseType, 'POST')
      .catch(console.error)
  }

  useEffect(() => {
    if (query !== '') {
      getJSON<SearchResult[]>(configuration.baseUrls.data, configuration.urls.searchUrl + '?tenantId=' + selectedEnvironment + '&q=' + query)
      .then((data) => setFiltered(data.sort((a, b) => b.score - a.score).map(result => result.entity)))
        .catch(console.error);
    } else {
      setFiltered([]);
    }
  }, [query])

  const handleDeleteSelection = () => {
    postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + configuration.urls.environmentsUrl + '/' + selectedEnvironment,
      entities.filter(entity => selected.includes(entity.entityId))
        .map(entity => entity.entityId),
      'DELETE')
    .catch(console.error)
    
    setEntities(prev => prev.filter(entity => !selected.includes(entity.entityId)));
  }

  const onSelectionChange = (isSelected: boolean, id: string) => {
    setSelected(prev => 
      isSelected
        ? [...prev, id]
        : prev.filter(i => i !== id)
    );
  }

  const draftFilled: boolean = Object.entries(draft.baseType.fieldValues)
  .filter(([key]) => !configuration.tableFilter.includes(key))
  .some(([, value]) => value !== '' && value !== undefined)

  return (
    <>
      <TableActionsBar
        selected={selected}
        onDelete={handleDeleteSelection}
        query={query}
        onQueryChange={setQuery}
      />

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
        <EntityRow Entity={draft} onDraftChange={setDraft}/>
        <button onClick={handleAddDraft}
          disabled={!draftFilled}>
            +
        </button>
      </div>

      <div className='table'>
        {(entities.length > 0)
          ? (filtered?.length < 1 ?
            entities.map((entity) => <EntityRow key={entity.entityId} Entity={entity} onSelectChange={onSelectionChange}/>)
            : filtered.map((entity) => <EntityRow key={entity.entityId} Entity={entity} onSelectChange={onSelectionChange}/>)
          )
          : 'No Data Here );'
        }
      </div>
    </>
  )
}

export default Table