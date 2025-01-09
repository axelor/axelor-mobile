/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {Slider, Text, FormSlider} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('FormSlider Component', () => {
  const props = {
    title: 'Volume',
    minValue: 0,
    maxValue: 100,
    step: 10,
    defaultValue: 50,
    onChange: jest.fn(),
    readonly: false,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<FormSlider {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render the title correctly', () => {
    const wrapper = shallow(<FormSlider {...props} />);

    expect(wrapper.find(Text).first().prop('children')).toBe(props.title);
  });

  it('should pass correct props to Slider component', () => {
    const wrapper = shallow(<FormSlider {...props} />);
    const sliderComponent = wrapper.find(Slider);

    expect(sliderComponent.props()).toMatchObject({
      minValue: props.minValue,
      maxValue: props.maxValue,
      defaultValue: props.defaultValue,
      step: props.step,
      disabled: props.readonly,
    });
  });

  it('should handle value changes correctly', () => {
    const wrapper = shallow(<FormSlider {...props} />);
    const sliderComponent = wrapper.find(Slider);

    sliderComponent.simulate('change', 60);
    expect(props.onChange).toHaveBeenCalledWith(60);
  });

  it('should render as read-only when readonly is true', () => {
    const wrapper = shallow(<FormSlider {...props} readonly />);

    expect(wrapper.find(Slider).prop('disabled')).toBe(true);
  });

  it('should render with custom styles', () => {
    const customStyle = {margin: 20};
    const wrapper = shallow(<FormSlider {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View).first())).toMatchObject(
      customStyle,
    );
  });
});
