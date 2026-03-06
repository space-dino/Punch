import React from 'react'
import './TypeEditor.css'
import PairChooser from '../PairChooser/PairChooser'
import { useTypes } from '../context/TypesContext';
import { EntityType } from '../Objects/EntityType';
import { useParams } from 'react-router';

interface TypeEditorProps {
}

const TypeEditor : React.FC<TypeEditorProps> = (props : TypeEditorProps) => {
    const { types, setTypes } = useTypes();

    const params = useParams<{ id: string }>();
    const selectedType = types.find(e => e._id === params.id);

    const handlePropertyChange = (key: string, newValue: string) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e._id === selectedType._id
                ? new EntityType(e.name, e._id, e.baseType, e.baseProperties, { ...e.properties, [key]: newValue }, e.icon)
                : e
            ))
        }
    }

  return (
    <div className='type-editor'>
        <h2>{selectedType ? selectedType.name : 'New Type'}</h2>
        {Object.entries(selectedType !== undefined ? selectedType.baseProperties : []).map(([key, value]) => (
            <PairChooser 
                key={key}
                label={key}
                value={value}
                disabled={true}
            />
        ))}
        <p>-----------------------------</p>
        {Object.entries(selectedType !== undefined ? selectedType.properties : []).map(([key, value]) => (
            <PairChooser 
                key={key}
                label={key}
                value={value}
                onChange={(newValue) => handlePropertyChange(key, newValue)}
            />
        ))}
    </div>
  )
}

export default TypeEditor