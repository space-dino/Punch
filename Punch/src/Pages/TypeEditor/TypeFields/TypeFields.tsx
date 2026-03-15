import './TypeFields.css'
import PairChooser from '../../../Components/PairChooser/PairChooser'
import { useTypes } from '../../../context/TypesContext';
import type { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema';
import type { Field } from '../../../DTOs/entity/entityType/field/Field';

interface TypeFieldsProps {
  selectedType: EntityTypeSchema | undefined;
  draft: Field;
  setDraft: (field: Field) => void;
  handlePropertyChange: (key: string, field: Field) => void;
  removeField: (key: string) => void;
  addNewField: () => void;
}

const TypeFields: React.FC<TypeFieldsProps> = ({
  selectedType, draft, setDraft, handlePropertyChange, removeField, addNewField
}) => {
  const { types, baseTypes } = useTypes();

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