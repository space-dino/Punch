import React, { useState } from 'react'
import './TypeEditor.css'
import PairChooser from '../../Components/PairChooser/PairChooser'
import { useTypes } from '../../context/TypesContext';
import { useParams } from 'react-router';
import { Field } from '../../DTOs/entity/entityType/field/Field';
import TextBox from '../../Components/TextBox/TextBox';
import { useTypeEditor } from './useTypeEditor';

interface TypeEditorProps {
}

const TypeEditor: React.FC<TypeEditorProps> = () => {
  const { baseTypes } = useTypes()

  const {
    draft, setDraft,
    typeName, setTypeName,
    selectedType,
    setSelectedBaseType,
    handlePropertyChange,
    handleBaseTypeChange,
    removeField,
    addNewField,
  } = useTypeEditor();

  return (
    <div className='type-editor'>
        <div className='type-editor__header'>
            <TextBox label='Type name' value={selectedType?.label ?? typeName} onChange={(e) => setTypeName(e)}/>
        </div>
        <select className='basetype-select' value={selectedType?.baseLabel} onChange={(e) => {setSelectedBaseType(e.target.value)}}>
            {baseTypes.map((baseType) => {
                return <option>{baseType.label}</option>
            })}
        </select>
        {Object.entries(baseTypes.find((t) => t.label === selectedType?.baseLabel)?.typeFields || []).map(([key, field]) => (
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