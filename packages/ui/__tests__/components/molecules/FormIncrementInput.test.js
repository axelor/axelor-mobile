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
import {FormIncrementInput} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

jest.mock('../../../lib/components/molecules/Increment/Increment', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_increment" {...props} />;
});

describe('FormIncrementInput Component', () => {
  const Colors = getDefaultThemeColors();

  const setupFormIncrementInput = overrideProps =>
    setup({
      Component: FormIncrementInput,
      baseProps: {
        title: 'Input Title',
        defaultValue: 10,
        onChange: jest.fn(),
        stepSize: 1,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupFormIncrementInput();

    expect(getByTestId('formIncrementContainer')).toBeTruthy();
  });

  it('renders title and passes default value', () => {
    const {getByText, getByTestId, props} = setupFormIncrementInput();

    expect(getByText(props.title)).toBeTruthy();
    expect(getByTestId('mocked_increment').props.value).toBe(
      props.defaultValue,
    );
  });

  it('notifies value changes', () => {
    const {getByTestId, props} = setupFormIncrementInput({onChange: jest.fn()});

    const increment = getByTestId('mocked_increment');

    const _value = 20;
    act(() => increment.props.onValueChange(_value));

    expect(props.onChange).toHaveBeenCalledWith(_value);
  });

  it('updates styles on focus and blur', () => {
    const {getByTestId} = setupFormIncrementInput();
    const increment = getByTestId('mocked_increment');

    act(() => increment.props.onFocus());

    expect(getByTestId('formIncrementInnerContainer')).toHaveStyle({
      borderColor: Colors.primaryColor.background,
    });

    act(() => increment.props.onBlur());

    expect(getByTestId('formIncrementInnerContainer')).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('applies required styling when value is empty', () => {
    const {getByTestId} = setupFormIncrementInput({
      required: true,
      defaultValue: null,
    });

    expect(getByTestId('formIncrementInnerContainer')).toHaveStyle({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when value is present', () => {
    const {getByTestId} = setupFormIncrementInput({required: true});

    expect(getByTestId('formIncrementInnerContainer')).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('renders readonly increment when requested', () => {
    const {getByTestId} = setupFormIncrementInput({readOnly: true});

    expect(getByTestId('mocked_increment').props.readonly).toBe(true);
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupFormIncrementInput({style: {width: 200}});

    expect(getByTestId('formIncrementContainer')).toHaveStyle(props.style);
  });
});
