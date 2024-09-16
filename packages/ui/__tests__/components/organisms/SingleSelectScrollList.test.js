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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {ScrollList, SingleSelectScrollList} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('SingleSelectScrollList Component', () => {
  const mockData = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
  ];
  const renderItem = jest.fn(item => <View>{item.name}</View>);

  const props = {
    loading: false,
    moreLoading: false,
    isListEnd: true,
    data: mockData,
    onChange: jest.fn(),
    renderItem,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<SingleSelectScrollList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('triggers function on item selection', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <SingleSelectScrollList {...props} onChange={onChange} />,
    );

    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[0], index: 0})
      .simulate('press');

    expect(onChange).toHaveBeenNthCalledWith(1, mockData[0]);

    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[1], index: 1})
      .simulate('press');

    expect(onChange).toHaveBeenNthCalledWith(2, mockData[1]);
  });

  it('renders each item with a radio button', () => {
    const wrapper = shallow(<SingleSelectScrollList {...props} />);

    mockData.forEach((item, index) => {
      const itemRender = wrapper.find(ScrollList).renderProp('renderItem')({
        item,
        index,
      });

      expect(itemRender.find(View).length).toBeGreaterThan(3);
      expect(itemRender.contains(renderItem({item, index}))).toBe(true);
    });
  });

  it('passes loading props to ScrollList', () => {
    const additionalProps = {
      loadingList: true,
      moreLoading: true,
      isListEnd: true,
    };
    const wrapper = shallow(
      <SingleSelectScrollList {...props} {...additionalProps} />,
    );

    expect(wrapper.find(ScrollList).props()).toMatchObject(additionalProps);
  });

  it('should apply custom style on row when provided', () => {
    const customStyle = {marginHorizontal: 15, marginVertical: 20, padding: 10};
    const wrapper = shallow(
      <SingleSelectScrollList {...props} rowStyle={customStyle} />,
    );

    mockData.forEach((item, index) => {
      const itemRender = wrapper.find(ScrollList).renderProp('renderItem')({
        item,
        index,
      });

      expect(getGlobalStyles(itemRender.find(TouchableOpacity))).toMatchObject(
        customStyle,
      );
    });
  });

  it('should apply custom style to ScrollList', () => {
    const customStyleScrollList = {margin: 10};
    const wrapper = shallow(
      <SingleSelectScrollList {...props} scrollStyle={customStyleScrollList} />,
    );

    expect(getGlobalStyles(wrapper.find(ScrollList))).toMatchObject(
      customStyleScrollList,
    );
  });
});
