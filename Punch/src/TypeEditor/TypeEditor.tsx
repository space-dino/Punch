import React from 'react'
import './TypeEditor.css'
import PairChooser from '../PairChooser/PairChooser'
import { useTypes } from '../context/TypesContext';
import { EntityTypeSchema } from '../DTOs/entity/entityType/EntityTypeSchema';
import { useParams } from 'react-router';
import { Field } from '../DTOs/entity/entityType/field/Field';

interface TypeEditorProps {
}

const TypeEditor : React.FC<TypeEditorProps> = (props : TypeEditorProps) => {
    const { types, setTypes } = useTypes();

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

  return (
    <div className='type-editor'>
        <h2>{selectedType ? selectedType.label : 'New Type'}</h2>
        {Object.entries(selectedType !== undefined ? selectedType.typeFields : []).map(([key, field]) => (
            <PairChooser 
                key={key}
                label='Property Name'
                field={field}
                disabled={false}
                onChange={(newField) => handlePropertyChange(field.name, newField)}
            />
        ))}
    </div>
  )
}

export default TypeEditor