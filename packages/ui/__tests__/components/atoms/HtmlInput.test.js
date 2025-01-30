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
import {ScrollView} from 'react-native';
import {shallow} from 'enzyme';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {HtmlInput, Text} from '@axelor/aos-mobile-ui';

describe('HtmlInput Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<HtmlInput />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the title if provided', () => {
    const wrapper = shallow(<HtmlInput title="Test Title" />);
    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).children().text()).toEqual('Test Title');
  });

  it('applies custom styles correctly', () => {
    const customStyle = {width: 200};
    const customToolbarStyle = {backgroundColor: 'red'};
    const customContainerStyle = {flex: 1};
    const wrapper = shallow(
      <HtmlInput
        readonly={false}
        style={customStyle}
        styleToolbar={customToolbarStyle}
        containerStyle={customContainerStyle}
      />,
    );

    expect(
      wrapper.find(ScrollView).at(0).prop('contentContainerStyle'),
    ).toMatchObject(customContainerStyle);
    expect(wrapper.find(ScrollView).at(1).prop('style')).toContain(customStyle);

    wrapper.find(RichEditor).prop('editorInitializedCallback')();

    expect(wrapper.find(RichToolbar).exists()).toBe(true);
    expect(wrapper.find(RichToolbar).prop('style')).toMatchObject(
      customToolbarStyle,
    );
  });
});
