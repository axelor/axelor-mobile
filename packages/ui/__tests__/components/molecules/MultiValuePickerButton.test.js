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
import {TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {MultiValuePickerButton, Text} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

describe('MultiValuePickerButton Component', () => {
  const Colors = getDefaultThemeColors();
  const listItem = [
    {
      color: Colors.primaryColor,
      title: 'Item 1',
      key: '1',
    },
    {
      color: Colors.cautionColor,
      title: 'Item 2',
      key: '2',
    },
    {
      color: Colors.errorColor,
      title: 'Item 3',
      key: '3',
    },
  ];
  const props = {
    onPress: jest.fn(),
    listItem: listItem,
    onPressItem: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<MultiValuePickerButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render Text component for each listItem', () => {
    const wrapper = shallow(<MultiValuePickerButton {...props} />);

    expect(wrapper.find(Text).length).toBe(listItem.length);
  });

  it('should render Icon component for each listItem', () => {
    const wrapper = shallow(<MultiValuePickerButton {...props} />);

    expect(wrapper.find('Icon[name="x-lg"]').length).toBe(listItem.length);
  });

  it('should render the correct listItem titles and colors', () => {
    const wrapper = shallow(<MultiValuePickerButton {...props} />);

    listItem.forEach((item, index) => {
      const textElement = wrapper.find(Text).at(index);
      const iconElement = wrapper.find('Icon[name="x-lg"]').at(index);

      expect(textElement.prop('children')).toBe(item.title);
      expect(textElement.prop('textColor')).toBe(item.color.foreground);
      expect(iconElement.prop('color')).toBe(item.color.foreground);
    });
  });

  it('should call onPressItem when a listItem is pressed', () => {
    const wrapper = shallow(<MultiValuePickerButton {...props} />);

    wrapper.find(TouchableOpacity).at(1).simulate('press');
    expect(props.onPressItem).toHaveBeenCalledWith(listItem[0]);
  });

  it('should render disabled items when readonly is true', () => {
    const wrapper = shallow(<MultiValuePickerButton {...props} readonly />);

    for (let i = 1; i <= listItem.length; i++) {
      expect(wrapper.find(TouchableOpacity).at(i).prop('disabled')).toBe(true);
    }
  });

  it('should display placeholder when no items are selected', () => {
    const placeholder = 'Select items';
    const wrapper = shallow(
      <MultiValuePickerButton
        {...props}
        listItem={[]}
        placeholder={placeholder}
      />,
    );

    const placeholderText = wrapper.find(Text).at(0);
    expect(placeholderText.prop('children')).toBe(placeholder);
    expect(placeholderText.prop('textColor')).toBe(Colors.placeholderTextColor);
  });
});
