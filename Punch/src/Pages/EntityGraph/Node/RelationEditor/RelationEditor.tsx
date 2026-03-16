import React, { useState } from 'react'
import './RelationEditor.css'

const RelationEditor = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <>
        <button className='new-relation' onClick={() => setIsOpen(!isOpen)}>+</button>

        <div className={`relation-editor ${isOpen ? 'open' : ''}`}></div>   
    </>
  )
}

export default RelationEditor