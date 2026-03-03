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
import {act} from '@testing-library/react-native';
import {FormHtmlInput} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

jest.mock('../../../lib/components/atoms/HtmlInput/HtmlInput', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_htmlInput" {...props} />;
});

describe('FormHtmlInput Component', () => {
  const Colors = getDefaultThemeColors();

  const setupFormHtmlInput = overrideProps =>
    setup({
      Component: FormHtmlInput,
      baseProps: {
        title: 'Input Title',
        placeholder: 'Enter text',
        defaultValue: 'Initial Value',
        onChange: jest.fn(),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupFormHtmlInput();

    expect(getByTestId('mocked_htmlInput')).toBeTruthy();
  });

  it('renders title and initial value', () => {
    const {getByText, getByTestId, props} = setupFormHtmlInput();

    expect(getByText(props.title)).toBeTruthy();
    expect(getByTestId('mocked_htmlInput').props.defaultInput).toBe(
      props.defaultValue,
    );
  });

  it('invokes onChange when html content changes', () => {
    const {getByTestId, props} = setupFormHtmlInput({onChange: jest.fn()});

    const _value = 'Updated Value';

    act(() => getByTestId('mocked_htmlInput').props.onChange(_value));

    expect(props.onChange).toHaveBeenCalledWith(_value);
  });

  it('updates focus styling on focus and blur', () => {
    const {getByTestId} = setupFormHtmlInput();

    const htmlInput = getByTestId('mocked_htmlInput');

    act(() => htmlInput.props.onFocus());

    expect(getByTestId('formHtmlInputWrapper')).toHaveStyle({
      borderColor: Colors.primaryColor.background,
    });

    act(() => htmlInput.props.onBlur());

    expect(getByTestId('formHtmlInputWrapper')).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('applies required styling when field is required and empty', () => {
    const {getByTestId} = setupFormHtmlInput({
      required: true,
      defaultValue: '',
    });

    expect(getByTestId('formHtmlInputWrapper')).toHaveStyle({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when field has content', () => {
    const {getByTestId} = setupFormHtmlInput({required: true});

    expect(getByTestId('formHtmlInputWrapper')).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('returns null when readonly, hideIfNull is true, and value is empty', () => {
    const {queryByTestId} = setupFormHtmlInput({
      readonly: true,
      hideIfNull: true,
      defaultValue: '',
    });

    expect(queryByTestId('formHtmlInputContainer')).toBeFalsy();
  });

  it('renders when readonly but value is present', () => {
    const {getByText, getByTestId, props} = setupFormHtmlInput({
      readonly: true,
      hideIfNull: true,
      defaultValue: 'Some content',
    });

    expect(getByText(props.title)).toBeTruthy();
    expect(getByTestId('mocked_htmlInput').props.defaultInput).toBe(
      props.defaultValue,
    );
    expect(getByTestId('mocked_htmlInput').props.readonly).toBe(true);
  });
});
