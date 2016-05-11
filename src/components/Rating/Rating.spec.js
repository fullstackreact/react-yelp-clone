import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import Rating from './Rating'
import styles from './styles.module.css';

describe('<Rating />', function () {
  it('fills the percentage as style', () => {
    let wrapper = shallow(<Rating percentage={0.10} />)
    expect(wrapper.find(`.${styles.top}`))
      .to.have.style('width', '10%')
    wrapper = shallow(<Rating percentage={0.99} />)
    expect(wrapper.find(`.${styles.top}`))
      .to.have.style('width', '99%')
  });

  it('renders bottom and top star meters', () => {
    let wrapper = shallow(<Rating percentage={0.99} />)
    expect(wrapper.find(`.${styles.top}`)).to.be.present;
    expect(wrapper.find(`.${styles.bottom}`)).to.be.present;
  })

});
