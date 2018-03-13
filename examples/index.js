/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import reactable from '../src/index'

const Child = props => (
  <div
    style={{
      color: props.color,
      position: 'relative',
      left: props.coordinate.x,
      top: props.coordinate.y,
      width: props.coordinate.width,
      height: props.coordinate.height,
      background: 'grey'
    }}
    ref={props.getRef}
  >
        hello
  </div>
)

const ReactableChild = reactable(Child)

class App extends React.Component {
  state = {
    x: 0, y: 0, width: 100, height: 100
  }
  doubled = false
  handleMove = (e) => {
    const { dx, dy } = e
    this.setState(state => ({
      x: state.x + dx,
      y: state.y + dy,
    }))
  }
  handleTap = (e) => {
    this.setState(prev => ({
      width: this.doubled ?  prev.width / 2:prev.width * 2,
      height: this.doubled? prev.height / 2:prev.height * 2
    }))
    this.doubled = !this.doubled
  }
  render() {
    return (<ReactableChild
      coordinate={this.state}
      draggable={{}}
      onDragMove={this.handleMove}
      onDoubleTap={this.handleTap}
      color="green"
    />)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
