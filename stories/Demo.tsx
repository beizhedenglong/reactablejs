import * as React from 'react'

export interface DemoProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  angle?: number;
  getRef: React.Ref<HTMLDivElement>;
}

const Demo = (props: DemoProps) => {
  const { getRef, x, y, angle, width, height } = props
  return (
    <div
      style={{
        position: 'relative',
        left: x,
        top: y,
        width: width,
        height: height,
        transform: `rotate(${angle}deg)`,
        border: "1px solid black",
        boxSizing: "border-box"
      }}
      ref={getRef}
    >
      Reactable is a react hight-order component for interactjs.
      <ul>
        <li>left: {x}</li>
        <li>top: {y}</li>
        <li>width: {width}</li>
        <li>height: {height}</li>
      </ul>
    </div>
  )
}

Demo.defaultProps = {
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  angle: 0
}

export default Demo
