import { useState } from 'react';
import './AddSubtypeBar.css'
import { useTypes } from '../../../../context/TypesContext';
import type { EntityWithRelations } from '../../../../DTOs/entity/EntityWithRelations';

interface AddSubtypeBarProps {
    onAdd: (selection : string) => void;
    Entity: EntityWithRelations;
}

const AddSubtypeBar: React.FC<AddSubtypeBarProps> = (props : AddSubtypeBarProps) => {
  const [selectedSubtype, setSelectedSubtype] = useState<string>('');
  const { types } = useTypes();

  return (
    <div className='add-new-subtype-bar'>
      <button className='add-subtype-button' onClick={() => props.onAdd(selectedSubtype)}>+</button>
      <select
        value={selectedSubtype !== '' ? selectedSubtype : types[0]?.label}
        onChange={(e) => setSelectedSubtype(e.target.value)}>
        {types
          .filter(type => type.baseLabel === props.Entity.baseType.typeSchemaLabel)
          .filter(type => !props.Entity.subTypes.find(existingSubtype => existingSubtype.typeSchemaLabel === type.label))
          .map((type) => (
          <option key={type.label} value={type.label}>{type.icon + type.label}</option>
        ))}
      </select>
    </div>
  )
}

export default AddSubtypeBar