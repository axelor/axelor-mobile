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

import React from 'react';
import {Text} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import {GanttView} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('GanttView Component', () => {
  const Colors = getDefaultThemeColors();

  const BODY_LAYOUT = {nativeEvent: {layout: {width: 390, height: 600}}};

  const groups = [
    {
      key: 'dept-1',
      title: 'Development',
      rows: [
        {
          key: '10',
          title: 'Alice Ferrand',
          subtitle: 'T0052',
          items: [
            {
              id: 1,
              startDate: '2026-09-07',
              endDate: '2026-09-09',
              title: 'Paid leave',
              color: Colors.successColor,
            },
          ],
        },
        {key: '11', title: 'Karim Belkacem', subtitle: 'T0060'},
      ],
    },
    {
      key: 'dept-2',
      title: 'Support',
      rows: [{key: '12', title: 'Julien Mercier', subtitle: 'T0049'}],
    },
  ];

  const setupGanttView = overrideProps =>
    setup({
      Component: GanttView,
      baseProps: {
        groups,
        translator: key => key,
        fetchData: jest.fn(),
        isListEnd: true,
      },
      overrideProps,
    });

  /**
   * The grid is only rendered once the container has been measured, so every
   * case that looks at it has to hand the component a width first.
   */
  const setupMeasured = overrideProps => {
    const utils = setupGanttView(overrideProps);

    fireEvent(utils.getByTestId('ganttViewContainer'), 'layout', BODY_LAYOUT);

    return utils;
  };

  it('renders without crashing', () => {
    const {getByTestId} = setupGanttView();

    expect(getByTestId('ganttViewContainer')).toBeTruthy();
  });

  it('renders no grid before the container is measured', () => {
    const {queryByTestId} = setupGanttView();

    expect(queryByTestId('ganttVerticalScroll')).toBeNull();
  });

  it('renders the grid once measured', () => {
    const {getByTestId} = setupMeasured();

    expect(getByTestId('ganttVerticalScroll')).toBeTruthy();
    expect(getByTestId('ganttHorizontalScroll')).toBeTruthy();
  });

  it('asks for the first page on mount', () => {
    const {props} = setupGanttView();

    expect(props.fetchData).toHaveBeenCalledWith(0);
  });

  it('renders a header per group and a row per employee', () => {
    const {getByTestId} = setupMeasured();

    expect(getByTestId('ganttGroupHeader-dept-1')).toBeTruthy();
    expect(getByTestId('ganttGroupHeader-dept-2')).toBeTruthy();
    expect(getByTestId('ganttRowName-10')).toBeTruthy();
    expect(getByTestId('ganttRowName-11')).toBeTruthy();
    expect(getByTestId('ganttRowName-12')).toBeTruthy();
  });

  it('shows the employee name and its reference', () => {
    const {getByText} = setupMeasured();

    expect(getByText('Alice Ferrand')).toBeTruthy();
    expect(getByText('T0052')).toBeTruthy();
  });

  it('collapses a group on press, leaving the others alone', () => {
    const {getByTestId, queryByTestId} = setupMeasured();

    fireEvent.press(getByTestId('ganttGroupHeader-dept-1'));

    expect(queryByTestId('ganttRowName-10')).toBeNull();
    expect(queryByTestId('ganttRowName-11')).toBeNull();
    expect(getByTestId('ganttRowName-12')).toBeTruthy();
    expect(getByTestId('ganttGroupHeader-dept-1')).toBeTruthy();
  });

  it('expands a collapsed group again', () => {
    const {getByTestId} = setupMeasured();

    fireEvent.press(getByTestId('ganttGroupHeader-dept-1'));
    fireEvent.press(getByTestId('ganttGroupHeader-dept-1'));

    expect(getByTestId('ganttRowName-10')).toBeTruthy();
  });

  it('renders a bar for an item and reports its press', () => {
    const onItemPress = jest.fn();
    const {getByTestId} = setupMeasured({onItemPress});

    fireEvent.press(getByTestId('ganttBar-1'));

    expect(onItemPress).toHaveBeenCalledTimes(1);
    expect(onItemPress.mock.calls[0][0].id).toBe(1);
    expect(onItemPress.mock.calls[0][1].key).toBe('10');
  });

  it('reports a row press', () => {
    const onRowPress = jest.fn();
    const {getByTestId} = setupMeasured({onRowPress});

    fireEvent.press(getByTestId('ganttRowName-10'));

    expect(onRowPress).toHaveBeenCalledTimes(1);
    expect(onRowPress.mock.calls[0][0].key).toBe('10');
  });

  it('shows the empty message instead of the grid when no group has rows', () => {
    const {getByText, queryByTestId} = setupMeasured({
      groups: [{key: 'dept-1', title: 'Development', rows: []}],
      emptyMessage: 'No employee',
    });

    expect(getByText('No employee')).toBeTruthy();
    expect(queryByTestId('ganttVerticalScroll')).toBeNull();
  });

  it('keeps the empty state pullable so a failed load can be retried', () => {
    const {getByTestId} = setupMeasured({
      groups: [],
      emptyMessage: 'No employee',
    });

    expect(getByTestId('ganttEmptyScroll')).toBeTruthy();
  });

  // The window spans a year of weeks, so every scale assertion matches many
  // cells: what matters is the shape of the labels, not a single one.
  it('names the weeks and the months in the week zoom', () => {
    const {getAllByText, queryAllByText} = setupMeasured({weekPrefix: 'W'});

    expect(getAllByText(/^W\d+ · /).length).toBeGreaterThan(0);
    expect(queryAllByText(/^W\d+ \d+-\d+$/)).toHaveLength(0);
  });

  it('replaces the day row by week ranges in the month zoom', () => {
    const {getAllByText, queryAllByText} = setupMeasured({
      zoom: 'month',
      weekPrefix: 'W',
    });

    expect(getAllByText(/^W\d+ \d+-\d+$/).length).toBeGreaterThan(0);
    expect(queryAllByText(/^W\d+ · /)).toHaveLength(0);
  });

  it('renders the navigation and the today button by default', () => {
    const {getByTestId} = setupGanttView();

    expect(getByTestId('periodNavigationPrevious')).toBeTruthy();
    expect(getByTestId('periodNavigationToday')).toBeTruthy();
    expect(getByTestId('periodNavigationNext')).toBeTruthy();
  });

  it('hides the navigation on request, keeping the today button', () => {
    const {getByTestId, queryByTestId} = setupGanttView({
      showNavigation: false,
    });

    expect(queryByTestId('periodNavigationPrevious')).toBeNull();
    expect(queryByTestId('periodNavigationNext')).toBeNull();
    expect(getByTestId('periodNavigationToday')).toBeTruthy();
  });

  it('renders the filters given by the screen', () => {
    const {getByText} = setupGanttView({
      filters: <Text>All departments</Text>,
    });

    expect(getByText('All departments')).toBeTruthy();
  });
});
