# Reactablejs = Reactjs + Interactjs

A react high-order component for [interactjs](https://github.com/taye/interact.js).

Current supported features:
  - drag
  - resize
  - drop
  - multi-touch
  - restrict
  - snap
  - modifiers

Current supported props:
  - options: `draggable` `resizable` `gesturable` `dropzone`.
  - event handlers: `onDragStart` `onDragMove` `onDragInertiaStart` `onDragEnd` `onResizeStart` `onResizeMove` `onResizeInertiaStart` `onResizeEnd` `onGestureStart` `onGestureMove` `onGestureEnd` `onDropActivate` `onDropdEactivate` `onDragEnter` `onDragLeave` `onDropMove` `onDrop` `onDown` `onMove` `onUp` `onCancel` `onTap` `onDoubleTap` `onHold`.


**api details, visit [interactjs' docs](http://interactjs.io/docs/)**

## Installation
> `reactablejs` use `interactjs` as `peerDependencies`, you should also install interactjs.
```
npm install reactablejs interactjs --save
```

## Usage
```js
import React from 'react'
import reactable from 'reactablejs'

const MyComponent = (props) => {
  return <div ref={props.getRef}>
    hello, world!
  </div>
}

// MyComponent will receive getRef in props, put getRef to the element you want interact, then you can use all options and event handlers on Reactable

const Reactable = reactable(MyComponent) 

```
## Example
- visit [storybooks](https://beizhedenglong.github.io/reactablejs/)