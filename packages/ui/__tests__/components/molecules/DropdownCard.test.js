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
import {DropdownCard, Text} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('DropdownCard Component', () => {
  const props = {
    title: 'title',
    children: <Text testID="CHILDREN-CONTENT">Content goes here</Text>,
    dropdownIsOpen: false,
    showIcon: true,
  };

  const setupDropdownCard = overrideProps =>
    setup({
      Component: DropdownCard,
      baseProps: props,
      overrideProps,
    });

  it('should render without crashing', () => {
    expect(() => setupDropdownCard()).not.toThrow();
  });

  it('renders correctly with title and icon', () => {
    const {getByText, getByTestId} = setupDropdownCard();

    expect(getByText(props.title)).toBeTruthy();
    expect(
      getByTestId(
        `icon-${props.dropdownIsOpen ? 'chevron-up' : 'chevron-down'}`,
      ),
    ).toBeTruthy();
  });

  it('renders correctly without icon', () => {
    const {queryByTestId} = setupDropdownCard({showIcon: false});

    expect(queryByTestId('icon-chevron-down')).toBeNull();
    expect(queryByTestId('icon-chevron-up')).toBeNull();
  });

  it('toggles the dropdown on touchable press', () => {
    const {getByTestId, queryByTestId} = setupDropdownCard();

    expect(getByTestId('icon-chevron-down')).toBeTruthy();
    expect(queryByTestId('icon-chevron-up')).toBeNull();
    expect(queryByTestId('dropdownContent')).toBeNull();

    fireEvent.press(getByTestId('dropdownToggle'));

    expect(getByTestId('icon-chevron-up')).toBeTruthy();
    expect(queryByTestId('icon-chevron-down')).toBeNull();
    expect(getByTestId('dropdownContent')).toBeTruthy();

    fireEvent.press(getByTestId('dropdownToggle'));

    expect(getByTestId('icon-chevron-down')).toBeTruthy();
    expect(queryByTestId('icon-chevron-up')).toBeNull();
    expect(queryByTestId('dropdownContent')).toBeNull();
  });

  it('renders children content when DropdownIsOpen prop is true', () => {
    const {getByTestId, getByText} = setupDropdownCard({dropdownIsOpen: true});

    expect(getByText('Content goes here')).toBeTruthy();
    expect(getByTestId('dropdownContent')).toBeTruthy();
  });
});
