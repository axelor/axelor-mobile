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
import {ScrollList} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('ScrollList Component', () => {
  const setupScrollList = overrideProps =>
    setup({
      Component: ScrollList,
      baseProps: {
        loadingList: false,
        data: [
          {id: 1, name: 'Item 1'},
          {id: 2, name: 'Item 2'},
        ],
        renderItem: ({index}) => <View testID={`item_${index}`} />,
        fetchData: jest.fn(),
        moreLoading: false,
        isListEnd: false,
        horizontal: true,
        actionList: [
          {iconName: 'plus-lg', title: 'Add', onPress: jest.fn()},
          {iconName: 'check', title: 'Validate', onPress: jest.fn()},
        ],
        verticalActions: false,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupScrollList();

    expect(getByTestId('scrollListContainer')).toBeTruthy();
  });

  it('renders correctly all data with provided renderItem function', () => {
    const {queryAllByTestId, props} = setupScrollList();

    expect(queryAllByTestId(/^item_.*/).length).toBe(props.data.length);
  });

  it('renders TopActions if actionList is provided', () => {
    const {getAllByTestId, getByTestId, props} = setupScrollList();

    expect(getByTestId('topActionsContainer')).toBeTruthy();

    const _actions = getAllByTestId('dottedButtonContainer');
    expect(_actions.length).toBe(props.actionList.length);

    props.actionList.forEach((_a, idx) => {
      expect(within(_actions.at(idx)).getByText(_a.title)).toBeTruthy();
      expect(
        within(_actions.at(idx)).getByTestId(`icon-${_a.iconName}`),
      ).toBeTruthy();

      fireEvent.press(within(_actions.at(idx)).getByTestId('iconTouchable'));
      expect(_a.onPress).toHaveBeenCalled();
    });
  });

  it('does not render TopActions if actionList is empty', () => {
    const {queryByTestId} = setupScrollList({actionList: []});

    expect(queryByTestId('topActionsContainer')).toBeFalsy();
  });
});
