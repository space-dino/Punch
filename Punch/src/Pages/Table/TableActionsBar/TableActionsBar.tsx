import { useState } from 'react'
import './TableActionsBar.css'

interface TableActionsBarProps {
  selected: string[];
  onDelete: () => void;
  query: string
  onQueryChange: (query: string) => void
}

const TableActionsBar = ({ selected, query, onQueryChange, onDelete }: TableActionsBarProps) => {
  const [inputValue, setInputValue] = useState<string>(query)

  const handleSubmit = () => {
    onQueryChange(inputValue)
  }

  return (
    <div className='table-actions-bar'>
      <button className='delete-button' disabled={selected.length < 1} onClick={onDelete}>x</button>
      <input
        className='search-bar'
        placeholder='Search...'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  )
}

export default TableActionsBar