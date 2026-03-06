import type { Node } from '../Node/Node.types'

interface ArrowProps {
  from: Node
  to: Node
  offset: { x: number; y: number }
}

const Arrow: React.FC<ArrowProps> = ({ from, to, offset }) => {
  const x1 = from.x + offset.x + 50  // approximate node center
  const y1 = from.y + offset.y + 18
  const x2 = to.x + offset.x + 50
  const y2 = to.y + offset.y + 18

  // Control point for a gentle curve
  const cx = (x1 + x2) / 2
  const cy = (y1 + y2) / 2 - 40

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
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
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