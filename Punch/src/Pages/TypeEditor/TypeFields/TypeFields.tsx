import './TypeFields.css'
import PairChooser from '../../../Components/PairChooser/PairChooser'
import { useTypeEditor } from '../useTypeEditor';
import { useTypes } from '../../../context/TypesContext';

const TypeFields = () => {
    const { types, baseTypes } = useTypes()

    const {
    draft, setDraft,
    selectedType,
    handlePropertyChange,
    removeField,
    addNewField,
    } = useTypeEditor();

  return (
    <>
        <div className='type-fields'>
            {Object.entries(baseTypes.find((t) => t.label === selectedType?.baseLabel)?.typeFields || baseTypes.find((t) => t.label === selectedType?.label)?.typeFields || []).map(([key, field]) => (
                <PairChooser
                    key={key}
                    label='Base Property Name'
                    field={field}
                    disabled={true}
                />
            ))}
        </div>
        <div className='separator'></div>
        <div className='type-fields'>
            {Object.entries(types.find((t) => t.label === selectedType?.label)?.typeFields || []).map(([key, field]) => (
                <PairChooser 
                    key={key}
                    label='Property Name'
                    field={field}
                    onChange={(newField) => handlePropertyChange(field.name, newField)}
                    onRemove={() => removeField(field.name)}
                />
            ))}
        </div>
        {selectedType?.baseLabel !== '' && <div className='new-field-container'>
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
        </div>}
    </>
  )
}

export default TypeFields