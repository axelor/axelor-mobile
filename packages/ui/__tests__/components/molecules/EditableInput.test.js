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
import {EditableInput} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('EditableInput Component', () => {
  const baseProps = {
    placeholder: 'Enter text',
    onValidate: jest.fn(),
    defaultValue: 'Initial value',
  };

  const setupEditableInput = overrideProps =>
    setup({
      Component: EditableInput,
      baseProps,
      overrideProps,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render readonly input with pencil icon by default', () => {
    const {getByDisplayValue, getByTestId} = setupEditableInput();

    const input = getByDisplayValue(baseProps.defaultValue);
    expect(input.props.editable).toBe(false);
    expect(getByTestId('icon-pencil-fill')).toBeTruthy();
  });

  it('toggles to editable mode and back, validating with latest value', () => {
    const {getByDisplayValue, getByTestId, props} = setupEditableInput({
      onValidate: jest.fn(),
    });

    fireEvent.press(getByTestId('iconTouchable'));

    expect(getByTestId('icon-check-lg')).toBeTruthy();

    const newValue = 'New Value';
    fireEvent.changeText(getByDisplayValue(baseProps.defaultValue), newValue);

    fireEvent.press(getByTestId('iconTouchable'));

    expect(getByTestId('icon-pencil-fill')).toBeTruthy();
    expect(getByDisplayValue(newValue).props.editable).toBe(false);
    expect(props.onValidate).toHaveBeenCalledWith(newValue);
  });

  it('supports multiline input when requested', () => {
    const {getByDisplayValue} = setupEditableInput({
      multiline: true,
      numberOfLines: 3,
    });

    const inputProps = getByDisplayValue(baseProps.defaultValue).props;
    expect(inputProps.multiline).toBe(true);
    expect(inputProps.numberOfLines).toBe(3);
  });
});
