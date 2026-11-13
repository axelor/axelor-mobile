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

import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Increment, formatNumber} from '@axelor/aos-mobile-ui';
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
    const {getAllByTestId, getByDisplayValue, rerender, props} = setupIncrement(
      {
        onValueChange: jest.fn(),
        value: '5000.5',
        decimalSpacer: '.',
        thousandSpacer: ',',
      },
    );

    const plusButton = getAllByTestId('iconTouchable')[1];
    fireEvent.press(plusButton);

    const expectedValue = parseFloat(props.value) + 1;
    expect(expectedValue).toBe(5001.5);
    expect(props.onValueChange).toHaveBeenCalledWith(expectedValue);

    // The parent passes the new value back, as every caller does.
    rerender({value: expectedValue.toString()});
    const inputExpectedValue = formatNumber(
      expectedValue,
      props.decimalSpacer,
      props.thousandSpacer,
    );
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

  describe('value handling', () => {
    const french = {decimalSpacer: ',', thousandSpacer: ' '};
    const english = {decimalSpacer: '.', thousandSpacer: ','};

    const editAndBlur = (getByDisplayValue, shownText, editText, typedText) => {
      fireEvent(getByDisplayValue(shownText), 'focus');
      if (typedText != null) {
        fireEvent.changeText(getByDisplayValue(editText), typedText);
      }
      fireEvent(getByDisplayValue(typedText ?? editText), 'blur');
    };

    it.each([
      ['French', french, '144703', '144 703', '144703'],
      ['English', english, '144703', '144,703', '144703'],
      ['English', english, '1234567', '1,234,567', '1234567'],
    ])(
      'keeps the %s value with 0 decimals after focus and blur without typing',
      (_language, separators, value, shownText, editText) => {
        const {getByDisplayValue, props} = setupIncrement({
          ...separators,
          value,
          scale: 0,
          onValueChange: jest.fn(),
          onBlur: jest.fn(),
        });

        editAndBlur(getByDisplayValue, shownText, editText);

        expect(props.onValueChange).not.toHaveBeenCalled();
        expect(props.onBlur).toHaveBeenCalledTimes(1);
        expect(getByDisplayValue(shownText)).toBeTruthy();
      },
    );

    it('does not round a value with more decimals than shown when not edited', () => {
      const {getByDisplayValue, props} = setupIncrement({
        value: '1.23456',
        onValueChange: jest.fn(),
      });

      editAndBlur(getByDisplayValue, '1.23', '1.23');

      expect(props.onValueChange).not.toHaveBeenCalled();
    });

    it('shows the number without thousands separators while editing', () => {
      const {getByDisplayValue} = setupIncrement({
        ...french,
        value: '144703.5',
      });

      fireEvent(getByDisplayValue('144 703,50'), 'focus');

      expect(getByDisplayValue('144703,50')).toBeTruthy();
    });

    it.each([
      ['French', french, '144 703', '144 704'],
      ['English', english, '144,703', '144,704'],
    ])(
      'adds the step to a %s value of 1 000 or more',
      (_language, separators, shownText, nextText) => {
        const {getAllByTestId, getByDisplayValue, rerender, props} =
          setupIncrement({
            ...separators,
            value: '144703',
            scale: 0,
            onValueChange: jest.fn(),
          });

        expect(getByDisplayValue(shownText)).toBeTruthy();
        fireEvent.press(getAllByTestId('iconTouchable')[1]);

        expect(props.onValueChange).toHaveBeenCalledWith(144704);
        rerender({...props, value: '144704'});
        expect(getByDisplayValue(nextText)).toBeTruthy();
      },
    );

    it('keeps the edited text a number when + is pressed while editing', () => {
      const {getAllByTestId, getByDisplayValue, props} = setupIncrement({
        ...french,
        value: '5',
        scale: 0,
        onValueChange: jest.fn(),
      });

      fireEvent(getByDisplayValue('5'), 'focus');
      fireEvent.changeText(getByDisplayValue('5'), '1234');
      fireEvent.press(getAllByTestId('iconTouchable')[1]);

      expect(props.onValueChange).toHaveBeenLastCalledWith(1235);
      expect(getByDisplayValue('1235')).toBeTruthy();
    });

    it('enables the minus button for a decimal value above the minimum', () => {
      const {getAllByTestId, props} = setupIncrement({
        ...french,
        value: '0.5',
        minValue: 0,
        stepSize: 0.1,
        onValueChange: jest.fn(),
      });

      fireEvent.press(getAllByTestId('iconTouchable')[0]);

      expect(props.onValueChange).toHaveBeenCalledWith(0.4);
    });

    it('sends the value rounded like the value shown', () => {
      const {getAllByTestId, props} = setupIncrement({
        value: '0.1',
        stepSize: 0.2,
        onValueChange: jest.fn(),
      });

      fireEvent.press(getAllByTestId('iconTouchable')[1]);

      expect(props.onValueChange).toHaveBeenCalledWith(0.3);
    });

    it('keeps every intermediate text while typing', () => {
      const {getByDisplayValue, props} = setupIncrement({
        ...french,
        onValueChange: jest.fn(),
      });

      fireEvent(getByDisplayValue('5,00'), 'focus');
      let currentText = '5,00';
      for (const typedText of ['', '-', '1', '12', '12,', '12,5']) {
        fireEvent.changeText(getByDisplayValue(currentText), typedText);
        expect(getByDisplayValue(typedText)).toBeTruthy();
        currentText = typedText;
      }

      expect(props.onValueChange).toHaveBeenLastCalledWith(12.5);
      expect(props.onValueChange).not.toHaveBeenCalledWith(NaN);
    });

    /*
     * Renders the field in a parent that passes every sent value back, like
     * the screens do, and types the text one character at a time.
     */
    const setupWithParent = props => {
      const onValueChange = jest.fn();
      const Parent = () => {
        const [value, setValue] = React.useState(props.value ?? '5');
        return (
          <Increment
            {...props}
            value={value}
            onValueChange={newValue => {
              onValueChange(newValue);
              setValue(newValue.toString());
            }}
          />
        );
      };

      return {...render(<Parent />), onValueChange};
    };

    const typeCharacters = (getByDisplayValue, startText, typedText) => {
      let currentText = startText;
      for (let length = 0; length <= typedText.length; length++) {
        const nextText = typedText.slice(0, length);
        fireEvent.changeText(getByDisplayValue(currentText), nextText);
        currentText = nextText;
      }
    };

    it('sends the maximum as soon as the typed value goes above it', () => {
      const {getByDisplayValue, onValueChange} = setupWithParent({
        value: '5',
        minValue: 5,
        maxValue: 500,
        scale: 0,
      });

      fireEvent(getByDisplayValue('5'), 'focus');
      typeCharacters(getByDisplayValue, '5', '1000');

      expect(onValueChange.mock.calls.map(call => call[0])).toEqual([
        10, 100, 500,
      ]);
      expect(getByDisplayValue('1000')).toBeTruthy();

      fireEvent(getByDisplayValue('1000'), 'blur');

      expect(onValueChange).toHaveBeenCalledTimes(3);
      expect(getByDisplayValue('500')).toBeTruthy();
    });

    it('sends nothing while the typed value is under the minimum', () => {
      const {getByDisplayValue, onValueChange} = setupWithParent({
        value: '5',
        minValue: 5,
        scale: 0,
      });

      fireEvent(getByDisplayValue('5'), 'focus');
      fireEvent.changeText(getByDisplayValue('5'), '1');

      expect(onValueChange).not.toHaveBeenCalled();
    });

    it.each([
      ['English', english, '12,5', 12, '12.00'],
      ['English', english, '1,234,56', 1234, '1,234.00'],
      ['French', french, '1,2,3', 1.2, '1,20'],
      ['French', french, '12abc', 12, '12,00'],
      ['French', french, '-', 5, '5,00'],
    ])(
      'keeps the last valid number when %s text %p is left',
      (_language, separators, typedText, expectedNumber, shownText) => {
        const {getByDisplayValue, onValueChange} = setupWithParent({
          ...separators,
        });
        const editText = separators === french ? '5,00' : '5.00';

        fireEvent(getByDisplayValue(editText), 'focus');
        typeCharacters(getByDisplayValue, editText, typedText);
        fireEvent(getByDisplayValue(typedText), 'blur');

        expect(onValueChange).not.toHaveBeenCalledWith(NaN);
        if (expectedNumber === 5) {
          // Nothing valid was typed, so the value given at the start stays.
          expect(onValueChange).not.toHaveBeenCalled();
        } else {
          expect(onValueChange).toHaveBeenLastCalledWith(expectedNumber);
        }
        expect(getByDisplayValue(shownText)).toBeTruthy();
      },
    );

    it('sends the typed value even when it matches the text shown at focus', () => {
      const {getByDisplayValue, onValueChange} = setupWithParent({
        value: '150',
        maxValue: 100,
        scale: 0,
      });

      fireEvent(getByDisplayValue('150'), 'focus');
      typeCharacters(getByDisplayValue, '150', '150');
      fireEvent(getByDisplayValue('150'), 'blur');

      expect(onValueChange).toHaveBeenLastCalledWith(100);
      expect(getByDisplayValue('100')).toBeTruthy();
    });

    it.each([
      [english, '1,234', 1234],
      [french, '1 234,5', 1234.5],
      [french, '12.5', 12.5],
    ])('reads %p typed text %p as %p', (separators, typedText, expected) => {
      const {getByDisplayValue, props} = setupIncrement({
        ...separators,
        onValueChange: jest.fn(),
      });
      const shownText = separators === french ? '5,00' : '5.00';

      editAndBlur(getByDisplayValue, shownText, shownText, typedText);

      expect(props.onValueChange).toHaveBeenLastCalledWith(expected);
    });

    it('ends the edit once when blur fires twice', () => {
      const onBlur = jest.fn();
      const {getByDisplayValue, onValueChange} = setupWithParent({onBlur});

      fireEvent(getByDisplayValue('5.00'), 'focus');
      fireEvent.changeText(getByDisplayValue('5.00'), '-');
      fireEvent(getByDisplayValue('-'), 'blur');
      fireEvent(getByDisplayValue('5.00'), 'blur');

      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('formats negative values with the sign in front', () => {
      const {getByDisplayValue} = setupIncrement({
        ...english,
        value: '-123456',
        minValue: null,
      });

      expect(getByDisplayValue('-123,456.00')).toBeTruthy();
    });
  });
});
