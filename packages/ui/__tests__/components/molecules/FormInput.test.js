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
import {FormInput} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

jest.mock('../../../lib/components/atoms/Input/Input', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_input" {...props} />;
});

describe('FormInput Component', () => {
  const Colors = getDefaultThemeColors();

  const setupFormInput = overrideProps =>
    setup({
      Component: FormInput,
      baseProps: {
        title: 'Input Title',
        defaultValue: 'Initial Value',
        onChange: jest.fn(),
        onSelection: jest.fn(),
        onEndFocus: jest.fn(),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupFormInput();

    expect(getByTestId('formInputContainer')).toBeTruthy();
  });

  it('passes default value to underlying input', () => {
    const {getByText, getByTestId, props} = setupFormInput();

    expect(getByText(props.title)).toBeTruthy();
    expect(getByTestId('mocked_input').props.value).toBe(props.defaultValue);
  });

  it('passes onChange through to input', () => {
    const {getByTestId, props} = setupFormInput({onChange: jest.fn()});

    const _value = 'Updated content';
    act(() => getByTestId('mocked_input').props.onChange(_value));

    expect(props.onChange).toHaveBeenCalledWith(_value);
  });

  it('updates focus styling on selection and blur', () => {
    const {getByTestId, props} = setupFormInput({
      onSelection: jest.fn(),
      onEndFocus: jest.fn(),
    });
    const input = getByTestId('mocked_input');

    act(() => input.props.onSelection());

    expect(getByTestId('formInputInnerContainer')).toHaveStyle({
      borderColor: Colors.primaryColor.background,
    });
    expect(props.onSelection).toHaveBeenCalled();

    act(() => input.props.onEndFocus());

    expect(getByTestId('formInputInnerContainer')).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
    expect(props.onEndFocus).toHaveBeenCalled();
  });

  it('applies required styling when empty', () => {
    const {getByTestId} = setupFormInput({required: true, defaultValue: ''});

    expect(getByTestId('formInputInnerContainer')).toHaveStyle({
      borderColor: Colors.errorColor.background,
    });
  });

  it('keeps default styling when required but not empty', () => {
    const {getByTestId} = setupFormInput({required: true});

    expect(getByTestId('formInputInnerContainer')).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('marks input as readonly when requested', () => {
    const {getByTestId} = setupFormInput({readOnly: true});

    expect(getByTestId('mocked_input').props.readOnly).toBe(true);
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupFormInput({style: {width: 200}});

    expect(getByTestId('formInputContainer')).toHaveStyle(props.style);
  });
});
