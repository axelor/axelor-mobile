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
import {DropdownCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('DropdownCard Component', () => {
  const setupDropdownCard = overrideProps =>
    setup({
      Component: DropdownCard,
      baseProps: {
        title: 'title',
        children: <View testID="mocked_children" />,
        dropdownIsOpen: false,
        showIcon: true,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupDropdownCard();

    expect(getByTestId('dropdownCardContainer')).toBeTruthy();
  });

  it('renders correctly with title and icon', () => {
    const {getByText, getByTestId, props} = setupDropdownCard();

    expect(getByText(props.title)).toBeTruthy();
    expect(
      getByTestId(
        `icon-${props.dropdownIsOpen ? 'chevron-up' : 'chevron-down'}`,
      ),
    ).toBeTruthy();
  });

  it('renders correctly without icon', () => {
    const {queryByTestId} = setupDropdownCard({showIcon: false});

    expect(queryByTestId('icon-chevron-down')).toBeFalsy();
    expect(queryByTestId('icon-chevron-up')).toBeFalsy();
  });

  it('toggles the dropdown on touchable press', () => {
    const {queryByTestId} = setupDropdownCard();

    expect(queryByTestId('icon-chevron-down')).toBeTruthy();
    expect(queryByTestId('icon-chevron-up')).toBeFalsy();
    expect(queryByTestId('cardContainer')).toBeFalsy();

    fireEvent.press(queryByTestId('dropdownCardTouchable'));

    expect(queryByTestId('icon-chevron-down')).toBeFalsy();
    expect(queryByTestId('icon-chevron-up')).toBeTruthy();
    expect(queryByTestId('cardContainer')).toBeTruthy();

    fireEvent.press(queryByTestId('dropdownCardTouchable'));

    expect(queryByTestId('icon-chevron-down')).toBeTruthy();
    expect(queryByTestId('icon-chevron-up')).toBeFalsy();
    expect(queryByTestId('cardContainer')).toBeFalsy();
  });

  it('invokes onPress on touch when provided', () => {
    const {queryByTestId, props} = setupDropdownCard({onPress: jest.fn()});

    fireEvent.press(queryByTestId('dropdownCardTouchable'));
    expect(props.onPress).toHaveBeenCalledTimes(1);
  });

  it('renders children content when DropdownIsOpen prop is true', () => {
    const {getByTestId} = setupDropdownCard({dropdownIsOpen: true});

    expect(getByTestId('mocked_children')).toBeTruthy();
  });
});
