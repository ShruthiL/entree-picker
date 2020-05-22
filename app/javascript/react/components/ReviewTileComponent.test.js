import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter()})

import ReviewTileComponent from './ReviewTileComponent'

describe("ReviewTileComponent", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount (
      <ReviewTileComponent review = {{rating: 4, comments: "Awesome meal!"}}/>
    )
  })

  it('should render a p element', () => {
    expect(wrapper.find('p')).toBeDefined();
  })

  it('should render a p element containing the rating received via props', () => {
    expect(wrapper.find('p').at(0).text()).toEqual("4")
  })

  it('should render a p element containing the rating received via props', () => {
    expect(wrapper.find('p').at(1).text()).toBe('Awesome meal!')
  })
})
