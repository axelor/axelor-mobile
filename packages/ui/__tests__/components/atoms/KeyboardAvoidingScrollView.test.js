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
import {Platform, View} from 'react-native';
import {shallow} from 'enzyme';
import {KeyboardAvoidingScrollView} from '@axelor/aos-mobile-ui';

describe('KeyboardAvoidingScrollView Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<KeyboardAvoidingScrollView />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders children', () => {
    const wrapper = shallow(
      <KeyboardAvoidingScrollView>
        <View testID="child" />
      </KeyboardAvoidingScrollView>,
    );

    expect(wrapper.find('[testID="child"]').exists()).toBe(true);
  });

  it('sets correct behavior for iOS', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(<KeyboardAvoidingScrollView />);

    expect(wrapper.prop('behavior')).toBe('padding');
  });

  it('sets correct behavior for Android', () => {
    Platform.OS = 'android';
    const wrapper = shallow(<KeyboardAvoidingScrollView />);

    expect(wrapper.prop('behavior')).toBe('height');
  });

  it('sets keyboardVerticalOffset for iOS', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 100}} />,
    );

    expect(wrapper.prop('keyboardVerticalOffset')).toBe(100);
  });

  it('sets keyboardVerticalOffset for Android', () => {
    Platform.OS = 'android';
    const wrapper = shallow(
      <KeyboardAvoidingScrollView keyboardOffset={{android: 200}} />,
    );

    expect(wrapper.prop('keyboardVerticalOffset')).toBe(200);
  });
});
