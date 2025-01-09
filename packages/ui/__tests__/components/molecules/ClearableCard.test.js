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
import {ClearableCard, Icon} from '@axelor/aos-mobile-ui';

describe('ClearableCard Component', () => {
  const props = {
    onPress: jest.fn(),
    onClearPress: jest.fn(),
    valueTxt: 'test',
    clearable: true,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<ClearableCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly when clearable is true', () => {
    const wrapper = shallow(<ClearableCard {...props} />);

    const iconComponent = wrapper.find(Icon);

    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.prop('name')).toBe('x-lg');
    expect(iconComponent.prop('touchable')).toBe(true);
    expect(iconComponent.prop('size')).toBeGreaterThan(0);
  });

  it('does not render clear icon when clearable is false', () => {
    const wrapper = shallow(<ClearableCard {...props} clearable={false} />);

    expect(wrapper.find(Icon)).toHaveLength(0);
  });
});
