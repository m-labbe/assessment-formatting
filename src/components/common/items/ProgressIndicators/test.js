import React from 'react'
import { mount } from 'enzyme'
import { ProgressIndicator } from 'validity/src/components/common/items/index'

describe('Common: Progress Indicator Components', () => {
  let wrapper = mount(
    <ProgressIndicator itemCount={1} itemLimit={5} itemAnswered={false} />,
  )
  it('Has the calculated width', () => {
    const width = (1 / 5) * 100
    const style = wrapper
      .find('div.progressIndicatorBarCompleteness')
      .prop('style')
    expect(style.width).toBe(`${width}%`)
  })

  it('updates width on nextItem', () => {
    wrapper = mount(
      <ProgressIndicator itemCount={2} itemLimit={5} itemAnswered={false} />,
    )
    const width = (2 / 5) * 100
    const style = wrapper
      .find('div.progressIndicatorBarCompleteness')
      .prop('style')
    expect(style.width).toBe(`${width}%`)
  })

  it('width is the same after item is answered', () => {
    wrapper = mount(
      <ProgressIndicator itemCount={2} itemLimit={5} itemAnswered />,
    )
    const width = (2 / 5) * 100
    const style = wrapper
      .find('div.progressIndicatorBarCompleteness')
      .prop('style')
    expect(style.width).toBe(`${width}%`)
  })
})
