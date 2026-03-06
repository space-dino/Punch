import { useState } from 'react'
import Node from './Node/Node'
import Arrow from './Arrow'
import type { Node as NodeType } from './Node/Node.types'
import './EntityGraph.css'

const INITIAL_NODES: NodeType[] = [
  { id: 'main', label: 'Main Entity', x: 160, y: 160 },
  { id: '1',    label: 'Entity 1',    x: 80,  y: 80  },
  { id: '2',    label: 'Entity 2',    x: 280, y: 80  },
  { id: '3',    label: 'Entity 3',    x: 80,  y: 280 },
  { id: '4',    label: 'Entity 4',    x: 280, y: 280 },
]

const MAIN_NODE_ID = 'main'

const EntityGraph = () => {
  const [nodes, setNodes] = useState<NodeType[]>(INITIAL_NODES)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [canvasDragging, setCanvasDragging] = useState(false)
  const [canvasStart, setCanvasStart] = useState({ x: 0, y: 0 })
  const [draggingNode, setDraggingNode] = useState<string | null>(null)
  const [nodeStart, setNodeStart] = useState({ mx: 0, my: 0, nx: 0, ny: 0 })

  const mainNode = nodes.find(n => n.id === MAIN_NODE_ID)
  const childNodes = nodes.filter(n => n.id !== MAIN_NODE_ID)

  const onCanvasMouseDown = (e: React.MouseEvent) => {
    setCanvasDragging(true)
    setCanvasStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (draggingNode) {
      setNodes(prev => prev.map(n =>
        n.id === draggingNode
          ? { ...n, x: nodeStart.nx + (e.clientX - nodeStart.mx),
                    y: nodeStart.ny + (e.clientY - nodeStart.my) }
          : n
      ))
    } else if (canvasDragging) {
      setOffset({ x: e.clientX - canvasStart.x, y: e.clientY - canvasStart.y })
    }
  }

  const onMouseUp = () => {
    setCanvasDragging(false)
    setDraggingNode(null)
  }

  const onNodeMouseDown = (e: React.MouseEvent, node: NodeType) => {
    e.stopPropagation()
    setDraggingNode(node.id)
    setNodeStart({ mx: e.clientX, my: e.clientY, nx: node.x, ny: node.y })
  }

  return (
    <div
      className='entity-graph'
      onMouseDown={onCanvasMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        backgroundPosition: `${offset.x}px ${offset.y}px`,
        cursor: canvasDragging ? 'grabbing' : 'grab',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        {mainNode && childNodes.map(child => (
          <Arrow
            key={child.id}
            from={mainNode}
            to={child}
            offset={offset}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          offset={offset}
          isDragging={draggingNode === node.id}
          onMouseDown={onNodeMouseDown}
        />
      ))}
    </div>
  )
}

export default EntityGraph