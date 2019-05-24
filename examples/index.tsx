import * as React from 'react'
import * as ReactDOM from 'react-dom'
import reactable from '../src/index'

interface State {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
}

interface ChildProps extends State {
  getRef: React.RefObject<HTMLDivElement>;
}

const Child = (props: ChildProps) => (
  <div
    style={{
      fontSize: '30px',
      position: 'relative',
      left: props.x,
      top: props.y,
      width: props.width,
      height: props.height,
      background: 'grey',
      transform: `rotate(${props.angle}deg)`,
    }}
    ref={props.getRef}
  >
      Reactable is a react hight-order component for interactjs.
  </div>
)

const ReactableChild = reactable(Child)

class App extends React.Component<{}, State> {
  state = {
    x: 0,
    y: 0,
    width: 400,
    height: 400,
    angle: 0,
  }
  doubled = false
  handleDragMove = (e) => {
    const { dx, dy } = e
    this.setState(state => ({
      x: state.x + dx,
      y: state.y + dy,
    }))
  }
  handleDoubleTap = (e) => {
    this.setState(prev => ({
      width: this.doubled ? prev.width / 2 : prev.width * 2,
      height: this.doubled ? prev.height / 2 : prev.height * 2,
    }))
    this.doubled = !this.doubled
  }
  handleGestureMove = (e) => {
    const { da } = e
    this.setState(state => ({
      angle: state.angle + da
    }))
  }
  handleResizeMove = (e) => {
    const { width, height } = e.rect
    const { left, top } = e.deltaRect
    this.setState(state => {
      return {
        x: state.x + left,
        y: state.y + top,
        width,
        height
      }
    })
  }
  render() {
    return (
      <div>
        <h1>Reactable Component </h1>
        <h2>view source code: <a href="https://github.com/beizhedenglong/reactablejs">github</a></h2>
        <h2>Playground:(interact with the grey div blew)</h2>
        <ul>
          <li>Drag to change position</li>
          <li>Double Tap to change size</li>
          <li>Drag edges to resize</li>
          <li>Multi-touch:Rotate(on your mobile device) to change angle</li>
        </ul>
        <ReactableChild
          draggable
          gesturable
          resizable={{
            edges: { left: true, right: true, bottom: true, top: true },
          }}
          onDragMove={this.handleDragMove}
          onDoubleTap={this.handleDoubleTap}
          onGestureMove={this.handleGestureMove}
          onResizeMove={this.handleResizeMove}
          {...this.state}
        />
      </div> 
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("root")
)
