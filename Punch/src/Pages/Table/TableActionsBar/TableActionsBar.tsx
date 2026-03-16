import { useState } from 'react'
import './TableActionsBar.css'
import type { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema';

interface TableActionsBarProps {
  selected: string[];
  onDelete: () => void;
  query: string
  onQueryChange: (query: string) => void;
  typeLabels: string[];
  baseTypeLabels: string[];
  selectedTypeFilter: string;
  onTypeFilterChange: (type: string) => void;
}

const TableActionsBar = ({ selected, query, onQueryChange, onDelete, typeLabels, baseTypeLabels, selectedTypeFilter, onTypeFilterChange }: TableActionsBarProps) => {
  const [inputValue, setInputValue] = useState<string>(query)

  const handleSubmit = () => {
    onQueryChange(inputValue)
  }

  return (
    <div className='table-actions-bar'>
      <button className='delete-button' disabled={selected.length < 1} onClick={onDelete}>x</button>
      <select
        className='basetype-select'
        value={selectedTypeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
      >
        <option key={''} value={''}>---</option>
        {baseTypeLabels.map((baseType) => (
          <option key={baseType} value={baseType}>{baseType}</option>
        ))}
        {typeLabels.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <input
        className='search-bar'
        placeholder='Search...'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button className='search-button' onClick={handleSubmit}>🔍</button>
    </div>
  )
}

export default TableActionsBar