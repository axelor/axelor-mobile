/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import {fireEvent} from '@testing-library/react-native';
import {Increment, formatNumber, unformatNumber} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Increment component', () => {
  const setupIncrement = overrideProps =>
    setup({
      Component: Increment,
      baseProps: {value: '5', onValueChange: jest.fn()},
      overrideProps,
    });

  it('renders with default value', () => {
    const {getByDisplayValue, props} = setupIncrement();
    expect(getByDisplayValue(`${props.value}.00`)).toBeTruthy();
  });

  it('increments value on plus button press', () => {
    const {getAllByTestId, props} = setupIncrement({onValueChange: jest.fn()});

    const plusButton = getAllByTestId('iconTouchable')[1];

    fireEvent.press(plusButton);

    expect(props.onValueChange).toHaveBeenCalledWith(
      parseFloat(props.value) + 1,
    );
  });

  it('decrements value on minus button press', () => {
    const {getAllByTestId, props} = setupIncrement({onValueChange: jest.fn()});

    const minusButton = getAllByTestId('iconTouchable')[0];

    fireEvent.press(minusButton);

    expect(props.onValueChange).toHaveBeenCalledWith(
      parseFloat(props.value) - 1,
    );
  });

  it('does not decrement below minValue', () => {
    const {getAllByTestId, props} = setupIncrement({
      onValueChange: jest.fn(),
      minValue: 5,
    });

    const minusButton = getAllByTestId('iconTouchable')[0];

    fireEvent.press(minusButton);

    expect(props.onValueChange).not.toHaveBeenCalled();
  });

  it('does not increment above maxValue', () => {
    const {getAllByTestId, props} = setupIncrement({
      onValueChange: jest.fn(),
      maxValue: 5,
    });

    const plusButton = getAllByTestId('iconTouchable')[1];

    fireEvent.press(plusButton);

    expect(props.onValueChange).not.toHaveBeenCalled();
  });

  it('calls onFocus when input is focused', () => {
    const {getByDisplayValue, props} = setupIncrement({onFocus: jest.fn()});

    fireEvent(getByDisplayValue(`${props.value}.00`), 'focus');

    expect(props.onFocus).toHaveBeenCalled();
  });

  it('calls onBlur and resets value when blurred with empty input', () => {
    const {getByDisplayValue, props} = setupIncrement({onBlur: jest.fn()});

    const input = getByDisplayValue(`${props.value}.00`);

    fireEvent.changeText(input, '');
    fireEvent(input, 'blur');

    expect(props.onBlur).toHaveBeenCalled();
    expect(props.onValueChange).toHaveBeenCalledWith(0);
  });

  it('respects readonly prop', () => {
    const {queryAllByTestId} = setupIncrement({readonly: true});

    expect(queryAllByTestId('iconTouchable').length).toBe(0);
  });

  it('applies custom formatting logic when defaultFormatting is false', () => {
    const {getByDisplayValue, props} = setupIncrement({
      defaultFormatting: false,
      value: '1234',
    });

    expect(getByDisplayValue(props.value)).toBeTruthy();
  });

  it('increments value using thousandSpacer ","', () => {
    const {getAllByTestId, getByDisplayValue, props} = setupIncrement({
      onValueChange: jest.fn(),
      value: '5000.5',
      decimalSpacer: '.',
      thousandSpacer: ',',
    });

    const plusButton = getAllByTestId('iconTouchable')[1];
    fireEvent.press(plusButton);

    const expectedValue =
      parseFloat(
        unformatNumber(props.value, props.decimalSpacer, props.thousandSpacer),
      ) + 1;
    const inputExpectedValue = formatNumber(
      expectedValue,
      props.decimalSpacer,
      props.thousandSpacer,
    );

    expect(expectedValue).toBe(5001.5);
    expect(props.onValueChange).toHaveBeenCalledWith(expectedValue);
    expect(getByDisplayValue(inputExpectedValue)).toBeTruthy();
  });

  it('respects stepSize prop', () => {
    const {getAllByTestId, props} = setupIncrement({stepSize: 5});

    const plusButton = getAllByTestId('iconTouchable')[1];

    fireEvent.press(plusButton);

    expect(props.onValueChange).toHaveBeenCalledWith(
      parseFloat(props.value) + props.stepSize,
    );
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupIncrement({style: {color: 'red'}});

    expect(getByTestId('incrementContainer')).toHaveStyle(props.style);
  });
});
