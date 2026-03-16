import { useState } from 'react'
import './TableActionsBar.css'

interface TableActionsBarProps {
  selected: string[];
  onDelete: () => void;
  query: string
  onQueryChange: (query: string) => void;
  typeLabels: string[];
  baseTypeLabels: string[];
  selectedTypeFilter: string;
  onTypeFilterChange: (type: string) => void;
  onSearchTrigger: () => void;
  isSearching: boolean;
  onToggleSearch: (isSearching: boolean) => void;
}

const TableActionsBar = ({ onToggleSearch, isSearching, onSearchTrigger, selected, query, onQueryChange, onDelete, typeLabels, baseTypeLabels, selectedTypeFilter, onTypeFilterChange }: TableActionsBarProps) => {
  const [inputValue, setInputValue] = useState<string>(query)

  const handleSubmit = () => {
    onQueryChange(inputValue)
    onSearchTrigger()
  }

  const handleClick = () => {
    if(!isSearching) {
      handleSubmit();
    }

    onToggleSearch(!isSearching);
  }

  return (
    <div className={`table-actions-bar ${(inputValue !== '' || selectedTypeFilter !== '') ? 'search' : ''}`}>
      <button className='delete-button' disabled={selected.length < 1} onClick={onDelete}>x</button>
      <select
        className='type-filter'
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
        onChange={(e) => { setInputValue(e.target.value) ; if (isSearching) handleSubmit()} }
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        className='search-button'
        onClick={handleClick}
        disabled={!isSearching && inputValue === '' && selectedTypeFilter === ''}>
          {isSearching ? '❌' : '🔍'}
      </button>
    </div>
  )
}

export default TableActionsBar