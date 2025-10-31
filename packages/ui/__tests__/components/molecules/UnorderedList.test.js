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
import {UnorderedList} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('UnorderedList Component', () => {
  const setupUnorderedList = overrideProps =>
    setup({
      Component: UnorderedList,
      baseProps: {
        data: ['Item 1', 'Item 2', 'Item 3'],
        renderItem: () => <View testID="renderItem" />,
        onViewPress: jest.fn(),
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupUnorderedList();

    expect(getByTestId('unorderedListFlatList')).toBeTruthy();
  });

  it('renders the correct number of items', () => {
    const {getAllByTestId, props} = setupUnorderedList();

    expect(getAllByTestId('renderItem')).toHaveLength(props.data.length);
  });

  it('renders the correct number of items when numberOfItems is set', () => {
    const {getAllByTestId, props} = setupUnorderedList({numberOfItems: 2});

    expect(getAllByTestId('renderItem')).toHaveLength(props.numberOfItems);
  });

  it('renders the dot correctly', () => {
    const {getAllByText, getAllByTestId, props} = setupUnorderedList();

    expect(getAllByText('\u2022 ')).toHaveLength(props.data.length);

    const _itemElts = getAllByTestId('unorderedListItemContainer');

    props.data.forEach((_, idx) => {
      const _elt = _itemElts.at(idx);
      expect(within(_elt).getByText('\u2022 ')).toBeTruthy();
      expect(within(_elt).getByTestId('renderItem')).toBeTruthy();
    });
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupUnorderedList({style: {width: 200}});

    expect(getByTestId('unorderedListFlatList')).toHaveStyle(props.customStyle);
  });
});
