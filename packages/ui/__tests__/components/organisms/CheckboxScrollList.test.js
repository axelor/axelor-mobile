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
import {CheckboxScrollList, ScrollList, Checkbox} from '@axelor/aos-mobile-ui';

describe('CheckboxScrollList Component', () => {
  const mockData = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
  ];
  const renderItem = jest.fn(item => <View>{item.name}</View>);

  const props = {
    data: mockData,
    onCheckedChange: jest.fn(),
    renderItem,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles all items when main checkbox is clicked', () => {
    const onCheckedChange = jest.fn();
    const wrapper = shallow(
      <CheckboxScrollList {...props} onCheckedChange={onCheckedChange} />,
    );

    wrapper.find(Checkbox).at(0).simulate('change', true);
    expect(onCheckedChange).toHaveBeenNthCalledWith(1, mockData);

    wrapper.find(Checkbox).at(0).simulate('change', false);
    expect(onCheckedChange).toHaveBeenNthCalledWith(2, []);
  });

  it('toggles individual items', () => {
    const onCheckedChange = jest.fn();
    const wrapper = shallow(
      <CheckboxScrollList {...props} onCheckedChange={onCheckedChange} />,
    );

    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[0], index: 0})
      .find(Checkbox)
      .simulate('change', true);
    expect(onCheckedChange).toHaveBeenNthCalledWith(1, [mockData[0]]);

    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[1], index: 1})
      .find(Checkbox)
      .simulate('change', true);
    expect(onCheckedChange).toHaveBeenNthCalledWith(2, [
      mockData[0],
      mockData[1],
    ]);

    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[0], index: 0})
      .find(Checkbox)
      .simulate('change', false);
    expect(onCheckedChange).toHaveBeenNthCalledWith(3, [mockData[1]]);
  });

  it('set isDefaultPartialChecked and isDefaultChecked props of main checkbox depends of checked items', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);

    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[0], index: 0})
      .find(Checkbox)
      .simulate('change', true);
    expect(wrapper.find(Checkbox).at(0).prop('isDefaultPartialChecked')).toBe(
      true,
    );
    expect(wrapper.find(Checkbox).at(0).prop('isDefaultChecked')).toBe(false);

    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[1], index: 1})
      .find(Checkbox)
      .simulate('change', true);
    expect(wrapper.find(Checkbox).at(0).prop('isDefaultPartialChecked')).toBe(
      false,
    );
    expect(wrapper.find(Checkbox).at(0).prop('isDefaultChecked')).toBe(true);
  });

  it('renders each item with a checkbox', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);

    mockData.forEach((item, index) => {
      const itemRender = wrapper.find(ScrollList).renderProp('renderItem')({
        item,
        index,
      });

      expect(itemRender.find(Checkbox).exists()).toBe(true);
      expect(itemRender.contains(renderItem({item, index}))).toBe(true);
    });
  });

  it('passes loadingList, moreLoading, isListEnd, filter, horizontal, disabledRefresh props to ScrollList', () => {
    const additionalProps = {
      loadingList: true,
      moreLoading: true,
      isListEnd: true,
      filter: true,
      horizontal: true,
      disabledRefresh: true,
    };
    const wrapper = shallow(
      <CheckboxScrollList {...props} {...additionalProps} />,
    );

    expect(wrapper.find(ScrollList).props()).toMatchObject(additionalProps);
  });

  it('should apply custom style checkbox width when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <CheckboxScrollList {...props} styleTopCheckbox={customStyle} />,
    );

    expect(wrapper.find(Checkbox).prop('style')).toContain(customStyle);
  });

  it('should apply custom style to ScrollList', () => {
    const customStyleScrollList = {margin: 10};
    const wrapper = shallow(
      <CheckboxScrollList {...props} styleScrollList={customStyleScrollList} />,
    );

    expect(wrapper.find(ScrollList).prop('style')).toContain(
      customStyleScrollList,
    );
  });
});
