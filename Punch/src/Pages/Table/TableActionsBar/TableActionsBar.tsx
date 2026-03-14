import React from 'react'
import './TableActionsBar.css'

const TableActionsBar = () => {
  return (
    <div className='table-actions-bar'>
      <button>x</button>
      <input className='search-bar' placeholder='Search...' />
    </div>
  )
}

export default TableActionsBar