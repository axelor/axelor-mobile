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
import {BottomBar} from '@axelor/aos-mobile-ui';
import {getVisibleItems} from '../../../src/components/templates/BottomBar/display.helper';
import {getDefaultThemeColors, setup} from '../../tools';

const Screen = ({testID}) => <View testID={testID} />;

describe('BottomBar Component', () => {
  const Colors = getDefaultThemeColors();

  const setupBottomBar = overrideProps =>
    setup({
      Component: BottomBar,
      baseProps: {
        items: [
          {
            iconName: 'house',
            testID: 'view1-home',
            viewComponent: <Screen testID="view1-home" />,
            color: Colors.secondaryColor_dark,
          },
          {
            iconName: 'clock-history',
            testID: 'view2-clock',
            viewComponent: <Screen testID="view2-clock" />,
            indicator: 5,
            color: Colors.plannedColor,
          },
          {
            iconName: 'trash',
            testID: 'view3-trash',
            viewComponent: <Screen testID="view3-trash" />,
            color: Colors.infoColor,
            hidden: true,
          },
          {
            iconName: 'x-lg',
            testID: 'view4-x',
            viewComponent: <Screen testID="view4-x" />,
            color: Colors.progressColor,
          },
          {
            iconName: 'person-fill',
            testID: 'view5-person',
            viewComponent: <Screen testID="view5-person" />,
          },
        ],
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupBottomBar();

    expect(getByTestId('bottomBarViewComtainer')).toBeTruthy();
    expect(getByTestId('bottomBarComtainer')).toBeTruthy();
  });

  it('should correctly render the BarItem component', () => {
    const {queryAllByTestId, queryByTestId, props} = setupBottomBar();

    expect(queryAllByTestId(/^bar-item-.*/).length).toBe(
      getVisibleItems(props.items).length,
    );

    props.items.forEach(_i => {
      if (_i.hidden) {
        expect(queryByTestId(`bar-item-${_i.testID}`)).toBeFalsy();
      } else {
        expect(queryByTestId(`bar-item-${_i.testID}`)).toBeTruthy();
      }
    });
  });

  it('should render the selected view', () => {
    const {getByTestId, getAllByRole, props} = setupBottomBar();
    const visibleItems = getVisibleItems(props.items);

    expect(getByTestId(visibleItems[0].testID)).toBeTruthy();

    fireEvent.press(getAllByRole('button')?.[3]);
    expect(getByTestId(visibleItems[3].testID)).toBeTruthy();
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupBottomBar({style: {marginBottom: 10}});

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });
});
