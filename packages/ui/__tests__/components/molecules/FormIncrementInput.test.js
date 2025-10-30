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
import {act} from '@testing-library/react-native';
import {FormIncrementInput, Increment} from '@axelor/aos-mobile-ui';
import {setup, getDefaultThemeColors, getComputedStyles} from '../../tools';

const findElementByType = (element, type) => {
  if (!element || !element.props) {
    return null;
  }

  if (element.type === type) {
    return element;
  }

  const children = React.Children.toArray(element.props.children);

  for (const child of children) {
    const result = findElementByType(child, type);
    if (result) {
      return result;
    }
  }

  return null;
};

describe('FormIncrementInput Component', () => {
  const Colors = getDefaultThemeColors();
  const baseProps = {
    title: 'Input Title',
    defaultValue: 10,
    onChange: jest.fn(),
    stepSize: 1,
  };

  const setupFormIncrementInput = overrideProps =>
    setup({Component: FormIncrementInput, baseProps, overrideProps});

  const getIncrement = getByTestId => {
    const container = getByTestId('formIncrementContainer');
    const increment = findElementByType(container, Increment);

    return {container, increment};
  };

  it('renders without crashing', () => {
    const {getByTestId, getByText} = setupFormIncrementInput();

    expect(getByTestId('formIncrementContainer')).toBeTruthy();
    expect(getByText(baseProps.title)).toBeTruthy();
  });

  it('renders title and passes default value', () => {
    const {getByText, getByTestId} = setupFormIncrementInput();
    const {increment} = getIncrement(getByTestId);

    expect(getByText(baseProps.title)).toBeTruthy();
    expect(increment.props.value).toBe(baseProps.defaultValue);
  });

  it('notifies value changes', () => {
    const {getByTestId, props} = setupFormIncrementInput({
      onChange: jest.fn(),
    });
    const {increment} = getIncrement(getByTestId);

    act(() => {
      increment.props.onValueChange(
        baseProps.defaultValue + baseProps.stepSize,
      );
    });

    expect(props.onChange).toHaveBeenCalledWith(
      baseProps.defaultValue + baseProps.stepSize,
    );
  });

  it('updates styles on focus and blur', () => {
    const {getByTestId} = setupFormIncrementInput();
    const {increment} = getIncrement(getByTestId);

    act(() => {
      increment.props.onFocus?.();
    });

    let container = getByTestId('formIncrementInnerContainer');
    expect(getComputedStyles(container.props.style)).toMatchObject({
      borderColor: Colors.primaryColor.background,
    });

    act(() => {
      increment.props.onBlur?.();
    });

    container = getByTestId('formIncrementInnerContainer');
    expect(getComputedStyles(container.props.style)).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('applies required styling when value is empty', () => {
    const {getByTestId} = setupFormIncrementInput({
      required: true,
      defaultValue: null,
    });

    const container = getByTestId('formIncrementInnerContainer');

    expect(getComputedStyles(container.props.style)).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when value is present', () => {
    const {getByTestId} = setupFormIncrementInput({required: true});

    const container = getByTestId('formIncrementInnerContainer');

    expect(getComputedStyles(container.props.style)).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('renders readonly increment when requested', () => {
    const {getByTestId} = setupFormIncrementInput({readOnly: true});
    const {increment} = getIncrement(getByTestId);

    expect(increment.props.readonly).toBe(true);
  });
});
