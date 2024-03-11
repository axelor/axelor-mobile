/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {shallow} from 'enzyme';
import {ScrollList} from '@axelor/aos-mobile-ui';
import {FlatList, ActivityIndicator} from 'react-native';

describe('ScrollList Component', () => {
  const props = {
    loadingList: false,
    data: [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ],
    renderItem: jest.fn(),
    fetchData: jest.fn(),
    moreLoading: false,
    isListEnd: false,
    horizontal: true,
    actionList: [{iconName: 'add', title: 'Add', onPress: jest.fn()}],
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<ScrollList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('passes the correct props to FlatList', () => {
    const wrapper = shallow(<ScrollList {...props} />);
    const flatListProps = wrapper.find(FlatList).props();

    expect(flatListProps.data).toEqual(props.data);
    expect(flatListProps.renderItem).toEqual(props.renderItem);
    expect(flatListProps.horizontal).toBe(props.horizontal);
    expect(flatListProps.onEndReached).toEqual(expect.any(Function));
  });

  it('shows ActivityIndicator when loadingList is true', () => {
    const _props = {...props, loadingList: true};
    const wrapper = shallow(<ScrollList {..._props} />);
    expect(wrapper.find(ActivityIndicator).exists()).toBeTruthy();
  });

  it('renders TopActions if actionList is provided', () => {
    const wrapper = shallow(<ScrollList {...props} />);
    expect(wrapper.find('TopActions').exists()).toBeTruthy();
  });

  it('does not render TopActions if actionList is empty', () => {
    const _props = {...props, actionList: []};
    const wrapper = shallow(<ScrollList {..._props} />);
    expect(wrapper.find('TopActions').exists()).toBeFalsy();
  });
});
