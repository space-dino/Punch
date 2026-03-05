import React from 'react'
import './TypeEditor.css'
import PairChooser from '../PairChooser/PairChooser'
import { useTypes } from '../TypesContext/TypesContext';

interface TypeEditorProps {
}

const TypeEditor : React.FC<TypeEditorProps> = (props : TypeEditorProps) => {
  const { types } = useTypes();

  return (
    <div className='type-editor'>
        <h2>Type Editor</h2>
        {Object.entries(types[0].baseProperties).map(([key, value]) => (
            <PairChooser 
                key={key}
                label={key}
                value={value}
            />
        ))}
        <p>-----------------------------</p>
        {Object.entries(types[0].properties).map(([key, value]) => (
            <PairChooser 
                key={key}
                label={key}
                value={value}
            />
        ))}
    </div>
  )
}

export default TypeEditor