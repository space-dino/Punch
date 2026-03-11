import React, { useState } from 'react'
import './TypeEditor.css'
import PairChooser from '../../Components/PairChooser/PairChooser'
import { useTypes } from '../../context/TypesContext';
import { EntityTypeSchema } from '../../DTOs/entity/entityType/EntityTypeSchema';
import { useNavigate, useParams } from 'react-router';
import { Field } from '../../DTOs/entity/entityType/field/Field';
import TextBox from '../../Components/TextBox/TextBox';

interface TypeEditorProps {
}

const TypeEditor : React.FC<TypeEditorProps> = (props : TypeEditorProps) => {
    const { types, setTypes, baseTypes } = useTypes();
    const navigate = useNavigate();

    const [draft, setDraft] = useState<Field>(new Field('', 'string'));
    const [typeName, setTypeName] = useState('');

    const [selectedBaseType, setSelectedBaseType] = useState<string>(baseTypes[0].label);
    const params = useParams<{ id: string }>();
    const selectedType = types.find(e => e.label === params.id) ?? baseTypes.find(e => e.label === params.id);

    const handlePropertyChange = (key: string, newField: Field) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(
                    e.label,
                    e.baseLabel,
                    e.icon,
                    e.typeFields.map(field => field.name === key ? newField : field)
                    )
                : e
            ))
        }
    }

    const handleBaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(t =>
            t.label === selectedType.label
                ? new EntityTypeSchema(t.label, e.target.value, t.icon, t.typeFields)
                : t
            ))
        } else {
            setSelectedBaseType(e.target.value)
        }
    }

    const addNewField = () => {
        const isDuplicate = selectedType?.typeFields.find(f => f.name === draft.name) !== undefined;

        if (draft.name.trim() === '' || isDuplicate) return;

        if (selectedType !== undefined) {
            // editing existing type
            setTypes(prev => prev.map(e =>
            e.label === selectedType.label
                ? new EntityTypeSchema(e.label, e.baseLabel, e.icon, [...e.typeFields, draft])
                : e
            ));
        } else {
            // creating new type — add it to types with the new field
            setTypes(prev => [...prev, new EntityTypeSchema(typeName, selectedBaseType, 'new', [draft])]);
            navigate(`./${typeName}`);
        }

        setDraft(new Field('', 'string'));
    };

    const removeField = (key: string) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(
                    e.label,
                    e.baseLabel,
                    e.icon,
                    e.typeFields.filter(f => f.name !== key)
                    )
                : e
            ))
        }
    }

  return (
    <div className='type-editor'>
        <div className='type-editor__header'>
            <TextBox label='Type name' value={selectedType?.label} onChange={(e) => setTypeName(e)}/>
        </div>
        {selectedType?.baseLabel && <select className='basetype-select' value={selectedType?.baseLabel} onChange={(e) => {setSelectedBaseType(e.target.value)}}>
            {baseTypes.map((baseType) => {
                return <option>{baseType.label}</option>
            })}
        </select>}
        {selectedType?.baseLabel && Object.entries(baseTypes.find((t) => t.label === selectedType?.baseLabel)?.typeFields || []).map(([key, field]) => (
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
                disabled={selectedType?.baseLabel ? false : true}
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