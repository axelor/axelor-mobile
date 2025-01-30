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
import {
  Badge,
  DropdownMenuItem,
  Icon,
  lightTheme,
  Text,
} from '@axelor/aos-mobile-ui';

describe('DropdownMenuItem Component', () => {
  const Colors = lightTheme.colors;

  const props = {
    placeholder: 'Text',
    onPress: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<DropdownMenuItem {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render the placeholder', () => {
    const wrapper = shallow(<DropdownMenuItem {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.placeholder);
  });

  it('should call onPress when TouchableOpacity is pressed', () => {
    const wrapper = shallow(<DropdownMenuItem {...props} />);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(false);

    wrapper.find(TouchableOpacity).simulate('press');
    expect(props.onPress).toHaveBeenCalledTimes(1);
  });

  it('should render an Icon with the right icon, color and FontAwesome5 values', () => {
    const icon = 'check';
    const color = Colors.primaryColor.background;
    const FontAwesome5 = false;
    const wrapper = shallow(
      <DropdownMenuItem
        {...props}
        icon={icon}
        color={color}
        FontAwesome5={FontAwesome5}
      />,
    );

    expect(wrapper.find(Icon).prop('name')).toBe(icon);
    expect(wrapper.find(Icon).prop('color')).toBe(color);
    expect(wrapper.find(Icon).prop('FontAwesome5')).toBe(FontAwesome5);
  });

  it('should render Badge component with the right title if indicator > 0', () => {
    const indicator = 3;
    const wrapper = shallow(
      <DropdownMenuItem {...props} indicator={indicator} />,
    );

    expect(wrapper.find(Badge).exists()).toBe(true);
    expect(wrapper.find(Badge).prop('title')).toBe(indicator);
  });

  it('should not render if hideIf is true', () => {
    const wrapper = shallow(<DropdownMenuItem {...props} hideIf />);

    expect(wrapper.type()).toBeNull();
  });

  it('should render a disabled component if disableIf is true', () => {
    const wrapper = shallow(<DropdownMenuItem {...props} disableIf />);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(true);
    expect(wrapper.find(Icon).prop('color')).toBe(
      Colors.secondaryColor.background,
    );
  });

  it('should render a custom component instead of Icon if provided', () => {
    const customComponent = <View testID="customComponent" />;
    const wrapper = shallow(
      <DropdownMenuItem {...props} customComponent={customComponent} />,
    );

    expect(wrapper.find(Icon)).toHaveLength(0);
    expect(wrapper.find('[testID="customComponent"]')).toHaveLength(1);
  });
});
