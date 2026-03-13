import type { Node as NodeType } from './Node/Node.types'

interface ArrowProps {
  from: NodeType
  to: NodeType
  offset: { x: number; y: number }
}

// Get all 4 edge midpoints of a node
const getEdges = (node: NodeType, offset: { x: number; y: number }) => {
  const x = node.x + offset.x
  const y = node.y + offset.y

  return {
    top:    { x: x + node.width / 2,  y: y, weight: 1 },
    bottom: { x: x + node.width / 2,  y: y + node.height, weight: 1 },
    left:   { x: x,                   y: y + node.height / 2, weight: 1.3 },
    right:  { x: x + node.width,      y: y + node.height / 2, weight: 1.3 },
  }
}

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)

const OPPOSITE: Record<string, string> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

const getClosestEdges = (
  from: NodeType,
  to: NodeType,
  offset: { x: number; y: number }
) => {
  const fromEdges = getEdges(from, offset);
  const toEdges   = getEdges(to, offset);

  let minDist = Infinity;
  let best = { start: fromEdges.right, end: toEdges.left };

  for (const [fKey, fPoint] of Object.entries(fromEdges)) {
    for (const [tKey, tPoint] of Object.entries(toEdges)) {
      const isOpposite = OPPOSITE[fKey] === tKey;
      const oppositeBonus = isOpposite ? 10 : 1;

      const d = distance(fPoint, tPoint) / (fPoint.weight * tPoint.weight * oppositeBonus);
      if (d < minDist) {
        minDist = d;
        best = { start: fPoint, end: tPoint };
      }
    }
  }

  return best
}

const Arrow: React.FC<ArrowProps> = ({ from, to, offset }) => {
  const { start, end } = getClosestEdges(from, to, offset)

  const cx = (start.x + end.x) / 2
  const cy = (start.y + end.y) / 2 - 30

  return (
    <g>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#e85d4a" opacity={0.7} />
        </marker>
      </defs>
      <path
        d={`M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`}
        fill="none"
        stroke="#e85d4a"
        strokeWidth={1.5}
        strokeOpacity={0.4}
        markerEnd="url(#arrowhead)"
      />
    </g>
  )
}

export default Arrow