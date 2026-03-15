import React from 'react'
import './TypeEditor.css'
import { useTypes } from '../../context/TypesContext';
import TextBox from '../../Components/TextBox/TextBox';
import { useTypeEditor } from './useTypeEditor';
import IconPicker from '../../Components/IconPicker/IconPicker';
import TypeFields from './TypeFields/TypeFields';

interface TypeEditorProps {
}

const TypeEditor: React.FC<TypeEditorProps> = () => {
    const { baseTypes } = useTypes()

    const {
    draft, setDraft,
    typeName, setTypeName,
    selectedType,
    selectedBaseType,
    deleteType,
    handleIconChange,
    handlePropertyChange,
    handleBaseTypeChange,
    removeField,
    addNewField,
    } = useTypeEditor();

  return (
    <div className='type-editor'>
        <div className='type-editor__header'>
            <TextBox label='Type name' value={selectedType?.label ?? typeName} onChange={(e) => setTypeName(e)} alphanumericOnly/>
        </div>
        {selectedType?.baseLabel !== '' && (
            <select
                className='basetype-select'
                value={selectedType?.baseLabel ?? selectedBaseType}
                onChange={handleBaseTypeChange}
            >
                {baseTypes.map((baseType) => (
                <option key={baseType.label} value={baseType.label}>{baseType.label}</option>
                ))}
            </select>
        )}
        <IconPicker disabled={selectedType?.baseLabel === ''} icon={selectedType?.icon ?? ''} onIconChange={handleIconChange}/>
        {selectedType?.baseLabel === '' && <p>Base Type</p>}

        <TypeFields
            selectedType={selectedType}
            draft={draft}
            setDraft={setDraft}
            handlePropertyChange={handlePropertyChange}
            removeField={removeField}
            addNewField={addNewField}
        />

        {selectedType?.baseLabel !== '' && selectedType && <button className='delete-type-button' onClick={deleteType}>Delete Type</button>}
    </div>
  )
}

export default TypeEditor