import React, { useState } from 'react'
import './TypeEditor.css'
import PairChooser from '../PairChooser/PairChooser'
import { useTypes } from '../context/TypesContext';
import { EntityTypeSchema } from '../DTOs/entity/entityType/EntityTypeSchema';
import { useParams } from 'react-router';
import { Field } from '../DTOs/entity/entityType/field/Field';
import { BASE_TYPES } from '../dataConfig';

interface TypeEditorProps {
}

const TypeEditor : React.FC<TypeEditorProps> = (props : TypeEditorProps) => {
    const { types, setTypes } = useTypes();

    const [draft, setDraft] = useState<Field>(new Field('', 'string'));
    const [selectedBaseType, setSelectedBaseType] = useState<string>(BASE_TYPES[0].label);
    const params = useParams<{ id: string }>();
    const selectedType = types.find(e => e.label === params.id);

    const handlePropertyChange = (key: string, newField: Field) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(
                    e.label,
                    e.icon,
                    e.typeFields.map(field => field.name === key ? newField : field)
                    )
                : e
            ))
        }
    }

    const addNewField = () => {
        if (draft.name.trim() !== '' && selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(
                    e.label,
                    e.icon,
                    [...e.typeFields, draft]
                    )
                : e
            ))
            setDraft(new Field('', 'string'));
        }
    }

  return (
    <div className='type-editor'>
        <h2>{selectedType ? selectedType.label : 'New Type'}</h2>
        <select className='basetype-select' value={selectedBaseType} onChange={(e) => setSelectedBaseType(e.target.value)}>
            {BASE_TYPES.map((baseType) => {
                return <option>{baseType.label}</option>
            })}
        </select>
        {Object.entries(BASE_TYPES.find((t) => t.label === selectedBaseType)?.typeFields || []).map(([key, field]) => (
            <PairChooser 
                key={key}
                label='Base Property Name'
                field={field}
                disabled={true}
            />
        ))}
        <div className='separator'></div>
        {Object.entries(selectedType !== undefined ? selectedType.typeFields : []).map(([key, field]) => (
            <PairChooser 
                key={key}
                label='Property Name'
                field={field}
                disabled={false}
                onChange={(newField) => handlePropertyChange(field.name, newField)}
            />
        ))}
        <div className='new-field-container'>
            <PairChooser
                key='new'
                label='New Property Name'
                field={draft}
                disabled={false}
                onChange={(newField) => setDraft(newField)}
                onEnter={addNewField}
            />
            <button className={`new-field-button${draft.name.trim() === '' ? '--disabled' : ''}`}
                onClick={addNewField}>+</button>
        </div>
    </div>
  )
}

export default TypeEditor