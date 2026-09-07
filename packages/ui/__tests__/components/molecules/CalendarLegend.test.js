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
import {CalendarLegend} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('CalendarLegend Component', () => {
  const Colors = getDefaultThemeColors();

  const items = [
    {key: 'validated', title: 'Validated', color: Colors.successColor},
    {key: 'refused', title: 'Refused', color: Colors.errorColor},
  ];

  const setupCalendarLegend = overrideProps =>
    setup({
      Component: CalendarLegend,
      baseProps: {
        items,
        translator: key => key,
        onTodayPress: jest.fn(),
      },
      overrideProps,
    });

  it('renders the toggle without expanding the items', () => {
    const {getByText, queryByText} = setupCalendarLegend();

    expect(getByText('Base_Legend')).toBeTruthy();
    expect(queryByText('Validated')).toBeNull();
  });

  it('reveals every item on toggle, and hides them again', () => {
    const {getByText, queryByText} = setupCalendarLegend();

    fireEvent.press(getByText('Base_Legend'));

    expect(getByText('Validated')).toBeTruthy();
    expect(getByText('Refused')).toBeTruthy();

    fireEvent.press(getByText('Base_Legend'));

    expect(queryByText('Validated')).toBeNull();
  });

  it('renders no toggle when there is no item', () => {
    const {queryByText} = setupCalendarLegend({items: []});

    expect(queryByText('Base_Legend')).toBeNull();
  });

  it('renders nothing at all without items nor today button', () => {
    const {queryByText, queryByTestId} = setupCalendarLegend({
      items: undefined,
      showTodayButton: false,
    });

    expect(queryByText('Base_Legend')).toBeNull();
    expect(queryByTestId('periodNavigationToday')).toBeNull();
  });

  it('shows the today button by default and forwards its press', () => {
    const {getByTestId, props} = setupCalendarLegend();

    fireEvent.press(getByTestId('periodNavigationToday'));

    expect(props.onTodayPress).toHaveBeenCalledTimes(1);
  });

  it('hides the today button on request', () => {
    const {queryByTestId} = setupCalendarLegend({showTodayButton: false});

    expect(queryByTestId('periodNavigationToday')).toBeNull();
  });

  it('shows the navigation only when handlers are given', () => {
    const {queryByTestId} = setupCalendarLegend();

    expect(queryByTestId('periodNavigationPrevious')).toBeNull();
    expect(queryByTestId('periodNavigationNext')).toBeNull();
  });

  it('forwards the navigation presses', () => {
    const onPreviousPress = jest.fn();
    const onNextPress = jest.fn();
    const {getByTestId} = setupCalendarLegend({onPreviousPress, onNextPress});

    fireEvent.press(getByTestId('periodNavigationPrevious'));
    fireEvent.press(getByTestId('periodNavigationNext'));

    expect(onPreviousPress).toHaveBeenCalledTimes(1);
    expect(onNextPress).toHaveBeenCalledTimes(1);
  });

  it('paints each swatch with the colors of its item', () => {
    const {getByText, getByTestId} = setupCalendarLegend();

    fireEvent.press(getByText('Base_Legend'));

    expect(getByTestId('calendarLegendSwatch-validated')).toHaveStyle({
      backgroundColor: Colors.successColor.background_light,
      borderColor: Colors.successColor.background,
    });
    expect(getByTestId('calendarLegendSwatch-refused')).toHaveStyle({
      backgroundColor: Colors.errorColor.background_light,
      borderColor: Colors.errorColor.background,
    });
  });
});
