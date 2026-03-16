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
  const { types, baseTypes } = useTypes();
  const [selected, setSelected] = useState<string[]>([]);
  const { selectedEnvironment, setSelectedEnvironment, environments } = useEnvironments();
  const [query, setQuery] = useState<string>('')

  const [draft, setDraft] = useState<EntityWithRelations>(defaultDraft());
  const [filtered, setFiltered] = useState<EntityWithRelations[]>([]);
  const [selectedTypeSearchFilter, setSelectedTypeSearchFilter] = useState<string>('');

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
    if (query !== '' || selectedTypeSearchFilter !== '') {
      getJSON<SearchResult[]>(configuration.baseUrls.data, configuration.urls.searchUrl + '?tenantId=' + selectedEnvironment + '&q=' + query + '&type=' + selectedTypeSearchFilter)
      .then((data) => setFiltered(data.sort((a, b) => b.score - a.score).map(result => result.entity)))
        .catch(console.error);
    } else {
      setFiltered([]);
    }
  }, [query, selectedTypeSearchFilter])

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

  const deleteTenant = () => {
    postJSON(configuration.baseUrls.data, configuration.urls.environmentsUrl + '/' + selectedEnvironment, {}, 'DELETE')
    .catch(console.error)
    setSelectedEnvironment(environments.length > 0 ? environments[0] : '');
  }

  const displayedEntities = filtered.length > 0 ? filtered : entities

  return (
    <>
      <TableActionsBar
        selected={selected}
        onDelete={handleDeleteSelection}
        query={query}
        onQueryChange={setQuery}
        typeLabels={Array.from(types, type => type.label)}
        baseTypeLabels={Array.from(baseTypes, type => type.label)}
        selectedTypeFilter={selectedTypeSearchFilter}
        onTypeFilterChange={setSelectedTypeSearchFilter}
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
        {displayedEntities.length > 0
          ? displayedEntities.map((entity) => (
              <EntityRow
                key={entity.entityId}
                Entity={entity}
                onSelectChange={onSelectionChange}
                isRelated={
                  entities.some(other => other.relations.some(relation => relation.target.entityId === entity.entityId))
                }
              />
            ))
          : 'No Data Here );'
        }
      </div>

      <button
        className='delete-tenant'
        onClick={deleteTenant}
      >Delete Environment</button>
    </>
  )
}

export default Table