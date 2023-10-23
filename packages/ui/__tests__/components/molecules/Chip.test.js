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
import {TouchableOpacity, View} from 'react-native';
import {Chip, lightTheme, Text} from '@axelor/aos-mobile-ui';

describe('Chip Component', () => {
  const Colors = lightTheme.colors;
  const selectedColor = Colors.infoColor;
  const props = {
    onPressMock: jest.fn(),
    title: 'Selected Chip',
    selected: true,
    selectedColor,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Chip {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render correctly when selected is true', () => {
    const wrapper = shallow(<Chip {...props} />);

    expect(wrapper.find(View).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: selectedColor.background_light,
          borderLeftWidth: 3,
          borderLeftColor: selectedColor.background,
          borderRightWidth: 3,
          borderRightColor: selectedColor.background,
        }),
      ]),
    );

    expect(wrapper.find(Text).prop('textColor')).toEqual(
      selectedColor.foreground,
    );
    expect(wrapper.find(Text).prop('fontSize')).toEqual(14);
    expect(wrapper.find(Text).prop('children')).toEqual(props.title);
  });

  it('should render correctly when selected is true and selectedColor is null', () => {
    const wrapper = shallow(<Chip {...props} selectedColor={null} />);

    expect(wrapper.find(View).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background_light,
          borderLeftWidth: 3,
          borderLeftColor: Colors.primaryColor.background,
          borderRightWidth: 3,
          borderRightColor: Colors.primaryColor.background,
        }),
      ]),
    );

    expect(wrapper.find(Text).prop('textColor')).toEqual(
      Colors.primaryColor.foreground,
    );
    expect(wrapper.find(Text).prop('fontSize')).toEqual(14);
    expect(wrapper.find(Text).prop('children')).toEqual(props.title);
  });

  it('should render correctly when selected is false', () => {
    const wrapper = shallow(
      <Chip {...props} selected={false} title="Not Selected Chip" />,
    );

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);

    expect(wrapper.find(View).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.backgroundColor,
          borderLeftWidth: 3,
          borderLeftColor: selectedColor.background,
          borderRightWidth: 3,
          borderRightColor: selectedColor.background,
        }),
      ]),
    );

    expect(wrapper.find(Text).prop('textColor')).toEqual(Colors.text);
    expect(wrapper.find(Text).prop('fontSize')).toEqual(14);
    expect(wrapper.find(Text).prop('children')).toEqual('Not Selected Chip');
  });
});
