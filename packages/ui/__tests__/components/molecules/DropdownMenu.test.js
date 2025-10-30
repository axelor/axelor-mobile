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
import {fireEvent} from '@testing-library/react-native';
import {DropdownMenu} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('DropdownMenu Component', () => {
  const setupDropdownMenu = overrideProps =>
    setup({
      Component: DropdownMenu,
      baseProps: {children: <View testID="mocked_children" />},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupDropdownMenu();

    expect(getByTestId('dropdownMenuContainer')).toBeTruthy();
  });

  it('renders children when visible is true', () => {
    const {getByTestId} = setupDropdownMenu();

    fireEvent.press(getByTestId('dropdownMenuTouchable'));

    expect(getByTestId('cardContainer')).toBeTruthy();
    expect(getByTestId('mocked_children')).toBeTruthy();
  });

  it('toggles visibility when action button is pressed', () => {
    const {getByTestId, queryByTestId} = setupDropdownMenu();

    expect(queryByTestId('cardContainer')).toBeFalsy();

    fireEvent.press(getByTestId('dropdownMenuTouchable'));

    expect(getByTestId('cardContainer')).toBeTruthy();
    expect(getByTestId('mocked_children')).toBeTruthy();

    fireEvent.press(getByTestId('dropdownMenuTouchable'));

    expect(queryByTestId('cardContainer')).toBeFalsy();
  });

  it('should apply custom styles', () => {
    const {getByTestId, props} = setupDropdownMenu({
      style: {backgroundColor: 'blue'},
    });

    expect(getByTestId('dropdownMenuContainer')).toHaveStyle(props.style);
  });
});
