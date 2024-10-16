/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {shallow} from 'enzyme';
import {Slider, Text, FormSlider} from '@axelor/aos-mobile-ui';

describe('FormSlider Component', () => {
  const props = {
    title: 'Volume',
    minValue: 0,
    maxValue: 100,
    defaultValue: 50,
    onChange: jest.fn(),
    displaySliderValue: true,
    step: 10,
    readOnly: false,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<FormSlider {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the title correctly', () => {
    const wrapper = shallow(<FormSlider {...props} />);
    const titleText = wrapper.find(Text).first();
    expect(titleText.props().children).toBe(props.title);
  });

  it('should pass correct props to Slider component', () => {
    const wrapper = shallow(<FormSlider {...props} />);
    const sliderComponent = wrapper.find(Slider);

    expect(sliderComponent.prop('minValue')).toBe(props.minValue);
    expect(sliderComponent.prop('maxValue')).toBe(props.maxValue);
    expect(sliderComponent.prop('defaultValue')).toBe(props.defaultValue);
    expect(sliderComponent.prop('displaySliderValue')).toBe(
      props.displaySliderValue,
    );
    expect(sliderComponent.prop('step')).toBe(props.step);
    expect(sliderComponent.prop('disabled')).toBe(props.readOnly);
  });

  it('should handle value changes correctly', () => {
    const wrapper = shallow(<FormSlider {...props} />);
    const sliderComponent = wrapper.find(Slider);

    sliderComponent.simulate('change', 60);
    expect(props.onChange).toHaveBeenCalledWith(60);
  });

  it('should render as read-only when readOnly is true', () => {
    const readOnlyProps = {
      ...props,
      readOnly: true,
    };
    const wrapper = shallow(<FormSlider {...readOnlyProps} />);
    const sliderComponent = wrapper.find(Slider);

    expect(sliderComponent.prop('disabled')).toBe(true);
  });

  it('should render with custom styles', () => {
    const customStyle = {
      margin: 20,
    };
    const wrapper = shallow(<FormSlider {...props} style={customStyle} />);

    expect(wrapper.find('View').first().prop('style')).toContainEqual(
      customStyle,
    );
  });
});
