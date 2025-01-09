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
import {Text as ReactNativeText} from 'react-native';
import {shallow} from 'enzyme';
import {Text} from '@axelor/aos-mobile-ui';

describe('Text Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Text />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders text correctly', () => {
    const text = 'Hello, World!';
    const wrapper = shallow(<Text>{text}</Text>);

    expect(wrapper.find(ReactNativeText).length).toBe(1);
    expect(wrapper.find(ReactNativeText).children().text()).toBe(text);
  });

  it('applies custom styles correctly', () => {
    const customStyle = {color: 'red', fontSize: 20};
    const wrapper = shallow(<Text style={customStyle}>Custom Text</Text>);

    expect(wrapper.prop('style')).toContain(customStyle);
  });

  it('applies the specified number of lines', () => {
    const numberOfLines = 2;
    const wrapper = shallow(
      <Text numberOfLines={numberOfLines}>Long Text</Text>,
    );

    expect(wrapper.find(ReactNativeText).prop('numberOfLines')).toBe(
      numberOfLines,
    );
  });

  it('adjusts font size to fit when enabled', () => {
    const wrapper = shallow(<Text adjustsFontSizeToFit>Resizable Text</Text>);

    expect(wrapper.find(ReactNativeText).prop('adjustsFontSizeToFit')).toBe(
      true,
    );
  });

  it('invokes onTextLayout callback', () => {
    const onTextLayout = jest.fn();
    const testLayoutInput = {nativeEvent: {layout: {height: 100}}};
    const wrapper = shallow(
      <Text onTextLayout={onTextLayout}>Text with Layout</Text>,
    );

    wrapper.simulate('textLayout', testLayoutInput);

    expect(onTextLayout).toHaveBeenCalledTimes(1);
    expect(onTextLayout).toHaveBeenCalledWith(testLayoutInput);
  });
});
