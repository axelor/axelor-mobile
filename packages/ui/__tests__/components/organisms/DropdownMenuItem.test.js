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
import {View} from 'react-native';
import {fireEvent, within} from '@testing-library/react-native';
import {DropdownMenuItem} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('DropdownMenuItem Component', () => {
  const Colors = getDefaultThemeColors();

  const setupDropdownMenuItem = overrideProps =>
    setup({
      Component: DropdownMenuItem,
      baseProps: {
        placeholder: 'Placeholder',
        onPress: jest.fn(),
        icon: 'plus-lg',
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupDropdownMenuItem();

    expect(getByTestId('dropdownMenuItemTouchable')).toBeTruthy();
  });

  it('should render the placeholder', () => {
    const {getByText, props} = setupDropdownMenuItem();

    expect(getByText(props.placeholder)).toBeTruthy();
  });

  it('should call onPress when TouchableOpacity is pressed', () => {
    const {getByTestId, props} = setupDropdownMenuItem({onPress: jest.fn()});

    fireEvent.press(getByTestId('dropdownMenuItemTouchable'));
    expect(props.onPress).toHaveBeenCalledTimes(1);
  });

  it('should render an Icon with the right icon and color  values', () => {
    const {getByTestId, props} = setupDropdownMenuItem({
      color: Colors.primaryColor.background,
    });

    expect(getByTestId(`icon-${props.icon}`)).toBeTruthy();
    expect(getByTestId(`icon-${props.icon}`).props.fill).toBe(props.color);
  });

  it('should render Badge component with the right title if indicator > 0', () => {
    const {getByTestId, props} = setupDropdownMenuItem({indicator: 3});

    expect(getByTestId('bagdeContainer')).toBeTruthy();
    expect(
      within(getByTestId('bagdeContainer')).getByText(`${props.indicator}`),
    ).toBeTruthy();
  });

  it('should not render if hideIf is true', () => {
    const {queryByTestId, props} = setupDropdownMenuItem({
      hideIf: true,
    });

    expect(queryByTestId('dropdownMenuItemTouchable')).toBeFalsy();
  });

  it('should render a disabled component if disableIf is true', () => {
    const {getByTestId, props} = setupDropdownMenuItem({
      disableIf: true,
      onPress: jest.fn(),
    });

    expect(getByTestId(`icon-${props.icon}`).props.fill).toBe(
      Colors.secondaryColor.background,
    );

    fireEvent.press(getByTestId('dropdownMenuItemTouchable'));
    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('should render a custom component instead of Icon if provided', () => {
    const {getByTestId, queryByTestId, props} = setupDropdownMenuItem({
      customComponent: <View testID="customComponent" />,
    });

    expect(getByTestId('customComponent')).toBeTruthy();
    expect(queryByTestId('iconTouchable')).toBeFalsy();
  });
});
