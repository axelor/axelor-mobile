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
import {shallow} from 'enzyme';
import {HorizontalRule, HorizontalRuleText, Text} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, getGlobalStyles} from '../../tools';
import {View} from 'react-native';

describe('HorizontalRuleText Component', () => {
  const props = {
    text: 'Hello',
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<HorizontalRuleText {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with the provided title', () => {
    const defaultColor =
      getDefaultThemeColors().secondaryColor?.background_light;
    const wrapper = shallow(<HorizontalRuleText {...props} />);

    expect(wrapper.find(Text).exists()).toBe(true);
    expect(wrapper.find(Text).prop('children')).toBe(props.text);
    expect(wrapper.find(Text).prop('textColor')).toBe(defaultColor);

    expect(wrapper.find(HorizontalRule)?.length).toBe(2);
  });

  it('renders correctly with the provided color', () => {
    const color = getDefaultThemeColors().cautionColor?.background_light;
    const wrapper = shallow(<HorizontalRuleText {...props} color={color} />);

    expect(wrapper.find(Text).prop('textColor')).toBe(color);
    wrapper.find(HorizontalRule).forEach(_v => {
      expect(getGlobalStyles(_v)).toMatchObject({borderColor: color});
    });
  });

  it('applies custom style when provided', () => {
    const style = {width: '50%'};
    const lineStyle = {marginHorizontal: 40};
    const textStyle = {alignSelf: 'flex-start'};
    const wrapper = shallow(
      <HorizontalRuleText
        {...props}
        textStyle={textStyle}
        lineStyle={lineStyle}
        style={style}
      />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(style);
    wrapper.find(HorizontalRule).forEach(_v => {
      expect(getGlobalStyles(_v)).toMatchObject(lineStyle);
    });
    expect(getGlobalStyles(wrapper.find(Text))).toMatchObject(textStyle);
  });
});
