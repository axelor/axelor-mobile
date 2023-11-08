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
    defaultValue: '1',
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
    const wrapper = shallow(<RadioSelect {...props} />);
    const secondRadioButton = wrapper.find(RadioButton).at(1);

    secondRadioButton.simulate('press');

    expect(props.onChange).toHaveBeenCalledWith(items[1].id);
  });

  it('should set the default value as selected', () => {
    const wrapper = shallow(<RadioSelect {...props} />);
    const selectedRadioButtons = wrapper
      .find(RadioButton)
      .filterWhere(button => button.props().selected);

    expect(selectedRadioButtons).toHaveLength(1);
    expect(selectedRadioButtons.props().title).toBe(items[0].title);
  });

  it('should set correct size when provided', () => {
    const propsSize = {
      ...props,
      radioSize: 40,
    };
    const wrapper = shallow(<RadioSelect {...propsSize} />);

    expect(wrapper.find(RadioButton).at(0).props('size').radioSize).toBe(
      items[0].radioSize,
    );
  });

  it('should set correct direction when provided', () => {
    const propsDirection = {
      ...props,
      direction: 'column',
    };
    const wrapper = shallow(<RadioSelect {...propsDirection} />);

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject({
      flexDirection: propsDirection.direction,
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
