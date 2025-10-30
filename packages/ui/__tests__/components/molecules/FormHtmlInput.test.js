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
import {FormHtmlInput, HtmlInput} from '@axelor/aos-mobile-ui';
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

describe('FormHtmlInput Component', () => {
  const Colors = getDefaultThemeColors();
  const baseProps = {
    title: 'Input Title',
    placeholder: 'Enter text',
    defaultValue: 'Initial Value',
    onChange: jest.fn(),
  };

  const setupFormHtmlInput = overrideProps =>
    setup({Component: FormHtmlInput, baseProps, overrideProps});

  const getHtmlInput = getByTestId => {
    const container = getByTestId('formHtmlInputContainer');
    const htmlInput = findElementByType(container, HtmlInput);
    return {container, htmlInput};
  };

  it('renders title and initial value', () => {
    const {getByText} = setupFormHtmlInput();

    expect(getByText(baseProps.title)).toBeTruthy();
  });

  it('invokes onChange when html content changes', () => {
    const {getByTestId, props} = setupFormHtmlInput({onChange: jest.fn()});
    const {htmlInput} = getHtmlInput(getByTestId);

    act(() => {
      htmlInput.props.onChange?.('Updated Value');
    });

    expect(props.onChange).toHaveBeenCalledWith('Updated Value');
  });

  it('updates focus styling on focus and blur', () => {
    const {getByTestId} = setupFormHtmlInput();
    const {htmlInput} = getHtmlInput(getByTestId);

    act(() => {
      htmlInput.props.onFocus?.();
    });

    let container = getByTestId('formHtmlInputContainer');
    expect(getComputedStyles(container.props.style)).toMatchObject({
      borderColor: Colors.primaryColor.background,
    });

    act(() => {
      htmlInput.props.onBlur?.();
    });

    container = getByTestId('formHtmlInputContainer');
    expect(getComputedStyles(container.props.style)).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('applies required styling when field is required and empty', () => {
    const {getByTestId} = setupFormHtmlInput({
      required: true,
      defaultValue: '',
    });
    const container = getByTestId('formHtmlInputContainer');

    const styles = getComputedStyles(container.props.style);

    expect(styles).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when field has content', () => {
    const {getByTestId} = setupFormHtmlInput({required: true});

    const styles = getComputedStyles(
      getByTestId('formHtmlInputContainer').props.style,
    );

    expect(styles).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('returns null when readonly, hideIfNull is true, and value is empty', () => {
    const {queryByText} = setupFormHtmlInput({
      readonly: true,
      hideIfNull: true,
      defaultValue: '',
    });

    expect(queryByText(baseProps.title)).toBeNull();
  });

  it('renders when readonly but value is present', () => {
    const {getByText} = setupFormHtmlInput({
      readonly: true,
      hideIfNull: true,
      defaultValue: 'Some content',
    });

    expect(getByText(baseProps.title)).toBeTruthy();
    expect(getByText(baseProps.title)).toBeTruthy();
  });
});
