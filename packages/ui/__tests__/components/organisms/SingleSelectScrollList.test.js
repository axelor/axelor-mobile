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
import {SingleSelectScrollList} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('SingleSelectScrollList Component', () => {
  const setupSingleSelectScrollList = overrideProps =>
    setup({
      Component: SingleSelectScrollList,
      baseProps: {
        loading: false,
        moreLoading: false,
        isListEnd: true,
        data: [
          {id: 1, name: 'Item 1'},
          {id: 2, name: 'Item 2'},
        ],
        onChange: jest.fn(),
        renderItem: jest.fn(() => <View testID="itemRender" />),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupSingleSelectScrollList();

    expect(getByTestId('scrollListContainer')).toBeTruthy();
  });

  it('triggers function on item selection', () => {
    const {getByTestId, props} = setupSingleSelectScrollList({
      onChange: jest.fn(),
    });

    fireEvent.press(getByTestId(`singleSelectScrollListItemContainer-${0}`));
    expect(props.onChange).toHaveBeenNthCalledWith(1, props.data[0]);

    fireEvent.press(getByTestId(`singleSelectScrollListItemContainer-${1}`));
    expect(props.onChange).toHaveBeenNthCalledWith(2, props.data[1]);
  });

  it('renders each item with a radio button', () => {
    const {queryAllByTestId, props} = setupSingleSelectScrollList();

    expect(
      queryAllByTestId(/^singleSelectScrollListItemContainer-.*/).length,
    ).toBe(props.data.length);

    expect(queryAllByTestId(/^singleSelectScrollListItemRadio-.*/).length).toBe(
      props.data.length,
    );

    expect(queryAllByTestId('itemRender').length).toBe(props.data.length);
  });

  it('should apply custom style on row when provided', () => {
    const {getByTestId, props} = setupSingleSelectScrollList({
      rowStyle: {marginHorizontal: 15, marginVertical: 20, padding: 10},
    });

    props.data.forEach((_, index) => {
      expect(
        getByTestId(`singleSelectScrollListItemContainer-${index}`),
      ).toHaveStyle(props.rowStyle);
    });
  });

  it('should apply custom style to ScrollList', () => {
    const {getByTestId, props} = setupSingleSelectScrollList({
      scrollStyle: {margin: 10},
    });

    expect(getByTestId('scrollListAnimatedList')).toHaveStyle(
      props.scrollStyle,
    );
  });
});
