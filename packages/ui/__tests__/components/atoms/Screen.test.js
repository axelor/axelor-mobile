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
import {ActivityIndicator, Button, View} from 'react-native';
import {shallow} from 'enzyme';
import {Screen} from '@axelor/aos-mobile-ui';

describe('Screen Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Screen />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children', () => {
    const wrapper = shallow(
      <Screen>
        <View testID="child" />
      </Screen>,
    );

    expect(wrapper.find('[testID="child"]').exists()).toBe(true);
  });

  it('renders loading indicator when loading prop is true', () => {
    const wrapper = shallow(<Screen loading={true} />);

    expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
  });

  it('does not render loading indicator when loading prop is false', () => {
    const wrapper = shallow(<Screen loading={false} />);

    expect(wrapper.find(ActivityIndicator).exists()).toBe(false);
  });

  it('applies custom styles', () => {
    const style = {backgroundColor: 'red'};
    const wrapper = shallow(<Screen style={style} />);

    expect(wrapper.prop('style')).toContain(style);
  });

  it('renders fixedItems when provided', () => {
    const fixedItems = <Button testID="fixedButton" title="Fixed Button" />;
    const wrapper = shallow(<Screen fixedItems={fixedItems} />);

    expect(wrapper.find('[testID="fixedButton"]').exists()).toBe(true);
  });
});
