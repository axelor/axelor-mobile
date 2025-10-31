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
import {within} from '@testing-library/react-native';
import {GroupByScrollList} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

const DATA = [
  {id: 1, name: 'Aa'},
  {id: 2, name: 'Ab'},
  {id: 3, name: 'Ba'},
  {id: 4, name: 'Ca'},
  {id: 5, name: 'Cb'},
];

describe('GroupByScrollList Component', () => {
  const setupGroupByScrollList = overrideProps =>
    setup({
      Component: GroupByScrollList,
      baseProps: {
        loadingList: false,
        moreLoading: false,
        isListEnd: false,
        data: DATA,
        renderItem: ({index}) => <View testID={`item-${index}`} />,
        fetchData: jest.fn(),
        translator: key => key,
        separatorCondition: (prevItem, currentItem) =>
          prevItem.name[0] !== currentItem.name[0],
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupGroupByScrollList();

    expect(getByTestId('scrollListContainer')).toBeTruthy();
  });

  it('should render Top and Bottom Separators correctly', () => {
    const {queryAllByTestId, getAllByTestId, props} = setupGroupByScrollList({
      fetchTopIndicator: jest.fn(currentItem => ({
        title: currentItem.name[0].toUpperCase(),
        numberItems: DATA.filter(item => item.name[0] === currentItem.name[0])
          .length,
      })),
      fetchBottomIndicator: jest.fn(prevItem => ({
        text: `Ended of: ${prevItem.name}`,
      })),
    });

    const _groupByItems = getAllByTestId('groupByScrollListItemContainer');

    expect(queryAllByTestId(/^item-.*/)).toHaveLength(props.data.length);
    expect(_groupByItems).toHaveLength(props.data.length);

    props.data.forEach((_i, idx, self) => {
      const prevItem = idx !== 0 ? self[idx - 1] : null;

      const isFirst = idx === 0;
      const isLast = idx === self.length - 1;
      const isSeparator = !isFirst && props.separatorCondition(prevItem, _i);

      if (isFirst || isLast || isSeparator) {
        if (isSeparator) {
          expect(
            within(_groupByItems.at(idx)).getByTestId('topSeparatorContainer'),
          ).toBeTruthy();
          expect(props.fetchTopIndicator).toHaveBeenCalledWith(_i);

          expect(
            within(_groupByItems.at(idx)).getByTestId(
              'bottomSeparatorContainer',
            ),
          ).toBeTruthy();
          expect(props.fetchBottomIndicator).toHaveBeenCalledWith(prevItem);
        }

        if (isLast) {
          expect(
            within(_groupByItems.at(idx)).getByTestId(
              'bottomSeparatorContainer',
            ),
          ).toBeTruthy();
          expect(props.fetchBottomIndicator).toHaveBeenCalledWith(_i);
        }
      } else {
        expect(
          within(_groupByItems.at(idx)).queryByTestId('topSeparatorContainer'),
        ).toBeFalsy();
        expect(
          within(_groupByItems.at(idx)).queryByTestId(
            'bottomSeparatorContainer',
          ),
        ).toBeFalsy();
      }
    });
  });
});
