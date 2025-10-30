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
import {getDefaultThemeColors, setup} from '../../tools';

describe('IconInput Component', () => {
  const Colors = getDefaultThemeColors();

  const setupIconInput = overrideProps =>
    setup({
      Component: IconInput,
      baseProps: {
        placeholder: 'Enter text',
        value: 'Initial value',
        onChange: jest.fn(),
        onSelection: jest.fn(),
        onEndFocus: jest.fn(),
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupIconInput();

    expect(getByTestId('iconInputContainer')).toBeTruthy();
  });

  it('renders the provided value', () => {
    const {getByDisplayValue, props} = setupIconInput();

    expect(getByDisplayValue(props.value)).toBeTruthy();
  });

  it('renders the provided left and right icons', () => {
    const {getAllByTestId, props} = setupIconInput({
      leftIconsList: [<Icon name="check" />, <Icon name="camera" />],
      rightIconsList: [<Icon name="alarm" />],
    });

    expect(getAllByTestId(/^icon-.*/)).toHaveLength(
      props.leftIconsList.length + props.rightIconsList.length,
    );
  });

  it('handles selection and end focus', () => {
    const {getByPlaceholderText, getByTestId, props} = setupIconInput({
      onSelection: jest.fn(),
      onEndFocus: jest.fn(),
    });

    const _inputElt = getByPlaceholderText(props.placeholder);
    const _containerElt = getByTestId('iconInputContainer');

    expect(_containerElt).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });

    fireEvent(_inputElt, 'focus');

    expect(props.onSelection).toHaveBeenCalled();
    expect(_containerElt).toHaveStyle({
      borderColor: Colors.primaryColor.background,
    });

    fireEvent(_inputElt, 'blur');

    expect(props.onEndFocus).toHaveBeenCalled();
    expect(_containerElt).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('updates input value on change', () => {
    const {getByPlaceholderText, props} = setupIconInput({onChange: jest.fn()});

    const newValue = 'New Value';

    fireEvent.changeText(getByPlaceholderText(props.placeholder), newValue);
    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('applies required styling when field is required, focused, and empty', () => {
    const {getByPlaceholderText, getByTestId, rerender, props} = setupIconInput(
      {
        required: true,
        value: null,
        onSelection: jest.fn(),
      },
    );

    expect(getByTestId('iconInputContainer')).toHaveStyle({
      borderColor: Colors.secondaryColor.background,
    });

    fireEvent(getByPlaceholderText(props.placeholder), 'focus');

    expect(getByTestId('iconInputContainer')).toHaveStyle({
      borderColor: Colors.errorColor.background,
    });

    rerender({value: 'Not empty value'});

    expect(getByTestId('iconInputContainer')).toHaveStyle({
      borderColor: Colors.primaryColor.background,
    });
  });

  it('renders input as readonly when requested', () => {
    const {getByPlaceholderText, props} = setupIconInput({readOnly: true});

    expect(getByPlaceholderText(props.placeholder)).toHaveProp(
      'editable',
      false,
    );
  });

  it('should apply custom styles', () => {
    const {getByTestId, props} = setupIconInput({
      style: {backgroundColor: 'blue'},
    });

    expect(getByTestId('iconInputContainer')).toHaveStyle(props.style);
  });
});
