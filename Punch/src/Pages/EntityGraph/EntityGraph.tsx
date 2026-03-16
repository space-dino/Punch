import { useState, useEffect } from 'react'
import Node from './Node/Node'
import Arrow from './Arrow'
import './EntityGraph.css'
import type { Node as NodeType } from './Node/Node.types'
import { useEntities } from '../../context/EntitiesContext'
import { EntityWithRelations } from '../../DTOs/entity/EntityWithRelations'
import { useParams } from 'react-router'
import { useTypes } from '../../context/TypesContext'
import type { EntityTypeSchema } from '../../DTOs/entity/entityType/EntityTypeSchema'

const nodeCenterOffset = { x: 50, y: 50 };

const buildNodes = (entity: EntityWithRelations, baseTypes: EntityTypeSchema[], types: EntityTypeSchema[]): NodeType[] => {
  const cx = 200;
  const cy = 200;
  const radius = 300;

  const baseTypeSchema : EntityTypeSchema | undefined = baseTypes.find((type) => type.label === entity.baseType.typeSchemaLabel);
  const childsAmount = entity.subTypes.length + entity.relations.length;

  const subtypes: NodeType[] = entity.subTypes.map((subtype, i) => {
    let angle = (2 * Math.PI * i) / childsAmount - Math.PI / 2 + 45 * Math.PI / 180;
    const subTypeSchema : EntityTypeSchema | undefined = types.find((type) => type.label === subtype.typeSchemaLabel);

    return {
      id: subtype.typeSchemaLabel,
      label: subtype.typeSchemaLabel + subTypeSchema?.icon,
      data: subtype,
      x: cx + radius * Math.cos(angle) - nodeCenterOffset.x,
      y: cy + radius * Math.sin(angle) - nodeCenterOffset.y,
      width: 240,
      height: 240,
    }
  })

  const relations: NodeType[] = entity.relations.map((relation, i) => {
    let angle = (2 * Math.PI * (i + entity.subTypes.length)) / childsAmount - Math.PI / 2 + 45 * Math.PI / 180;

    return {
      id: relation.target.entityId,
      label: relation.type,
      data: relation,
      x: cx + radius * 0.8 * Math.cos(angle) - nodeCenterOffset.x,
      y: cy + radius * 0.8 * Math.sin(angle) - nodeCenterOffset.y,
      width: 160,
      height: 100,
    }
  })

  const relationTargets: NodeType[] = entity.relations.map((relation, i) => {
    let angle = (2 * Math.PI * (i + entity.subTypes.length)) / childsAmount - Math.PI / 2 + 45 * Math.PI / 180;

    return {
      id: 'relationTarget' + relation.target.entityId,
      label: relation.target.baseType.typeSchemaLabel,
      data: relation.target.baseType,
      x: cx + radius * 1.5 * Math.cos(angle) - nodeCenterOffset.x,
      y: cy + radius * 1.5 * Math.sin(angle) - nodeCenterOffset.y,
      width: 240,
      height: 240,
      relationId: relation.type
    }
  })

  return [
    { id: 'main',
      label: entity.baseType.typeSchemaLabel + baseTypeSchema?.icon,
      data: entity.baseType,
      x: cx - nodeCenterOffset.x,
      y: cy - nodeCenterOffset.y,
      width: 240,
      height: 240 },
    ...subtypes, ...relationTargets
  ]
}

const EntityGraph = () => {
  const { entities } = useEntities();
  const { types, baseTypes } = useTypes();

  const params = useParams<{ id: string }>();
  const selectedEntity = entities.find(e => e.entityId === params.id);

  const [nodes, setNodes] = useState<NodeType[]>(
    selectedEntity ? buildNodes(selectedEntity, baseTypes, types) : []
  );
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [canvasDragging, setCanvasDragging] = useState(false);
  const [canvasStart, setCanvasStart] = useState({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [nodeStart, setNodeStart] = useState({ mx: 0, my: 0, nx: 0, ny: 0 });

  useEffect(() => {
    if (selectedEntity) setNodes(buildNodes(selectedEntity, baseTypes, types))
  }, [selectedEntity]);

  const mainNode = nodes.find(n => n.id === 'main');
  const relationTargetNodes = nodes.filter(n => n.id.includes('relationTarget'));
  const childNodes = nodes.filter(n => n.id !== 'main' && !n.id.includes('relationTarget'));

  const onCanvasMouseDown = (e: React.MouseEvent) => {
    setCanvasDragging(true)
    setCanvasStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (draggingNode) {
      setNodes(prev => prev.map(n =>
        n.id === draggingNode
          ? {
            ...n, x: nodeStart.nx + (e.clientX - nodeStart.mx),
            y: nodeStart.ny + (e.clientY - nodeStart.my)
          }
          : n
      ))
    } else if (canvasDragging) {
      setOffset({ x: e.clientX - canvasStart.x, y: e.clientY - canvasStart.y })
    }
  };

  const onMouseUp = () => {
    setCanvasDragging(false)
    setDraggingNode(null)
  };

  const onNodeMouseDown = (e: React.MouseEvent, node: NodeType) => {
    e.stopPropagation()
    setDraggingNode(node.id)
    setNodeStart({ mx: e.clientX, my: e.clientY, nx: node.x, ny: node.y })
  };

  const nodeDimensions = (node : NodeType) => {
    return {
      'width' : node.width - 20,
      'height' : node.height - 20
    }
  }

  if (!selectedEntity) return <div className='entity-graph'>No entity selected</div>

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
      <svg style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', overflow: 'visible',
      }}>
        {mainNode && childNodes.map(child => (
          <Arrow key={child.id} from={mainNode} to={child} offset={offset} />
        ))}
        {mainNode && relationTargetNodes.map(target => (
          <Arrow key={target.id} from={mainNode} to={target} offset={offset} label={target.relationId} />
        ))}
      </svg>

      {nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          offset={offset}
          isDragging={draggingNode === node.id}
          onMouseDown={onNodeMouseDown}
          style={nodeDimensions(node)}
        />
      ))}
    </div>
  )
}

export default EntityGraph