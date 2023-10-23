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
import {Icon, LabelText, Text} from '@axelor/aos-mobile-ui';

describe('LabelText Component', () => {
  const props = {
    title: 'Title',
    value: 'Value',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<LabelText />);
    expect(wrapper.exists()).toBe(true);
  });

  it('it should render with title and value', () => {
    const wrapper = shallow(<LabelText {...props} />);
    const textComponents = wrapper.find(Text);
    expect(textComponents.at(0).prop('children')).toBe(props.title);
    expect(textComponents.at(1).prop('children')).toBe(props.value);
  });

  it('should render with an icon when iconName is provided', () => {
    const wrapper = shallow(<LabelText iconName="icon-name" />);
    expect(wrapper.find('Icon[name="icon-name"]').exists()).toBe(true);
  });

  it('should apply custom styles when style props are provided', () => {
    const customStyle = {backgroundColor: 'red'};
    const wrapper = shallow(<LabelText style={customStyle} />);
    expect(wrapper.find(View).prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('should apply custom styles to the icon when iconStyle prop is provided', () => {
    const customIconStyle = {color: 'blue'};
    const wrapper = shallow(
      <LabelText iconName="icon" iconStyle={customIconStyle} />,
    );
    expect(wrapper.find(Icon).prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customIconStyle)]),
    );
  });

  it('should apply custom styles to text when textStyle prop is provided', () => {
    const customTextStyle = {fontSize: 16};
    const wrapper = shallow(
      <LabelText {...props} textStyle={customTextStyle} />,
    );
    expect(wrapper.find(Text).first().prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customTextStyle)]),
    );
  });

  it('should render only one line of text when onlyOneLine prop is true', () => {
    const wrapper = shallow(<LabelText {...props} onlyOneLine />);
    expect(wrapper.find(Text).first().prop('numberOfLines')).toBe(1);
    expect(wrapper.find(Text).last().prop('numberOfLines')).toBe(1);
  });
});
