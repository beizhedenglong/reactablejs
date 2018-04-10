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

function getDisplayName(BaseComponent) {
  return BaseComponent.displayName || BaseComponent.name || 'Component'
}

const reactable = BaseComponent =>
  class Reactable extends Component {
    static displayName = `reactable(${getDisplayName(BaseComponent)})`

    // componentDidMount of parent is called after all his chidren is mounted
    componentDidMount() {
      if (!this.node) {
        console.error(' you should apply getRef props in the dom element') // eslint-disable-line
        return
      }
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
