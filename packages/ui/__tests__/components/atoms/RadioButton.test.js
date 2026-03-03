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

import {fireEvent} from '@testing-library/react-native';
import {RadioButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('RadioButton Component', () => {
  const Colors = getDefaultThemeColors();

  const setupRadioButton = overrideProps =>
    setup({
      Component: RadioButton,
      baseProps: {
        title: 'Option 1',
        onPress: jest.fn(),
        selected: false,
      },
      overrideProps,
    });

  it('renders the correct title', () => {
    const {getByText, props} = setupRadioButton();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const {getByRole, props} = setupRadioButton({onPress: jest.fn()});

    fireEvent.press(getByRole('button'));
    expect(props.onPress).toHaveBeenCalled();
  });

  it('applies normal styles when `selected` is false', () => {
    const {queryByTestId} = setupRadioButton({selected: false});

    expect(queryByTestId('radio')).toBeFalsy();
  });

  it('applies selected styles when `selected` is true', () => {
    const {getByTestId} = setupRadioButton({selected: true});

    expect(getByTestId('radio')).toHaveStyle({
      backgroundColor: Colors.primaryColor.background,
    });
  });

  it('renders a disabled component when `readonly` is true', () => {
    const {getByRole, props} = setupRadioButton({
      readonly: true,
      onPress: jest.fn(),
    });

    fireEvent.press(getByRole('button'));
    expect(props.onPress).not.toHaveBeenCalled();
  });
});
