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
import {Slider} from '@axelor/aos-mobile-ui';
import RNSlider from '@react-native-community/slider';
import {getGlobalStyles} from '../../tools';

jest.mock('@react-native-community/slider', () => 'RNSlider');

describe('Slider Component', () => {
  const props = {
    minValue: 0,
    maxValue: 100,
    step: 10,
    defaultValue: 50,
    onChange: jest.fn(),
    displayStepNumber: true,
    disabled: false,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Slider {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render RNSlider with correct props', () => {
    const wrapper = shallow(<Slider {...props} />);
    const rnSlider = wrapper.find('RNSlider');

    expect(rnSlider.prop('minimumValue')).toBe(props.minValue);
    expect(rnSlider.prop('maximumValue')).toBe(props.maxValue);
    expect(rnSlider.prop('step')).toBe(props.step);
    expect(rnSlider.prop('value')).toBe(props.defaultValue);
    expect(rnSlider.prop('disabled')).toBe(props.disabled);
  });

  it('should render the correct step number list when displayStepNumber is true', () => {
    const wrapper = shallow(<Slider {...props} />);
    const stepNumberContainer = wrapper
      .find(View)
      .findWhere(node => node.prop('style')?.flexDirection === 'row');

    expect(stepNumberContainer.exists()).toBe(true);

    const steps = stepNumberContainer.find('Text');

    const expectedSteps =
      Math.floor((props.maxValue - props.minValue) / props.step) + 1;
    expect(steps.length).toBe(expectedSteps);
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

  it('should display the slider value if displaySliderValue is true', () => {
    const wrapper = shallow(<Slider {...props} displaySliderValue={true} />);
    const sliderValueText = wrapper.findWhere(
      node => node.prop('style')?.textAlign === 'right',
    );

    expect(sliderValueText.exists()).toBe(true);

    expect(sliderValueText.children().text()).toBe('50.00');
  });

  it('should not display the slider value if displaySliderValue is false', () => {
    const wrapper = shallow(<Slider {...props} displaySliderValue={false} />);

    const sliderValueText = wrapper.findWhere(
      node => node.prop('style')?.textAlign === 'right',
    );

    expect(sliderValueText.exists()).toBe(false);
  });

  it('should disable the slider if the disabled prop is true', () => {
    const wrapper = shallow(<Slider {...props} disabled={true} />);
    const sliderComponent = wrapper.find(RNSlider);

    expect(sliderComponent.prop('disabled')).toBe(true);
  });

  it('should render without step numbers if displayStepNumber is false', () => {
    const wrapper = shallow(<Slider {...props} displayStepNumber={false} />);
    const stepNumberContainer = wrapper
      .find(View)
      .findWhere(node => node.prop('style')?.flexDirection === 'row');

    expect(stepNumberContainer.exists()).toBe(false);
  });

  it('should render with custom style', () => {
    const customStyle = {
      margin: 20,
    };
    const wrapper = shallow(<Slider {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View).first())).toMatchObject(
      customStyle,
    );
  });
});
