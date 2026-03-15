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
    setSelectedBaseType,
    deleteType,
    handleIconChange,
    handlePropertyChange,
    removeField,
    addNewField,
    } = useTypeEditor();

  return (
    <div className='type-editor'>
        <div className='type-editor__header'>
            <TextBox label='Type name' value={selectedType?.label ?? typeName} onChange={(e) => setTypeName(e)}/>
        </div>
        {selectedType?.baseLabel !== '' && <select className='basetype-select' value={selectedType?.baseLabel} onChange={(e) => {setSelectedBaseType(e.target.value)}}>
            {baseTypes.map((baseType) => {
                return <option>{baseType.label}</option>
            })}
        </select>}
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

        {selectedType?.baseLabel !== '' && <button>Delete Type</button>}
    </div>
  )
}

export default TypeEditor