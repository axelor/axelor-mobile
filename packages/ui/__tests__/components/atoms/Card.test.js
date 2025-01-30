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
import {Card} from '@axelor/aos-mobile-ui';

describe('Card Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children correctly', () => {
    const children = <View testID="children" />;
    const wrapper = shallow(<Card>{children}</Card>);

    expect(wrapper.find('[testID="children"]').length).toBe(1);
  });

  it('applies custom style correctly', () => {
    const customStyle = {marginBottom: 10};
    const children = <View testID="children" />;
    const wrapper = shallow(<Card style={customStyle}>{children}</Card>);

    expect(wrapper.prop('style')).toContain(customStyle);
  });
});
