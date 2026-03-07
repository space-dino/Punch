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
        {node.label}
      </div>
      <button>hello</button>
    </div>
  )
}

export default Node