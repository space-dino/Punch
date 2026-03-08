import React from 'react'
import './TypeEditor.css'
import PairChooser from '../PairChooser/PairChooser'
import { useTypes } from '../context/TypesContext';
import { EntityTypeSchema } from '../DTOs/entity/entityType/EntityTypeSchema';
import { useParams } from 'react-router';

interface TypeEditorProps {
}

const TypeEditor : React.FC<TypeEditorProps> = (props : TypeEditorProps) => {
    const { types, setTypes } = useTypes();

    const params = useParams<{ id: string }>();
    const selectedType = types.find(e => e.label === params.id);

    const handlePropertyChange = (key: string, newValue: string) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(e.label, e.icon, { ...e.typeFields, [key]: newValue })
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
                label={field.name}
                value={field.name}
                disabled={true}
            />
        ))}
    </div>
  )
}

export default TypeEditor