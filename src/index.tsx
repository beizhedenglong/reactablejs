import interact from 'interactjs'
import * as React from 'react'
import { useEffect, useRef } from 'react'

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

export interface InjectedProps {
  getRef: React.Ref<string> | React.LegacyRef<string>;
}
export interface InteractProps {
  draggable?: Interact.DraggableOptions | boolean;
  resizable?: Interact.ResizableOptions | boolean;
  gesturable?: Interact.ResizableOptions | boolean;
  dropzone?: Interact.DropzoneOptions | boolean;
  onDragStart?: Interact.ListenersArg;
  onDragMove?: Interact.ListenersArg;
  onDragEnd?: Interact.ListenersArg;
  onResizeStart?: Interact.ListenersArg;
  onResizeMove?: Interact.ListenersArg;
  onResizeInertiaStart?: Interact.ListenersArg;
  onResizeEnd?: Interact.ListenersArg;
  onGestureStart?: Interact.ListenersArg;
  onGestureMove?: Interact.ListenersArg;
  onGestureEnd?: Interact.ListenersArg;
  onDropActivate?: Interact.ListenersArg;
  onDropdEactivate?: Interact.ListenersArg;
  onDragEnter?: Interact.ListenersArg;
  onDragLeave?: Interact.ListenersArg;
  onDropMove?: Interact.ListenersArg;
  onDrop?: Interact.ListenersArg;
  onDown?: Interact.ListenersArg;
  onMove?: Interact.ListenersArg;
  onUp?: Interact.ListenersArg;
  onCancel?: Interact.ListenersArg;
  onTap?: Interact.ListenersArg;
  onDoubleTap?: Interact.ListenersArg;
  onHold?: Interact.ListenersArg;
}

const reactable = <BaseProps,>(
  BaseComponent: React.ComponentType<BaseProps>
): React.FC<Omit<BaseProps, keyof InjectedProps> & InteractProps> => (props) => {
  const interactable = useRef<Interact.Interactable>(null)
  const node = useRef()

  //Create interactable
  useEffect(() => {
    if (!node.current) {
      console.error(' you should apply getRef props in the dom element') // eslint-disable-line
      return
    }
    interactable.current = interact(node.current)
    return () => interactable.current.unset()
  }, [])

  //Set options
  useEffect(() => {
    if (interactable.current) {
      options.forEach((option) => {
        if (option in props) {
          interactable.current[option](props[option])
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // "props" should be added to the update array. However, this causes infinite rerenders.

  //Set handlers
  useEffect(() => {
    if (interactable.current) {
      events.forEach((event) => {
        const handler = props[`on${event}`]
        if (typeof handler === 'function') {
          interactable.current
            .on(event.toLowerCase(), handler)
        }
      })
      return () => {
        events.forEach((event) => {
          const handler = props[`on${event}`]
          if (typeof handler === 'function') {
            interactable.current
              .off(event.toLowerCase(), handler)
          }
        })
      }
    }
  }, [props])

  const baseProps = (props) => {
    const baseProps = { ...props }
    options.forEach(option => delete baseProps[option])
    events.forEach(event => delete baseProps[`on${event}`])
    return baseProps
  }

  return <BaseComponent
    {...baseProps(props)}
    getRef={node}
  />
}
export default reactable
