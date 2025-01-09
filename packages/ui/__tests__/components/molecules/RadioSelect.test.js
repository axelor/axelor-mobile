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
import {RadioSelect, RadioButton, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('RadioSelect Component', () => {
  const items = [
    {id: '1', title: 'Option 1'},
    {id: '2', title: 'Option 2'},
    {id: '3', title: 'Option 3'},
  ];

  const props = {
    items,
    question: 'Test Question',
    onChange: jest.fn(),
    direction: 'column',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<RadioSelect {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should display the question when provided', () => {
    const wrapper = shallow(<RadioSelect {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.question);
  });

  it('should render the correct number of RadioButton components', () => {
    const wrapper = shallow(<RadioSelect {...props} />);

    expect(wrapper.find(RadioButton)).toHaveLength(items.length);
  });

  it('should handle RadioButton click', () => {
    const onPress = jest.fn();
    const wrapper = shallow(<RadioSelect {...props} onChange={onPress} />);

    for (let i = 0; i < items.length; i++) {
      wrapper.find(RadioButton).at(i).simulate('press');

      expect(onPress).toHaveBeenNthCalledWith(i + 1, items[i].id);
    }
  });

  it('should set the default value as selected', () => {
    const defaultSelectedItem = items[0];
    const wrapper = shallow(
      <RadioSelect {...props} defaultValue={defaultSelectedItem.id} />,
    );

    const selectedRadioButtons = wrapper
      .find(RadioButton)
      .filterWhere(button => button.props().selected);

    expect(selectedRadioButtons).toHaveLength(1);
    expect(selectedRadioButtons.prop('title')).toBe(defaultSelectedItem.title);
  });

  it('should set correct size when provided', () => {
    const radioSize = 40;
    const wrapper = shallow(<RadioSelect {...props} radioSize={radioSize} />);

    for (let i = 0; i < items.length; i++) {
      expect(wrapper.find(RadioButton).at(i).prop('size')).toBe(radioSize);
    }
  });

  it('should set correct direction when provided', () => {
    const direction = 'column';
    const wrapper = shallow(<RadioSelect {...props} direction={direction} />);

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      flexDirection: direction,
    });
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<RadioSelect {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      customStyle,
    );
  });
});
