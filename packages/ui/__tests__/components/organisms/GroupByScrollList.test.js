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
  const data = [
    {id: 1, name: 'Aa'},
    {id: 2, name: 'Ab'},
    {id: 3, name: 'Bb'},
  ];
  const renderItem = ({item}) => <Text>{item.name}</Text>;
  const fetchData = jest.fn();
  const fetchIndicator = jest.fn(currentItem => ({
    title: currentItem.name[0].toUpperCase(),
    numberItems: data.filter(item => item.name[0] === currentItem.name[0])
      .length,
    loading: false,
  }));
  const separatorCondition = (prevItem, currentItem) =>
    prevItem.name[0] !== currentItem.name[0];

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
    fetchIndicator,
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

  it('should render Separator at the beginning and when separatorCondition return true', () => {
    const wrapper = shallow(<GroupByScrollList {...props} />);

    for (let i = 0; i < data.length; i++) {
      const renderItemElement = wrapper
        .find(ScrollList)
        .renderProp('renderItem')({
        item: data[i],
        index: i,
      });
      let prevItem = null;
      if (i !== 0) {
        prevItem = data[i - 1];
      }
      if (i === 0 || separatorCondition(prevItem, data[i])) {
        expect(renderItemElement.find('Separator').length).toBe(1);
        expect(props.fetchIndicator).toHaveBeenCalledWith(data[i]);
      } else {
        expect(renderItemElement.find('Separator').length).toBe(0);
      }
    }
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <GroupByScrollList {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(ScrollList))).toMatchObject(
      customStyle,
    );
  });
});
