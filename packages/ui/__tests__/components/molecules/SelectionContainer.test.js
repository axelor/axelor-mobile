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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {SelectionContainer} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('SelectionContainer', () => {
  const objectList = [
    {id: '1', name: 'Item 1'},
    {id: '2', name: 'Item 2'},
  ];

  const props = {
    displayValue: jest.fn(item => item.name),
    handleSelect: jest.fn(),
    objectList: objectList,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<SelectionContainer {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with objectList', () => {
    const wrapper = shallow(<SelectionContainer {...props} />);

    expect(wrapper.find('SelectionItem')).toHaveLength(props.objectList.length);
  });

  it('calls handleSelect with the right item on press', () => {
    const onPress = jest.fn();

    const newProps = {
      ...props,
      handleSelect: onPress,
    };

    const wrapper = shallow(<SelectionContainer {...newProps} />);

    wrapper.find('SelectionItem').first().simulate('press');

    expect(newProps.handleSelect).toHaveBeenCalledWith(props.objectList[0]);
  });

  it('does not render if objectList is empty or null', () => {
    const newPropsVoidTab = {
      ...props,
      objectList: [],
    };
    const newPropsNullTab = {
      ...props,
      objectList: null,
    };

    const wrapperEmpty = shallow(<SelectionContainer {...newPropsVoidTab} />);

    const wrapperNull = shallow(<SelectionContainer {...newPropsNullTab} />);

    expect(wrapperEmpty.type()).toBeNull();
    expect(wrapperNull.type()).toBeNull();
  });

  it('renders a Picker list when isPicker is true', () => {
    const wrapper = shallow(<SelectionContainer {...props} isPicker={true} />);
    expect(wrapper.find('SelectionItem').length).toBeGreaterThan(0);
    expect(wrapper.find('SelectionItem').first().prop('isPicker')).toBe(true);
  });

  it('renders the selectedItem correctly', () => {
    const selectedItem = [{id: '2', name: 'Item 2', color: 'blue'}];

    const wrapper = shallow(
      <SelectionContainer {...props} selectedItem={selectedItem} />,
    );
    expect(
      wrapper.find('SelectionItem').findWhere(n => n.prop('isSelectedItem'))
        .length,
    ).toBe(1);
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <SelectionContainer {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      customStyle,
    );
  });
});
