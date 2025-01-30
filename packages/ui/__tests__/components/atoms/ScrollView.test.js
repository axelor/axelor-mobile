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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {ScrollView} from '@axelor/aos-mobile-ui';

describe('ScrollView Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ScrollView />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders children', () => {
    const wrapper = shallow(
      <ScrollView>
        <View testID="child" />
      </ScrollView>,
    );

    expect(wrapper.find('[testID="child"]').exists()).toBe(true);
  });

  it('applies custom styles', () => {
    const style = {backgroundColor: 'red'};
    const wrapper = shallow(<ScrollView style={style} />);

    expect(wrapper.prop('contentContainerStyle')).toContain(style);
  });
});
