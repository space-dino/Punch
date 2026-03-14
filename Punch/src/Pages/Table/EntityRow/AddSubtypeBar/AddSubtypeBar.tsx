import { EntityTypeSchema } from '../../../../DTOs/entity/entityType/EntityTypeSchema'
import './AddSubtypeBar.css'

interface AddSubtypeBarProps {
  types: EntityTypeSchema[];
  selectedType: string;
  onSelectType: (label: string) => void;
  onAdd: () => void;
}

const AddSubtypeBar: React.FC<AddSubtypeBarProps> = ({ types, selectedType, onSelectType, onAdd }) => {
  return (
    <div className='add-new-subtype-bar'>
      <button className='add-subtype-button' onClick={onAdd}>+</button>
      <select value={selectedType} onChange={(e) => onSelectType(e.target.value)}>
        {types.map((type) => (
          <option key={type.label} value={type.label}>{type.label}</option>
        ))}
      </select>
    </div>
  )
}

export default AddSubtypeBar