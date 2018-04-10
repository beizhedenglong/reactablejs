/* eslint-disable react/prop-types */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import reactable from '../src/index'

Enzyme.configure({ adapter: new Adapter() })

const MyComponent = props => <div ref={props.getRef}>test</div>
const ReactableComponent = reactable(MyComponent)


describe('reactable', () => {
  const clickMock = jest.fn()

  const wrapper = mount(<ReactableComponent onClick={clickMock} />)
  test('getRef is function', () => {
    expect(wrapper.find(MyComponent).prop('getRef')).toBeInstanceOf(Function)
  })
  test('node reference', () => {
    expect(wrapper.instance().node).toBe(wrapper.find('div').instance())
  })

  test('other props', () => {
    expect(wrapper.find(MyComponent).prop('onClick')).toBe(clickMock)
  })
})

