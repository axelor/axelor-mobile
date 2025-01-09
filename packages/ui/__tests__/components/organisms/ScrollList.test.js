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
import {shallow} from 'enzyme';
import {ScrollList, TopActions} from '@axelor/aos-mobile-ui';

describe('ScrollList Component', () => {
  const props = {
    loadingList: false,
    data: [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ],
    renderItem: ({index}) => <View testID={`item_${index}`} />,
    fetchData: jest.fn(),
    moreLoading: false,
    isListEnd: false,
    horizontal: true,
    actionList: [{iconName: 'add', title: 'Add', onPress: jest.fn()}],
    verticalActions: false,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<ScrollList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('passes the correct props to FlatList', () => {
    const renderItem = jest.fn();
    const wrapper = shallow(<ScrollList {...props} renderItem={renderItem} />);
    const animatedFlatList = wrapper.find('ForwardRef').at(1);

    expect(animatedFlatList.props()).toMatchObject({
      data: props.data,
      horizontal: props.horizontal,
    });

    props.data.forEach((item, index) => {
      animatedFlatList.props().renderItem({item, index});
    });

    expect(renderItem).toHaveBeenCalledTimes(props.data.length);
  });

  it('renders TopActions if actionList is provided', () => {
    const wrapper = shallow(<ScrollList {...props} />);

    const animatedFlatList = wrapper.find('ForwardRef').at(1);

    props.data.forEach((item, index) => {
      const itemWrapper = animatedFlatList.props().renderItem({item, index});
      expect(itemWrapper.props.children.length).toBe(2);

      if (index === 0) {
        expect(itemWrapper.props.children[0]).toMatchObject({
          type: TopActions,
          props: {
            actionList: props.actionList,
            verticalActions: props.verticalActions,
          },
        });
      } else {
        expect(itemWrapper.props.children[0]).toBe(false);
      }

      expect(itemWrapper.props.children[1]).toMatchObject({
        type: View,
        props: {
          testID: `item_${index}`,
        },
      });
    });

    const emptyWrapper = shallow(<ScrollList {...props} data={[]} />);
    expect(emptyWrapper.find(TopActions).exists()).toBe(true);
  });

  it('does not render TopActions if actionList is empty', () => {
    const wrapper = shallow(<ScrollList {...props} actionList={[]} />);

    const animatedFlatList = wrapper.find('ForwardRef').at(1);

    props.data.forEach((item, index) => {
      const itemWrapper = animatedFlatList.props().renderItem({item, index});
      expect(itemWrapper.props.children.length).toBe(2);
      expect(itemWrapper.props.children[0]).toBeFalsy();
      expect(itemWrapper.props.children[1]).toMatchObject({
        type: View,
        props: {
          testID: `item_${index}`,
        },
      });
    });
  });
});
