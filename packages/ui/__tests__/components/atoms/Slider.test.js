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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import RNSlider from '@react-native-community/slider';
import {Slider, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('Slider Component', () => {
  const props = {
    minValue: 0,
    maxValue: 100,
    minLimit: 0,
    maxLimit: 100,
    step: 10,
    defaultValue: 50,
    onChange: jest.fn(),
    disabled: false,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Slider {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render RNSlider with correct props', () => {
    const wrapper = shallow(<Slider {...props} />);
    const rnSlider = wrapper.find(RNSlider);

    expect(rnSlider.props()).toMatchObject({
      minimumValue: props.minValue,
      maximumValue: props.maxValue,
      lowerLimit: props.minLimit,
      upperLimit: props.maxLimit,
      step: props.step,
      value: props.defaultValue,
    });
  });

  it('should render steps only if displayStepNumber is true', () => {
    const step = 10;
    const minValue = 0;
    const maxValue = 100;
    const wrapper = shallow(
      <Slider
        {...props}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        displayStepNumber={true}
      />,
    )
      .find(View)
      .at(2);

    expect(wrapper.exists()).toBe(true);

    const expectedSteps = Math.floor((maxValue - minValue) / step) + 1;
    expect(wrapper.find(Text).length).toBe(expectedSteps);
  });

  it('should not render steps when there are too many', () => {
    const wrapper = shallow(
      <Slider {...props} minValue={0} maxValue={100} step={5} />,
    );

    expect(wrapper.find(View).at(2).find(Text).length).toBe(0);
  });

  it('should update the value when the slider value changes', () => {
    const wrapper = shallow(<Slider {...props} />);
    const sliderComponent = wrapper.find(RNSlider);

    sliderComponent.simulate('valueChange', 60);

    expect(wrapper.find(RNSlider).prop('value')).toBe(60);
  });

  it('should call the onChange prop when sliding completes', () => {
    const wrapper = shallow(<Slider {...props} />);
    const sliderComponent = wrapper.find(RNSlider);

    sliderComponent.simulate('slidingComplete', 70);
    expect(props.onChange).toHaveBeenCalledWith(70);
  });

  it('should display the slider value only if displaySliderValue is true', () => {
    const findValueText = node => node.prop('style')?.textAlign === 'right';

    const noValueWrapper = shallow(
      <Slider {...props} displaySliderValue={false} />,
    );
    const sliderText = noValueWrapper.findWhere(findValueText);

    expect(sliderText.exists()).toBe(false);

    const wrapper = shallow(<Slider {...props} displaySliderValue={true} />);
    const sliderValueText = wrapper.findWhere(findValueText);

    expect(sliderValueText.exists()).toBe(true);

    expect(sliderValueText.children().text()).toBe('50.00');
  });

  it('should disable the slider when needed', () => {
    const disabledWrapper = shallow(<Slider {...props} disabled={true} />);
    const wrapper = shallow(<Slider {...props} disabled={false} />);

    expect(disabledWrapper.find(View).at(1).prop('pointerEvents')).toBe('none');
    expect(wrapper.find(View).at(1).prop('pointerEvents')).toBe('auto');
  });

  it('should render with custom style', () => {
    const customStyle = {margin: 20};
    const wrapper = shallow(<Slider {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View).first())).toMatchObject(
      customStyle,
    );
  });
});
