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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {Chip, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('Chip Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    onPressMock: jest.fn(),
    title: 'Chip title',
    selected: true,
    selectedColor: Colors.infoColor,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Chip {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a touchable component with a title', () => {
    const wrapper = shallow(
      <Chip {...props} selectedColor={null} readonly={false} />,
    );

    expect(wrapper.find(Text).prop('children')).toEqual(props.title);

    expect(wrapper.find(TouchableOpacity).exists()).toBeTruthy();
    expect(wrapper.find(TouchableOpacity).prop('disabled')).toEqual(false);

    wrapper.setProps({readonly: true});

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toEqual(true);
  });

  it('renders wtih the default selected values', () => {
    const wrapper = shallow(<Chip {...props} selectedColor={null} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: Colors.primaryColor.background_light,
      borderColor: Colors.primaryColor.background,
    });

    expect(wrapper.find(Text).prop('textColor')).toEqual(
      Colors.primaryColor.foreground,
    );
  });

  it('renders correctly with custom selected color', () => {
    const wrapper = shallow(<Chip {...props} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: props.selectedColor.background_light,
      borderColor: props.selectedColor.background,
    });

    expect(wrapper.find(Text).prop('textColor')).toEqual(
      props.selectedColor.foreground,
    );
  });

  it('renders wtih the default not selected values', () => {
    const wrapper = shallow(
      <Chip {...props} selectedColor={null} selected={false} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: Colors.backgroundColor,
      borderColor: Colors.primaryColor.background,
    });

    expect(wrapper.find(Text).prop('textColor')).toEqual(Colors.text);
  });

  it('renders correctly with custom not selected color', () => {
    const wrapper = shallow(<Chip {...props} selected={false} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: Colors.backgroundColor,
      borderColor: props.selectedColor.background,
    });

    expect(wrapper.find(Text).prop('textColor')).toEqual(Colors.text);
  });
});
