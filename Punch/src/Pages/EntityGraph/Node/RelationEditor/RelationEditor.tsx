import { useState } from 'react'
import './RelationEditor.css'
import { useEntities } from '../../../../context/EntitiesContext';
import configuration from '../../../../configuration.json'
import { postJSON } from '../../../../api';
import { useEnvironments } from '../../../../context/EnvironmentsContext';
import { UpdatedRelation } from '../../../../DTOs/entity/Updates/UpdatedRelation';
import { useNavigate } from 'react-router';
import { EntityWithRelations } from '../../../../DTOs/entity/EntityWithRelations';
import { RelationInstance } from '../../../../DTOs/entity/relations/RelationInstance';

interface RelationEditorProps {
    entityId: string;
}

const RelationEditor = (props: RelationEditorProps) => {
    const [ isOpen, setIsOpen ] = useState<boolean>();
    const { entities, setEntities } = useEntities();
    const { selectedEnvironment } = useEnvironments();
    const [ relationType, setRelationType ] = useState<string>('');
    const [ selectedEntity, setSelectedEntity ] = useState<string>('')

    const addRelation = () => {
        const newRelation = new UpdatedRelation(
            relationType,
            {},
            selectedEntity,
            props.entityId,
            1
        );

        postJSON(
            configuration.baseUrls.data, configuration.urls.environmentsUrl + "/" + selectedEnvironment, newRelation)
            .catch(console.error)
            .then(() => {
            const targetEntity = entities.find(e => e.entityId === selectedEntity)
            if (!targetEntity) return
            
            setEntities(prev => prev.map(e =>
                e.entityId === props.entityId
                ? new EntityWithRelations(
                    e.entityId,
                    e.baseType,
                    e.subTypes,
                    [...e.relations, new RelationInstance(relationType, selectedEnvironment, {}, targetEntity)]
                    )
                : e
            ))
            setIsOpen(false)
            setRelationType('')
            setSelectedEntity('')
        })
    }

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

            <button disabled={relationType === '' || selectedEntity === ''} onClick={addRelation}>Add</button>
        </div>
    </>
  )
}

export default RelationEditor