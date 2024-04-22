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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {Icon, SelectionContainer, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('SelectionContainer', () => {
  const objectList = [
    {id: '1', name: 'Item 1'},
    {id: '2', name: 'Item 2'},
    {id: '3', name: 'Item 3'},
  ];

  const props = {
    objectList: objectList,
    displayValue: item => item.name,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<SelectionContainer {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render correctly with objectList', () => {
    const wrapper = shallow(<SelectionContainer {...props} />);

    for (let i = 0; i < props.objectList.length; i++) {
      expect(wrapper.find('SelectionItem').at(i).prop('content')).toBe(
        props.displayValue(props.objectList[i]),
      );
    }
  });

  it('should call handleSelect with the right item on press', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectionContainer {...props} handleSelect={handleSelect} />,
    );

    for (let i = 0; i < props.objectList.length; i++) {
      wrapper.find('SelectionItem').at(i).simulate('press');
      expect(handleSelect).toHaveBeenCalledWith(props.objectList[i]);
    }
  });
  it('should render empty state message if objectList is empty or null', () => {
    const newPropsEmptyArr = {
      ...props,
      objectList: [],
      title: 'item',
      translator: ({key, values}) => `No ${values._title} available`,
    };
    const newPropsNullArr = {
      ...props,
      objectList: null,
      title: 'item',
      translator: ({key, values}) => `No ${values._title} available`,
    };
    const newPropsNullTranslator = {
      ...props,
      objectList: null,
      title: 'item',
      translator: null,
    };

    const wrapperEmpty = shallow(<SelectionContainer {...newPropsEmptyArr} />);
    const wrapperNull = shallow(<SelectionContainer {...newPropsNullArr} />);
    const wrapperNullTranslator = shallow(
      <SelectionContainer {...newPropsNullTranslator} />,
    );

    expect(wrapperEmpty.find(Text).prop('children')).toBe(
      `No ${newPropsEmptyArr.title} available`,
    );
    expect(wrapperNull.find(Text).prop('children')).toBe(
      `No ${newPropsNullArr.title} available`,
    );
    expect(wrapperNullTranslator.find(Text).prop('children')).toBe(
      `No ${newPropsNullTranslator.title} available`,
    );
  });

  it('should render a list of SelectionItem with Icon when isPicker is true', () => {
    const wrapper = shallow(<SelectionContainer {...props} isPicker />);

    for (let i = 0; i < props.objectList.length; i++) {
      expect(wrapper.find('SelectionItem').at(i).prop('isPicker')).toBe(true);
      expect(
        wrapper.find('SelectionItem').at(i).dive().find(Icon).exists(),
      ).toBe(true);
    }
  });

  it('should render an empty SelectionItem when isPicker and emptyValue are true', () => {
    const wrapper = shallow(
      <SelectionContainer {...props} isPicker emptyValue />,
    );

    expect(wrapper.find('SelectionItem').first().prop('content')).toBe('');
  });

  it('should render the selectedItem correctly', () => {
    const selectedItem = props.objectList.slice(1);
    const wrapper = shallow(
      <SelectionContainer {...props} selectedItem={selectedItem} />,
    );

    expect(
      wrapper
        .find('SelectionItem')
        .findWhere(item => item.prop('isSelectedItem')).length,
    ).toBe(selectedItem.length);
    for (let i = 0; i < selectedItem.length; i++) {
      expect(
        wrapper
          .find('SelectionItem')
          .findWhere(item => item.prop('isSelectedItem'))
          .at(i)
          .prop('content'),
      ).toBe(props.displayValue(selectedItem[i]));
    }
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <SelectionContainer {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      customStyle,
    );
  });
});
