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

import {fireEvent} from '@testing-library/react-native';
import {NumberChevronInput} from '@axelor/aos-mobile-ui';
import {setup, getComputedStyles} from '../../tools';

const INPUT_CHANGE_TYPE = {
  button: 0,
  keyboard: 1,
  limit: 2,
};

describe('NumberChevronInput Component', () => {
  const baseProps = {
    defaultValue: 5,
    minValue: 0,
    maxValue: 9,
    onValueChange: jest.fn(),
    onEndFocus: jest.fn(),
  };

  const setupInput = overrideProps =>
    setup({Component: NumberChevronInput, baseProps, overrideProps});

  it('renders with default value', () => {
    const {getByDisplayValue} = setupInput();

    expect(getByDisplayValue(baseProps.defaultValue.toString())).toBeTruthy();
  });

  it('increments and decrements value via chevron buttons', () => {
    const {getAllByTestId, props} = setupInput({
      onValueChange: jest.fn(),
    });

    const [increaseButton, decreaseButton] = getAllByTestId('iconTouchable');

    fireEvent.press(increaseButton);
    expect(props.onValueChange).toHaveBeenLastCalledWith(
      baseProps.defaultValue + 1,
      INPUT_CHANGE_TYPE.button,
    );

    fireEvent.press(decreaseButton);
    expect(props.onValueChange).toHaveBeenLastCalledWith(
      baseProps.defaultValue,
      INPUT_CHANGE_TYPE.button,
    );
  });

  it('prevents increment when value reaches maxValue', () => {
    const {getAllByTestId, props} = setupInput({
      defaultValue: 9,
      onValueChange: jest.fn(),
    });

    const [increaseTouchable] = getAllByTestId('iconTouchable');
    fireEvent.press(increaseTouchable);

    expect(props.onValueChange).not.toHaveBeenCalled();
  });

  it('prevents decrement when value reaches minValue', () => {
    const {getAllByTestId, props} = setupInput({
      defaultValue: 0,
      onValueChange: jest.fn(),
    });

    const [, decreaseTouchable] = getAllByTestId('iconTouchable');
    fireEvent.press(decreaseTouchable);

    expect(props.onValueChange).not.toHaveBeenCalled();
  });

  it('clamps keyboard input that exceeds bounds', () => {
    const {getByDisplayValue, props} = setupInput({
      maxValue: 5,
      onValueChange: jest.fn(),
    });

    const input = getByDisplayValue(baseProps.defaultValue.toString());

    fireEvent.changeText(input, '8');

    expect(props.onValueChange).toHaveBeenLastCalledWith(
      5,
      INPUT_CHANGE_TYPE.limit,
    );
  });

  it('handles valid keyboard input', () => {
    const {getByDisplayValue, props} = setupInput({
      onValueChange: jest.fn(),
    });

    const input = getByDisplayValue(baseProps.defaultValue.toString());

    fireEvent.changeText(input, '7');

    expect(props.onValueChange).toHaveBeenLastCalledWith(
      7,
      INPUT_CHANGE_TYPE.keyboard,
    );

    fireEvent.changeText(input, 'invalid');

    expect(props.onValueChange).not.toHaveBeenLastCalledWith(
      NaN,
      INPUT_CHANGE_TYPE.keyboard,
    );
  });

  it('applies custom container style', () => {
    const style = {height: 200};
    const {getByTestId} = setupInput({style});

    const styles = getComputedStyles(
      getByTestId('numberChevronInputContainer').props.style,
    );
    expect(styles).toMatchObject(style);
  });
});
