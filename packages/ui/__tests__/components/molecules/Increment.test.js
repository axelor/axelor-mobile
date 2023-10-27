/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {Increment, Input} from '@axelor/aos-mobile-ui';

describe('Increment Component', () => {
  const props = {
    value: '5',
    stepSize: 2,
    onValueChange: jest.fn(),
    onFocus: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Increment {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders input field with the initial value', () => {
    const wrapper = shallow(<Increment {...props} />);

    expect(wrapper.find(Input).prop('value')).toBe(props.value);
  });

  it('increments value when plus button is clicked', () => {
    const wrapper = shallow(<Increment {...props} />);

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    expect(props.onValueChange).toHaveBeenCalledWith(
      (parseFloat(props.value) + props.stepSize).toString(),
    );
  });

  it('decrements value when minus button is clicked', () => {
    const wrapper = shallow(<Increment {...props} />);

    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');

    expect(props.onValueChange).toHaveBeenCalledWith(
      (parseFloat(props.value) - props.stepSize).toString(),
    );
  });

  it('increments value using decimalSpacer ","', () => {
    const decimalSpacer = ',';
    const wrapper = shallow(
      <Increment {...props} value="5,5" decimalSpacer={decimalSpacer} />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    const expectedValue = (
      parseFloat(props.value.replace(decimalSpacer, '.')) + props.stepSize
    ).toString();

    expect(props.onValueChange).toHaveBeenCalledWith(expectedValue);

    expect(wrapper.find(Input).prop('value')).toBe(
      expectedValue.replace('.', decimalSpacer),
    );
  });

  it('increments value using thousandSpacer ","', () => {
    const initialValue = '5,000';
    const stepSize = 1000;
    const thousandSpacer = ',';
    const wrapper = shallow(
      <Increment
        {...props}
        value={initialValue}
        stepSize={stepSize}
        thousandSpacer={thousandSpacer}
      />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    const expectedValue = (
      parseFloat(initialValue.replace(',', '')) + stepSize
    ).toString();
    expect(props.onValueChange).toHaveBeenCalledWith(expectedValue);

    const formattedValue = expectedValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSpacer,
    );
    expect(wrapper.find('Input').prop('value')).toBe(formattedValue);
  });

  it('calls onFocus when we select increment input', () => {
    const onFocusMock = jest.fn();
    const wrapper = shallow(<Increment {...props} onFocus={onFocusMock} />);

    wrapper.find(Input).simulate('focus');
    expect(props.onFocus).toHaveBeenCalled();
  });

  it('does not increment value when the plus button is pressed and in readonly mode', () => {
    const wrapper = shallow(<Increment {...props} readonly />);

    expect(wrapper.find(Input).prop('readOnly')).toBe(true);

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    expect(wrapper.find('Input').prop('value')).toBe(props.value);
  });

  it('does not increment value up to the max with step', () => {
    const wrapper = shallow(<Increment {...props} value="9" maxValue={10} />);

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');
    expect(wrapper.find('Input').prop('value')).toBe('10');
  });

  it('does not increment value up to the max when value equal max', () => {
    const wrapper = shallow(<Increment {...props} value="10" maxValue={10} />);

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');
    expect(wrapper.find('Input').prop('value')).toBe('10');
  });

  it('does not decrement value below to the min with step', () => {
    const wrapper = shallow(<Increment {...props} value="1" minValue={0} />);

    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');
    expect(wrapper.find('Input').prop('value')).toBe('0');
  });

  it('does not decrement value below the min when value equal min', () => {
    const wrapper = shallow(<Increment {...props} value="0" minValue={0} />);

    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');

    expect(wrapper.find('Input').prop('value')).toBe('0');
  });

  it('format the value with the specified scale', () => {
    const wrapper = shallow(
      <Increment {...props} value="1.234567" scale={2} />,
    );

    expect(wrapper.find('Input').prop('value')).toBe('1.23');
  });

  it('format the value with the default scale if scale prop is not provided', () => {
    const wrapper = shallow(<Increment {...props} value="1.234567" />);

    expect(wrapper.find('Input').prop('value')).toBe('1.2');
  });
});
