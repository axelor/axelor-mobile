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
import {shallow} from 'enzyme';
import {
  Increment,
  Input,
  formatNumber,
  unformatNumber,
} from '@axelor/aos-mobile-ui';

describe('Increment Component', () => {
  const props = {
    value: '5',
    stepSize: 2,
    onValueChange: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Increment {...props} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Input).exists()).toBe(true);
    expect(wrapper.find('IncrementButton')).toHaveLength(2);
  });

  it('renders input field with the initial value', () => {
    const wrapper = shallow(<Increment {...props} />);

    expect(wrapper.find(Input).prop('value')).toBe(props.value);
  });

  it('increments value when plus button is clicked', () => {
    const onValueChange = jest.fn();
    const wrapper = shallow(
      <Increment {...props} onValueChange={onValueChange} />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    expect(onValueChange).toHaveBeenCalledWith(
      parseFloat(props.value) + props.stepSize,
    );
  });

  it('decrements value when minus button is clicked', () => {
    const onValueChange = jest.fn();
    const wrapper = shallow(
      <Increment {...props} onValueChange={onValueChange} />,
    );
    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');

    expect(onValueChange).toHaveBeenCalledWith(
      parseFloat(props.value) - props.stepSize,
    );
  });

  it('increments value using decimalSpacer & thousandSpacer', () => {
    const decimalSpacer = '.';
    const thousandSpacer = ',';
    const onValueChange = jest.fn();
    const initialValue = '5000.5';
    const wrapper = shallow(
      <Increment
        {...props}
        stepSize={1}
        value={initialValue}
        decimalSpacer={decimalSpacer}
        thousandSpacer={thousandSpacer}
        onValueChange={onValueChange}
      />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    const expectedValue = parseFloat(unformatNumber(initialValue)) + 1;
    const inputExpectedValue = formatNumber(
      expectedValue,
      decimalSpacer,
      thousandSpacer,
    );

    expect(expectedValue).toBe(5001.5);
    expect(onValueChange).toHaveBeenCalledWith(expectedValue);
    expect(wrapper.find(Input).prop('value')).toBe(inputExpectedValue);
  });

  it('calls onFocus when we select increment input', () => {
    const onFocusMock = jest.fn();
    const wrapper = shallow(<Increment {...props} onFocus={onFocusMock} />);

    wrapper.find(Input).simulate('selection');
    expect(onFocusMock).toHaveBeenCalled();
  });

  it('calls onBlur when we unselect increment input', () => {
    const onBlurMock = jest.fn();
    const wrapper = shallow(<Increment {...props} onBlur={onBlurMock} />);

    wrapper.find(Input).simulate('endFocus');
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('disables component when it should be readonly', () => {
    const wrapper = shallow(<Increment {...props} readonly />);

    expect(wrapper.find(Input).prop('readOnly')).toBe(true);
    expect(
      wrapper.find('IncrementButton[iconName="plus"]').prop('readonly'),
    ).toBe(true);
    expect(
      wrapper.find('IncrementButton[iconName="minus"]').prop('readonly'),
    ).toBe(true);
  });

  it('does not increment value up to the max with step', () => {
    const maxValue = 10;
    const wrapper = shallow(
      <Increment {...props} value="9" maxValue={maxValue} />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');
    expect(wrapper.find('Input').prop('value')).toBe(
      maxValue.toFixed(2).toString(),
    );
  });

  it('can not increment value when value equal max', () => {
    const wrapper = shallow(<Increment {...props} value="10" maxValue={10} />);

    expect(
      wrapper.find('IncrementButton[iconName="plus"]').prop('disabled'),
    ).toBe(true);
  });

  it('does not decrement value below to the min with step', () => {
    const minValue = 0;
    const wrapper = shallow(
      <Increment {...props} value="1" minValue={minValue} />,
    );

    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');
    expect(wrapper.find('Input').prop('value')).toBe(
      minValue.toFixed(2).toString(),
    );
  });

  it('can not decrement value when value equal min', () => {
    const wrapper = shallow(<Increment {...props} value="0" minValue={0} />);

    expect(
      wrapper.find('IncrementButton[iconName="minus"]').prop('disabled'),
    ).toBe(true);
  });
});
