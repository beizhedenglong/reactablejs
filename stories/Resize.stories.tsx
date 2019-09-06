import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import reactable from "../src"
import Demo from "./Demo"

const Reactable = reactable(Demo)


const ResizeDemo = () => {
  const [coordinate, setCoordinate] = React.useState({ x: 0, y: 0,width: 300, height: 200 })
  return (
    <Reactable
      resizable={{
        edges: { left: true, right: true, bottom: true, top: true },
      }}
      onResizeMove={(e) => {
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
      }}
      {...coordinate}
    />
  )
}

storiesOf('Resize', module)
  .add('basic', () => <ResizeDemo />)
