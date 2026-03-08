import React from 'react'
import './Node.css'
import type { Node as NodeType } from './Node.types'

interface NodeProps {
  node: NodeType
  offset: { x: number; y: number }
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent, node: NodeType) => void
}

const Node: React.FC<NodeProps> = ({ node, offset, isDragging, onMouseDown }) => {
  return (
    <div
      className={`node ${isDragging ? 'node--dragging' : ''}`}
      style={{
        left: node.x + offset.x,
        top:  node.y + offset.y,
      }}
    >
      <div className='node__handle' onMouseDown={(e) => onMouseDown(e, node)}>
        <h3>{node.label}</h3>
        {Object.entries(node.data.fieldValues).map(([key, value]) => (
          <p key={key}>{key}: {String(value)}</p>
        ))}
      </div>
      <button>hello</button>
    </div>
  )
}

export default Node