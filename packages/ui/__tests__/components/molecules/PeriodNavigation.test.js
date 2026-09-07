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
import {PeriodNavigation} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('PeriodNavigation Component', () => {
  const setupPeriodNavigation = overrideProps =>
    setup({
      Component: PeriodNavigation,
      baseProps: {
        onPrevious: jest.fn(),
        onNext: jest.fn(),
        onToday: jest.fn(),
      },
      overrideProps,
    });

  it('renders the three buttons when every handler is given', () => {
    const {getByTestId} = setupPeriodNavigation();

    expect(getByTestId('periodNavigationPrevious')).toBeTruthy();
    expect(getByTestId('periodNavigationToday')).toBeTruthy();
    expect(getByTestId('periodNavigationNext')).toBeTruthy();
  });

  it('hides a button when its handler is missing', () => {
    const {queryByTestId} = setupPeriodNavigation({
      onPrevious: undefined,
      onNext: undefined,
      onToday: undefined,
    });

    expect(queryByTestId('periodNavigationPrevious')).toBeNull();
    expect(queryByTestId('periodNavigationToday')).toBeNull();
    expect(queryByTestId('periodNavigationNext')).toBeNull();
  });

  it('hides only the today button when it alone has no handler', () => {
    const {getByTestId, queryByTestId} = setupPeriodNavigation({
      onToday: undefined,
    });

    expect(getByTestId('periodNavigationPrevious')).toBeTruthy();
    expect(getByTestId('periodNavigationNext')).toBeTruthy();
    expect(queryByTestId('periodNavigationToday')).toBeNull();
  });

  it('calls the matching handler on each press', () => {
    const {getByTestId, props} = setupPeriodNavigation();

    fireEvent.press(getByTestId('periodNavigationPrevious'));
    expect(props.onPrevious).toHaveBeenCalledTimes(1);

    fireEvent.press(getByTestId('periodNavigationToday'));
    expect(props.onToday).toHaveBeenCalledTimes(1);

    fireEvent.press(getByTestId('periodNavigationNext'));
    expect(props.onNext).toHaveBeenCalledTimes(1);
  });

  it('disables the chevrons independently', () => {
    const {getByTestId} = setupPeriodNavigation({
      previousDisabled: true,
      nextDisabled: false,
    });

    expect(
      getByTestId('periodNavigationPrevious').props.accessibilityState.disabled,
    ).toBe(true);
    expect(
      getByTestId('periodNavigationNext').props.accessibilityState.disabled,
    ).toBe(false);
  });

  it('renders no label by default', () => {
    const {queryByText} = setupPeriodNavigation();

    expect(queryByText('Sept. 7 - 13')).toBeNull();
  });

  it('renders the label when one is given', () => {
    const {getByText} = setupPeriodNavigation({label: 'Sept. 7 - 13'});

    expect(getByText('Sept. 7 - 13')).toBeTruthy();
  });

  it('lets the label take the free space so the buttons stay grouped right', () => {
    const {getByText} = setupPeriodNavigation({label: 'Sept. 7 - 13'});

    expect(getByText('Sept. 7 - 13')).toHaveStyle({flex: 1});
  });

  it('forwards the size to the buttons', () => {
    const {getByTestId} = setupPeriodNavigation({size: 26});

    expect(getByTestId('periodNavigationToday')).toHaveStyle({
      width: 26,
      height: 26,
    });
  });
});
