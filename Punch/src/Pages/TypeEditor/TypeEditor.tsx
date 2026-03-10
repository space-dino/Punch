import React, { useState } from 'react'
import './TypeEditor.css'
import PairChooser from '../../Components/PairChooser/PairChooser'
import { useTypes } from '../../context/TypesContext';
import { EntityTypeSchema } from '../../DTOs/entity/entityType/EntityTypeSchema';
import { useParams } from 'react-router';
import { Field } from '../../DTOs/entity/entityType/field/Field';

interface TypeEditorProps {
}

const TypeEditor : React.FC<TypeEditorProps> = (props : TypeEditorProps) => {
    const { types, setTypes, baseTypes } = useTypes();

    const [draft, setDraft] = useState<Field>(new Field('', 'string'));
    const [selectedBaseType, setSelectedBaseType] = useState<string>(baseTypes[0].label);
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
        if (draft.name.trim() !== '' && selectedType !== undefined
         && types.find(e => e.label === selectedType.label)?.typeFields.find(f => f.name === draft.name) === undefined) {
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

    const removeField = (key: string) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(
                    e.label,
                    e.icon,
                    e.typeFields.filter(f => f.name !== key)
                    )
                : e
            ))
        }
    }

  return (
    <div className='type-editor'>
        <h2>{selectedType ? selectedType.label : 'New Type'}</h2>
        <select className='basetype-select' value={selectedBaseType} onChange={(e) => setSelectedBaseType(e.target.value)}>
            {baseTypes.map((baseType) => {
                return <option>{baseType.label}</option>
            })}
        </select>
        {Object.entries(baseTypes.find((t) => t.label === selectedBaseType)?.typeFields || []).map(([key, field]) => (
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
                onRemove={() => removeField(field.name)}
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
                className={draft.name.trim() !== '' ? 'new-field-filled' : 'new-field-empty'}
            />
            <button className={`new-field-button${draft.name.trim() === '' ? '--disabled' : ''}`}
                onClick={addNewField}>+</button>
        </div>
    </div>
  )
}

export default TypeEditor