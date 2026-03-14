import React from 'react'
import './TableActionsBar.css'

interface TableActionsBarProps {
  selected: string[];
  onDelete: () => void;
}

const TableActionsBar = (props: TableActionsBarProps) => {
  return (
    <div className='table-actions-bar'>
      <button disabled={props.selected.length < 1} onClick={props.onDelete}>x</button>
      <input className='search-bar' placeholder='Search...' />
    </div>
  )
}

export default TableActionsBar