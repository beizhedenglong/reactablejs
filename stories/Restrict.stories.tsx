import * as React from 'react'
import { storiesOf } from '@storybook/react'
import interact from 'interactjs'
import reactable from "../src"
import Demo from "./Demo"

const Reactable = reactable(Demo)

const RestrictDemo = () => {
  const [coordinate, setCoordinate] = React.useState({ x: 0, y: 0, width: 300, height: 200 })
  return (
    <div
      style={{
        width: 500,
        height: 500,
        border: "1px solid black",
        position: "absolute"
      }}
    >
      <Reactable
        draggable={{
          onmove: (event) =>  {
            setCoordinate(prev => ({
              ...prev,
              x: prev.x + event.dx,
              y: prev.y + event.dy,
            }))
          },
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })
          ],
        }}
        resizable={{
          edges: { left: true, right: true, bottom: true, top: true },
          onmove: (e) => {
            const { width, height } = e.rect
            const { left, top } = e.deltaRect
            setCoordinate(prev => {
              return {
                x: prev.x + left,
                y: prev.y + top,
                width,
                height
              }
            })
          },
          modifiers: [
            interact.modifiers.restrictEdges({
              outer: 'parent',
              endOnly: true
            }),
          ]
        }}
        {...coordinate}
      />
    </div>
  )
}

storiesOf('Restrict', module)
  .add('basic', () => <RestrictDemo />)
