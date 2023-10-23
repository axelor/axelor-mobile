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
import {Badge, Text, lightTheme} from '@axelor/aos-mobile-ui';
import {View} from 'react-native';

describe('Badge Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Badge Title',
    style: {backgroundColor: 'blue'},
    txtStyle: {color: 'white'},
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct title', () => {
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.find(Text).props().children).toBe(props.title);
  });

  it('applies custom styles', () => {
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.find(View).prop('style')).toContain(props.style);
    expect(wrapper.find(Text).prop('style')).toMatchObject(props.txtStyle);
  });

  it('applies default color if color prop is not provided', () => {
    const wrapper = shallow(<Badge {...props} />);

    expect(wrapper.find(View).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background_light,
          borderColor: Colors.primaryColor.background,
        }),
      ]),
    );
  });

  it('applies custom color if color prop is provided', () => {
    const color = Colors.infoColor;
    const wrapper = shallow(<Badge {...props} color={color} />);

    expect(wrapper.find(View).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: color.background_light,
          borderColor: color.background,
        }),
      ]),
    );
  });

  it('applies default number of lines if numberOfLines prop is not provided', () => {
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.find(Text).prop('numberOfLines')).toBe(1);
  });

  it('applies custom number of lines if numberOfLines prop is provided', () => {
    const wrapper = shallow(<Badge {...props} numberOfLines={2} />);
    expect(wrapper.find(Text).prop('numberOfLines')).toBe(2);
  });
});
