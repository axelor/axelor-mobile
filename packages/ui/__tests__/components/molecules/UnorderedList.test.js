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
import {FlatList} from 'react-native';
import {shallow} from 'enzyme';
import {Text, UnorderedList} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('UnorderedList', () => {
  const props = {
    data: ['Item 1', 'Item 2', 'Item 3'],
    renderItem: item => <Text>{item}</Text>,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<UnorderedList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of items', () => {
    const wrapper = shallow(<UnorderedList {...props} />);

    expect(wrapper.find('FlatList').prop('data')).toHaveLength(
      props.data.length,
    );
  });

  it('renders the correct number of items when numberOfItems is set', () => {
    const numberOfItems = 2;
    const wrapper = shallow(
      <UnorderedList {...props} numberOfItems={numberOfItems} />,
    );

    expect(wrapper.find('FlatList').prop('data')).toHaveLength(numberOfItems);
  });

  it('renders the dot correctly', () => {
    const wrapper = shallow(<UnorderedList {...props} />);

    const listItems = wrapper
      .find('FlatList')
      .renderProp('renderItem')({item: props.data[0]})
      .shallow();

    expect(listItems.find(Text).at(0).prop('children')).toBe('\u2022 ');
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<UnorderedList {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(FlatList))).toMatchObject(customStyle);
  });
});
