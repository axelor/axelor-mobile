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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {HtmlInput, Icon, NotesCard, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('NotesCard Component', () => {
  const props = {
    title: 'Title',
    data: 'TEST',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<NotesCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render an Text component with title props', () => {
    const wrapper = shallow(<NotesCard {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
  });

  it('should render an HtmlInput component', () => {
    const wrapper = shallow(<NotesCard {...props} />);

    expect(wrapper.find(HtmlInput).exists()).toBe(true);
    expect(wrapper.find(HtmlInput).prop('readonly')).toBe(true);
    expect(wrapper.find(HtmlInput).prop('defaultInput')).toBe(props.data);
  });

  it('should not render if data is null', () => {
    const wrapper = shallow(<NotesCard {...props} data={null} />);

    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(false);
    expect(wrapper.find(HtmlInput).exists()).toBe(false);
  });

  it('should render chevron icon when content exceeds maximum height', () => {
    const wrapper = shallow(<NotesCard {...props} />);

    wrapper.find(HtmlInput).simulate('heightChange', 150);

    expect(wrapper.find(Icon).exists()).toBe(true);
    expect(wrapper.find(Icon).prop('name')).toBe('chevron-down');

    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('chevron-up');
  });

  it('should not render chevron icon when content is within maximum height', () => {
    const wrapper = shallow(<NotesCard {...props} />);

    wrapper
      .find(TouchableOpacity)
      .simulate('layout', {nativeEvent: {layout: {height: 20}}});

    expect(wrapper.find(Icon).exists()).toBe(false);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<NotesCard {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });
});
