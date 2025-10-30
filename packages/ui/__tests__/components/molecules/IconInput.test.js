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
import {fireEvent} from '@testing-library/react-native';
import {IconInput, Icon} from '@axelor/aos-mobile-ui';
import {setup, getDefaultThemeColors} from '../../tools';

describe('IconInput Component', () => {
  const Colors = getDefaultThemeColors();
  const baseProps = {
    placeholder: 'Enter text',
    value: 'Initial value',
    onChange: jest.fn(),
    onSelection: jest.fn(),
    onEndFocus: jest.fn(),
  };

  const setupIconInput = overrideProps =>
    setup({
      Component: IconInput,
      baseProps,
      overrideProps,
    });

  const getContainer = getByTestId => getByTestId('iconInputContainer');

  it('should render without crashing', () => {
    const {getByPlaceholderText, props} = setupIconInput();

    expect(getByPlaceholderText(props.placeholder)).toBeTruthy();
  });

  it('renders the provided value', () => {
    const {getByDisplayValue, props} = setupIconInput();

    expect(getByDisplayValue(props.value)).toBeTruthy();
  });

  it('renders the provided left and right icons', () => {
    const leftIconsList = [<Icon name="check" />, <Icon name="camera" />];
    const rightIconsList = [<Icon name="alarm" />];
    const {getAllByTestId} = setupIconInput({
      leftIconsList,
      rightIconsList,
    });

    const icons = getAllByTestId('iconTouchable');
    expect(icons).toHaveLength(leftIconsList.length + rightIconsList.length);
  });

  it('handles selection and end focus', () => {
    const {getByPlaceholderText, getByTestId, props} = setupIconInput({
      onSelection: jest.fn(),
      onEndFocus: jest.fn(),
    });

    const input = getByPlaceholderText(props.placeholder);
    const container = getContainer(getByTestId);

    expect(container).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });

    fireEvent(input, 'focus');

    expect(props.onSelection).toHaveBeenCalled();
    expect(container).toHaveStyle({
      borderColor: Colors.primaryColor.background,
    });

    fireEvent(input, 'blur');

    expect(props.onEndFocus).toHaveBeenCalled();
    expect(container).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('updates input value on change', () => {
    const {getByPlaceholderText, props} = setupIconInput({
      onChange: jest.fn(),
    });

    const input = getByPlaceholderText(props.placeholder);
    const newValue = 'New Value';

    fireEvent.changeText(input, newValue);

    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('applies required styling when field is required, focused, and empty', () => {
    const {getByPlaceholderText, getByTestId, props} = setupIconInput({
      required: true,
      value: null,
      onSelection: jest.fn(),
    });

    const input = getByPlaceholderText(props.placeholder);
    const container = getContainer(getByTestId);

    fireEvent(input, 'focus');

    expect(props.onSelection).toHaveBeenCalled();
    expect(container).toHaveStyle({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when field is required and not empty', () => {
    const {getByTestId} = setupIconInput({required: true});

    const container = getContainer(getByTestId);

    expect(container).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('renders input as readonly when requested', () => {
    const {getByPlaceholderText, props} = setupIconInput({readOnly: true});

    expect(getByPlaceholderText(props.placeholder)).toHaveProp(
      'editable',
      false,
    );
  });
});
