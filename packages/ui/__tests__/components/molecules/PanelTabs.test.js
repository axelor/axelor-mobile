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
import {View} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import {PanelTabs} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('PanelTabs Component', () => {
  const setupPanelTabs = overrideProps =>
    setup({
      Component: PanelTabs,
      baseProps: {
        tabs: [
          {
            key: 1,
            title: 'Page1',
            isActive: false,
            component: <View testID="mocked_page1" />,
            translator: jest.fn(),
          },
          {
            key: 2,
            title: 'Page2',
            isActive: true,
            component: <View testID="mocked_page2" />,
            translator: jest.fn(),
          },
          {
            key: 3,
            title: 'Page3',
            isActive: false,
            disabled: true,
            component: <View testID="mocked_page3" />,
            translator: jest.fn(),
          },
        ],
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupPanelTabs();

    expect(getByTestId('panelTabsContainer')).toBeTruthy();
  });

  it('should render 3 tabs', () => {
    const {getAllByTestId} = setupPanelTabs();

    expect(getAllByTestId('tabTouchable')).toHaveLength(3);
  });

  it('should render the component of active tab (tab 2)', () => {
    const {getByTestId} = setupPanelTabs();

    expect(getByTestId('mocked_page2')).toBeTruthy();
  });

  it('should render disabled tab when disabled prop is true', () => {
    const {queryByTestId, getAllByTestId} = setupPanelTabs();

    expect(queryByTestId('mocked_page1')).toBeFalsy();
    expect(queryByTestId('mocked_page2')).toBeTruthy();
    expect(queryByTestId('mocked_page3')).toBeFalsy();

    fireEvent.press(getAllByTestId('tabTouchable').at(0));

    expect(queryByTestId('mocked_page1')).toBeTruthy();
    expect(queryByTestId('mocked_page2')).toBeFalsy();
    expect(queryByTestId('mocked_page3')).toBeFalsy();

    fireEvent.press(getAllByTestId('tabTouchable').at(2));

    expect(queryByTestId('mocked_page1')).toBeTruthy();
    expect(queryByTestId('mocked_page2')).toBeFalsy();
    expect(queryByTestId('mocked_page3')).toBeFalsy();
  });
});
