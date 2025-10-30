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
  const setupEditableInput = overrideProps =>
    setup({
      Component: EditableInput,
      baseProps: {
        placeholder: 'Enter text',
        onValidate: jest.fn(),
        defaultValue: 'Initial value',
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupEditableInput();

    expect(getByTestId('editableInput')).toBeTruthy();
  });

  it('should render readonly input with pencil icon by default', () => {
    const {getByTestId} = setupEditableInput();

    expect(getByTestId('editableInput').props.editable).toBe(false);
    expect(getByTestId('icon-pencil-fill')).toBeTruthy();
  });

  it('toggles to editable mode and back, validating with latest value', () => {
    const {getByTestId, props} = setupEditableInput({onValidate: jest.fn()});

    fireEvent.press(getByTestId('editableInputToggle'));

    expect(getByTestId('icon-check-lg')).toBeTruthy();

    const newValue = 'New Value';
    fireEvent.changeText(getByTestId('editableInput'), newValue);
    fireEvent.press(getByTestId('editableInputToggle'));
    expect(props.onValidate).toHaveBeenCalledWith(newValue);

    expect(getByTestId('icon-pencil-fill')).toBeTruthy();
    expect(getByTestId('editableInput').props.editable).toBe(false);
  });

  it('supports multiline input when requested', () => {
    const {getByTestId} = setupEditableInput({
      multiline: true,
      numberOfLines: 3,
    });

    expect(getByTestId('editableInput').props.multiline).toBe(true);
    expect(getByTestId('editableInput').props.numberOfLines).toBe(3);
  });
});
