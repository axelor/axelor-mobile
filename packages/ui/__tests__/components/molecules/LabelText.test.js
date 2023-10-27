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
import {View} from 'react-native';
import {Icon, LabelText, lightTheme, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('LabelText Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Title',
    value: 'Value',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<LabelText {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with title and value', () => {
    const wrapper = shallow(<LabelText {...props} />);

    const textComponents = wrapper.find(Text);

    expect(textComponents.at(0).prop('children')).toBe(props.title);
    expect(textComponents.at(1).prop('children')).toBe(props.value);
  });

  it('should render with an icon when iconName is provided', () => {
    const wrapper = shallow(<LabelText {...props} iconName="icon-name" />);

    expect(wrapper.find('Icon[name="icon-name"]').exists()).toBe(true);
  });

  it('should apply custom styles when customStyle prop is provided', () => {
    const customStyle = {backgroundColor: Colors.primaryColor.background_light};

    const wrapper = shallow(<LabelText {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });

  it('should apply custom styles to the icon when iconStyle prop is provided', () => {
    const customIconStyle = {color: Colors.secondaryColor.background};

    const wrapper = shallow(
      <LabelText {...props} iconName="icon-name" iconStyle={customIconStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(Icon))).toMatchObject(customIconStyle);
  });

  it('should apply custom styles to text when textStyle prop is provided', () => {
    const customTextStyle = {fontSize: 25};

    const wrapper = shallow(
      <LabelText {...props} textStyle={customTextStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(Text).at(0))).toMatchObject(
      customTextStyle,
    );
  });

  it('should render only one line of text when onlyOneLine prop is true', () => {
    const wrapper = shallow(<LabelText {...props} onlyOneLine />);

    expect(wrapper.find(Text).at(0).prop('numberOfLines')).toBe(1);
    expect(wrapper.find(Text).at(1).prop('numberOfLines')).toBe(1);
  });
});
