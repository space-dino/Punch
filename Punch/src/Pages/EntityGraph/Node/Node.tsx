import React, {useState} from 'react'
import './Node.css'
import type { Node as NodeType } from './Node.types'
import configuration from '../../../configuration.json'
import RelationEditor from './RelationEditor/RelationEditor'

interface NodeProps {
  node: NodeType
  offset: { x: number; y: number }
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent, node: NodeType) => void
  style?: React.CSSProperties
}

const Node: React.FC<NodeProps> = ({ node, offset, isDragging, onMouseDown, style }) => {
  return (
    <div
      className={`node ${isDragging ? 'node--dragging' : ''}`}
      style={{
        left: node.x + offset.x,
        top:  node.y + offset.y,
        ...style,
      }}
    >
      <div className='node__handle' onMouseDown={(e) => onMouseDown(e, node)}>
        <h3>{node.label}</h3>
      </div>
      
      <div className='node__content'>
        {Object.entries(node.data.fieldValues)
          .filter(([key]) => !configuration.tableFilter.includes(key))
          .map(([key, value]) => (
            <>
              <p className='field-name' key={`${key}-name`}>{key}</p>
              <p className='field-value' key={`${key}-value`}>{String(value)}</p>
            </>
          ))
        }
      </div>

      {Object.entries(node.data.fieldValues)
        .filter(([key]) => configuration.tableFilter.includes(key))
        .map(([key, value]) => (
          <p className='filtered' key={key}>{key}: <b>{String(value)}</b></p>
      ))}

      {node.id === 'main' &&
        <RelationEditor nodeId={node.id}/>
      }
    </div>
  )
}

export default Node