import React from 'react'
import styles from './Node.module.css'
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
      className={`${styles.node} ${isDragging ? styles.nodeDragging : ''}`}
      onMouseDown={(e) => onMouseDown(e, node)}
      style={{
        left: node.x + offset.x,
        top:  node.y + offset.y,
      }}
    >
      {node.label}
    </div>
  )
}

export default Node