import interact from 'interactjs/src/index'
import React, { Component } from 'react'

const options = [
  'draggable',
  'resizable',
  'gesturable',
  'dropzone',
]
const events = [
  // Interact Events
  'DragStart',
  'DragMove',
  'DragInertiaStart',
  'DragEnd',
  'ResizeStart',
  'ResizeMove',
  'ResizeInertiaStart',
  'ResizeEnd',
  'GestureStart',
  'GestureMove',
  'GestureEnd',
  // Drop Events
  'DropActivate',
  'DropdEactivate',
  'DragEnter',
  'DragLeave',
  'DropMove',
  'Drop',
  // Pointer Events
  'Down',
  'Move',
  'Up',
  'Cancel',
  'Tap',
  'DoubleTap',
  'Hold',
]

const reactable = BaseComponent =>
  class extends Component {
    // componentDidMount of parent is called after all his chidren is mounted
    componentDidMount() {
      this.interactable = interact(this.node)
      options.forEach((option) => {
        if (option in this.props) {
          this.interactable[option](this.props[option])
        }
      })
      events.forEach((event) => {
        const handler = this.props[`on${event}`]
        if (typeof handler === 'function') {
          this.interactable
            .on(event.toLowerCase(), handler)
        }
      })
    }
    componentWillUnmount() {
      this.interactable.unset()
    }
    baseProps = (props) => {
      const baserProps = { ...props }
      options.map(option => delete baserProps[option])
      events.map(event => delete baserProps[`on${event}`])
      return baserProps
    }
    render() {
      return (<BaseComponent
        {...this.baseProps(this.props)}
        getRef={node => this.node = node}
      />)
    }
  }

export default reactable
