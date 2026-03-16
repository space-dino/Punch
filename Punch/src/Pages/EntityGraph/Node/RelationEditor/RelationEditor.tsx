import React, { useState } from 'react'
import './RelationEditor.css'
import { useEntities } from '../../../../context/EntitiesContext';
import configuration from '../../../../configuration.json'

const RelationEditor = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>();
    const { entities } = useEntities();
    const [ relationType, setRelationType ] = useState<string>('');
    const [ selectedEntity, setSelectedEntity ] = useState<string>('')

  return (
    <>
        <button className='new-relation' onClick={() => setIsOpen(!isOpen)}>+</button>

        <div className={`relation-editor ${isOpen ? 'open' : ''}`}>
            <input
                type="text"
                placeholder="Relation Type"
                value={relationType}
                onChange={(e) => setRelationType(e.target.value)}/>

            <div className='relation-editor__content'>
                {entities.map(entity => (
                    <button
                        className={`entity-option ${selectedEntity === entity.entityId ? 'selected' : ''}`}
                        onClick={() => setSelectedEntity(entity.entityId)}>
                        {entity.baseType.typeSchemaLabel}
                        {': '}
                        {Object.entries(entity.baseType.fieldValues)
                        .filter(([key]) => !configuration.tableFilter.includes(key))
                        .map(([, value]) => value)
                        .join(', ')}
                    </button>
                ))}
            </div>

            <button disabled={relationType === '' || selectedEntity === ''}>Add</button>
        </div>
    </>
  )
}

export default RelationEditor