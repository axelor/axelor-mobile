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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {BlockInteractionScreen} from '@axelor/aos-mobile-ui';

describe('BlockInteractionScreen Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BlockInteractionScreen />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children correctly', () => {
    const children = <View testID="children" />;
    const wrapper = shallow(
      <BlockInteractionScreen>{children}</BlockInteractionScreen>,
    );

    expect(wrapper.find('[testID="children"]').exists()).toBe(true);
  });

  it('blocks interactions', () => {
    const onPressMock = jest.fn();
    const children = (
      <TouchableOpacity testID="children" onPress={onPressMock} />
    );
    const wrapper = shallow(
      <BlockInteractionScreen>{children}</BlockInteractionScreen>,
    );

    wrapper.simulate('press');

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders without hidden the header', () => {
    const children = <View testID="children" />;
    const wrapper = shallow(
      <BlockInteractionScreen>{children}</BlockInteractionScreen>,
    );

    const container = wrapper.find(View).at(0);

    const topStyle = container.prop('style')?.top;

    expect(topStyle).toBe(115);
  });

  it('hides the header if specified', () => {
    const children = <View testID="children" />;
    const wrapper = shallow(
      <BlockInteractionScreen hideHeader>{children}</BlockInteractionScreen>,
    );

    const container = wrapper.find(View).at(0);

    const topStyle = container.prop('style')?.top;

    expect(topStyle).toBe(0);
  });
});
