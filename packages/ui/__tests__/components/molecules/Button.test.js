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
import {TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {Button, Icon, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('Button Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    title: 'Cick here',
    onPress: jest.fn(),
    width: 45,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with default props', () => {
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeFalsy();
  });

  it('renders with custom style', () => {
    const style = {margin: 10};
    const wrapper = shallow(<Button {...props} style={style} />);

    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.primaryColor.background_light,
      width: props.width,
      ...style,
    });

    expect(wrapper.find(Text).prop('textColor')).toBe(
      Colors.primaryColor.foreground,
    );
  });

  it('renders with correct color', () => {
    const wrapper = shallow(
      <Button {...props} color={Colors.secondaryColor_dark} />,
    );

    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      borderColor: Colors.secondaryColor_dark.background,
      backgroundColor: Colors.secondaryColor_dark.background_light,
    });

    expect(wrapper.find(Text).prop('textColor')).toBe(
      Colors.secondaryColor_dark.foreground,
    );
  });

  it('renders neutral background when asked', () => {
    const wrapper = shallow(<Button {...props} isNeutralBackground />);

    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.backgroundColor,
    });

    expect(wrapper.find(Text).prop('textColor')).toBe(Colors.text);
  });

  it('renders Icon when provided', () => {
    const iconProps = {
      iconName: 'check',
      iconSize: 24,
      styleIcon: {marginTop: 60},
    };
    const wrapper = shallow(<Button {...props} {...iconProps} />);

    expect(wrapper.find(Icon).prop('name')).toBe(iconProps.iconName);
    expect(wrapper.find(Icon).prop('size')).toBe(iconProps.iconSize);
    expect(wrapper.find(Icon).prop('color')).toBe(
      Colors.primaryColor.foreground,
    );
    expect(getGlobalStyles(wrapper.find(Icon))).toMatchObject(
      iconProps.styleIcon,
    );
  });

  it('renders with disabled state when no disabledPress', () => {
    const wrapper = shallow(<Button {...props} disabled={true} />);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
  });

  it('renders with no disabled state when it has disabledPress', () => {
    const onDisabledPress = jest.fn();
    const wrapper = shallow(
      <Button {...props} disabled={true} onDisabledPress={onDisabledPress} />,
    );

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(false);
    expect(wrapper.find(TouchableOpacity).prop('onPress')).toBe(
      onDisabledPress,
    );
  });
});
