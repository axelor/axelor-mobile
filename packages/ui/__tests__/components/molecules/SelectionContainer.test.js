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
import {SelectionContainer} from '@axelor/aos-mobile-ui';

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
});
