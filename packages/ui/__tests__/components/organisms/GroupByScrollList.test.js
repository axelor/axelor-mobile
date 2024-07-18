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
import {GroupByScrollList, ScrollList, Text} from '@axelor/aos-mobile-ui';

describe('GroupByScrollList', () => {
  const data = [
    {id: 1, name: 'Aa'},
    {id: 2, name: 'Ab'},
    {id: 3, name: 'Ba'},
    {id: 3, name: 'Ca'},
    {id: 3, name: 'Cb'},
  ];

  const renderItem = ({item}) => <Text>{item.name}</Text>;
  const fetchData = jest.fn();
  const separatorCondition = (prevItem, currentItem) =>
    prevItem.name[0] !== currentItem.name[0];

  const fetchTopIndicator = jest.fn(currentItem => ({
    title: currentItem.name[0].toUpperCase(),
    numberItems: data.filter(item => item.name[0] === currentItem.name[0])
      .length,
  }));

  const fetchBottomIndicator = jest.fn(prevItem => ({
    text: `Ended of: ${prevItem.name}`,
  }));

  const props = {
    loadingList: false,
    data,
    renderItem,
    fetchData,
    moreLoading: false,
    isListEnd: false,
    filter: false,
    translator: key => key,
    horizontal: false,
    disabledRefresh: false,
    separatorCondition,
    fetchTopIndicator,
    fetchBottomIndicator,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<GroupByScrollList {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render ScrollList with the correct props', () => {
    const wrapper = shallow(<GroupByScrollList {...props} />);

    expect(wrapper.find(ScrollList)).toHaveLength(1);
    expect(wrapper.find(ScrollList).props()).toMatchObject({
      loadingList: props.loadingList,
      data: props.data,
      fetchData: props.fetchData,
      moreLoading: props.moreLoading,
      isListEnd: props.isListEnd,
      filter: props.filter,
      translator: props.translator,
      horizontal: props.horizontal,
      disabledRefresh: props.disabledRefresh,
    });
  });

  it('should render Top and Bottom Separators correctly', () => {
    const wrapper = shallow(<GroupByScrollList {...props} />);

    data.forEach((item, index) => {
      const renderItemElement = wrapper
        .find(ScrollList)
        .renderProp('renderItem')({item, index});

      const prevItem = index !== 0 ? data[index - 1] : null;

      const isFirstItem = index === 0;
      const isLastItem = index === data.length - 1;
      const isSeparator = !isFirstItem && separatorCondition(prevItem, item);

      if (isFirstItem || isLastItem || isSeparator) {
        if (isSeparator) {
          expect(renderItemElement.find('TopSeparator').length).toBe(1);
          expect(fetchTopIndicator).toHaveBeenCalledWith(item);
          expect(renderItemElement.find('BottomSeparator').length).toBe(1);
          expect(fetchBottomIndicator).toHaveBeenCalledWith(prevItem);
        }

        if (isLastItem) {
          expect(renderItemElement.find('BottomSeparator').length).toBe(1);
          expect(fetchBottomIndicator).toHaveBeenCalledWith(item);
        }
      } else {
        expect(renderItemElement.find('TopSeparator').length).toBe(0);
        expect(renderItemElement.find('BottomSeparator').length).toBe(0);
      }
    });
  });
});
