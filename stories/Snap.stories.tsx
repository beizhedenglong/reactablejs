import * as React from 'react'
import { storiesOf } from '@storybook/react'
import interact from "interactjs"
import reactable from "../src"
import Demo from "./Demo"

const Reactable = reactable(Demo)

const SnapDemo = () => {
  const [coordinate, setCoordinate] = React.useState({ x: 0, y: 0 })
  return (
    <Reactable
      draggable={{
        onmove: (event) => setCoordinate(prev => ({
          x: prev.x + event.dx,
          y: prev.y + event.dy
        })),
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.createSnapGrid({ x: 40, y: 40 } as any) as any
            ],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
          }),
        ]
      }}
      {...coordinate}
    />
  )
}

storiesOf('Snap', module)
  .add('basic', () => <SnapDemo />)