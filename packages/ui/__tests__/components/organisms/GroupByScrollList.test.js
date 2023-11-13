/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {GroupByScrollList, ScrollList, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('GroupByScrollList', () => {
  const mockData = [
    {id: 1, simpleFullName: 'A'},
    {id: 2, simpleFullName: 'B'},
  ];
  const renderItem = jest.fn(({item}) => <Text>{item.simpleFullName}</Text>);
  const fetchData = jest.fn();
  const fetchIndicator = jest.fn(item => ({
    title: 'Group ' + item.group,
    numberItems: 1,
    loading: false,
  }));
  const separatorCondition = (prevItem, currentItem) =>
    prevItem.simpleFullName[0] !== currentItem.simpleFullName[0];

  const props = {
    loadingList: false,
    data: mockData,
    renderItem,
    fetchData,
    moreLoading: false,
    isListEnd: false,
    filter: false,
    horizontal: false,
    disabledRefresh: false,
    separatorCondition,
    fetchIndicator,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<GroupByScrollList {...props} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(ScrollList).prop('data')).toEqual(mockData);
  });

  it('renders ScrollList with the correct props', () => {
    const wrapper = shallow(<GroupByScrollList {...props} />);

    expect(wrapper.find(ScrollList).prop('loadingList')).toBe(
      props.loadingList,
    );
    expect(wrapper.find(ScrollList).prop('data')).toEqual(props.data);
    expect(wrapper.find(ScrollList)).toHaveLength(1);

    expect(wrapper.find(ScrollList).prop('moreLoading')).toBe(
      props.moreLoading,
    );
    expect(wrapper.find(ScrollList).prop('isListEnd')).toBe(props.isListEnd);
    expect(wrapper.find(ScrollList).prop('filter')).toBe(props.filter);
    expect(wrapper.find(ScrollList).prop('horizontal')).toBe(props.horizontal);
    expect(wrapper.find(ScrollList).prop('disabledRefresh')).toBe(
      props.disabledRefresh,
    );

    expect(wrapper.find(ScrollList).prop('fetchData')).toEqual(fetchData);
    expect(wrapper.find(ScrollList).prop('renderItem')).toEqual(
      expect.any(Function),
    );
    wrapper.find(ScrollList).prop('renderItem')({item: mockData[0], index: 0});
    expect(renderItem).toHaveBeenCalledWith({item: mockData[0], index: 0});
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <GroupByScrollList {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(ScrollList).at(0))).toMatchObject(
      customStyle,
    );
  });
});
