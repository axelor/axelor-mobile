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
import {Text, View} from 'react-native';
import {within} from '@testing-library/react-native';
import {GroupedCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('GroupedCard Component', () => {
  const setupGroupedCard = overrideProps =>
    setup({
      Component: GroupedCard,
      baseProps: {
        data: ['Item 1', 'Item 2', 'Item 3'],
        renderItem: () => <View testID="renderItem" />,
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupGroupedCard();

    expect(getByTestId('cardContainer')).toBeTruthy();
  });

  it('renders one item per data entry', () => {
    const {getAllByTestId, props} = setupGroupedCard();

    expect(getAllByTestId('groupedCardItem')).toHaveLength(props.data.length);
    expect(getAllByTestId('renderItem')).toHaveLength(props.data.length);
  });

  it('renders a separator between items but not before the first', () => {
    const {getAllByTestId, props} = setupGroupedCard();

    expect(getAllByTestId('horizontalRule')).toHaveLength(props.data.length - 1);
  });

  it('renders a single item without any separator', () => {
    const {getAllByTestId, queryAllByTestId} = setupGroupedCard({
      data: ['Only item'],
    });

    expect(getAllByTestId('groupedCardItem')).toHaveLength(1);
    expect(queryAllByTestId('horizontalRule')).toHaveLength(0);
  });

  it('calls renderItem with the item and its index', () => {
    const renderItem = jest.fn(() => <View testID="renderItem" />);
    setupGroupedCard({renderItem});

    expect(renderItem).toHaveBeenCalledTimes(3);
    expect(renderItem).toHaveBeenNthCalledWith(1, 'Item 1', 0);
    expect(renderItem).toHaveBeenNthCalledWith(2, 'Item 2', 1);
    expect(renderItem).toHaveBeenNthCalledWith(3, 'Item 3', 2);
  });

  it('renders the content returned by renderItem inside each item', () => {
    const {getAllByTestId, props} = setupGroupedCard({
      renderItem: item => <Text>{item}</Text>,
    });

    const _items = getAllByTestId('groupedCardItem');

    props.data.forEach((value, idx) => {
      expect(within(_items.at(idx)).getByText(value)).toBeTruthy();
    });
  });

  it('uses keyExtractor when provided', () => {
    const keyExtractor = jest.fn(item => item);
    const {getByTestId} = setupGroupedCard({keyExtractor});

    expect(getByTestId('cardContainer')).toBeTruthy();
    expect(keyExtractor).toHaveBeenCalledWith('Item 1', 0);
  });

  it('renders nothing when data is empty', () => {
    const {queryByTestId} = setupGroupedCard({data: []});

    expect(queryByTestId('cardContainer')).toBeNull();
  });

  it('renders nothing when data is not an array', () => {
    const {queryByTestId} = setupGroupedCard({data: undefined});

    expect(queryByTestId('cardContainer')).toBeNull();
  });

  it('applies custom style on the card', () => {
    const {getByTestId} = setupGroupedCard({style: {width: 200}});

    expect(getByTestId('cardContainer')).toHaveStyle({width: 200});
  });

  it('applies custom item and rule styles', () => {
    const {getAllByTestId} = setupGroupedCard({
      itemStyle: {paddingVertical: 8},
      ruleStyle: {marginVertical: 4},
    });

    getAllByTestId('groupedCardItem').forEach(_item => {
      expect(_item).toHaveStyle({paddingVertical: 8});
    });
    getAllByTestId('horizontalRule').forEach(_rule => {
      expect(_rule).toHaveStyle({marginVertical: 4});
    });
  });
});
