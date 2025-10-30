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
import {FormInput, Input} from '@axelor/aos-mobile-ui';
import {setup, getComputedStyles, getDefaultThemeColors} from '../../tools';

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

describe('FormInput Component', () => {
  const Colors = getDefaultThemeColors();
  const baseProps = {
    title: 'Input Title',
    defaultValue: 'Initial Value',
    onChange: jest.fn(),
    onSelection: jest.fn(),
    onEndFocus: jest.fn(),
  };

  const setupFormInput = overrideProps =>
    setup({Component: FormInput, baseProps, overrideProps});

  const getInput = getByTestId => {
    const container = getByTestId('formInputContainer');
    const input = findElementByType(container, Input);

    return {container, input};
  };

  it('renders without crashing', () => {
    const {getByTestId, getByText} = setupFormInput();

    expect(getByTestId('formInputContainer')).toBeTruthy();
    expect(getByText(baseProps.title)).toBeTruthy();
  });

  it('passes default value to underlying input', () => {
    const {getByTestId, getByText} = setupFormInput();
    const {input} = getInput(getByTestId);

    expect(getByText(baseProps.title)).toBeTruthy();
    expect(input.props.value).toBe(baseProps.defaultValue);
  });

  it('passes onChange through to increment input', () => {
    const {getByTestId, props} = setupFormInput({onChange: jest.fn()});
    const {input} = getInput(getByTestId);

    act(() => {
      input.props.onChange?.('Updated');
    });

    expect(props.onChange).toHaveBeenCalledWith('Updated');
  });

  it('updates focus styling on selection and blur', () => {
    const {getByTestId, props} = setupFormInput({
      onSelection: jest.fn(),
      onEndFocus: jest.fn(),
    });
    const {input} = getInput(getByTestId);

    act(() => {
      input.props.onSelection?.();
    });

    let inner = getByTestId('formInputInnerContainer');
    expect(getComputedStyles(inner.props.style)).toMatchObject({
      borderColor: Colors.primaryColor.background,
    });
    expect(props.onSelection).toHaveBeenCalled();

    act(() => {
      input.props.onEndFocus?.();
    });

    inner = getByTestId('formInputInnerContainer');
    expect(getComputedStyles(inner.props.style)).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
    expect(props.onEndFocus).toHaveBeenCalled();
  });

  it('applies required styling when empty', () => {
    const {getByTestId} = setupFormInput({required: true, defaultValue: ''});
    const inner = getByTestId('formInputInnerContainer');

    expect(getComputedStyles(inner.props.style)).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('keeps default styling when required but not empty', () => {
    const {getByTestId} = setupFormInput({required: true});
    const inner = getByTestId('formInputInnerContainer');

    expect(getComputedStyles(inner.props.style)).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('marks input as readonly when requested', () => {
    const {getByTestId} = setupFormInput({readOnly: true});
    const {input} = getInput(getByTestId);

    expect(input.props.readOnly).toBe(true);
  });
});
