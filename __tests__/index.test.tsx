import * as React from "react"
import reactable from "../src/index"
import { render, fireEvent } from "react-testing-library"

interface Props {
  getRef: React.RefObject<HTMLDivElement>;
}


const MyComponent = (props: Props) => <div ref={props.getRef}>test</div>
const ReactableComponent = reactable(MyComponent)

test("reactable", () => {
  const downMock = jest.fn()
  const {  getByText } = render(
    <ReactableComponent 
      draggable
      onDown={downMock}
    />
  )

  
  const div = getByText(/test/)
  fireEvent.mouseDown(div)
  expect(downMock).toBeCalled()
})