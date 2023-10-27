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
import {IncrementButton} from '@axelor/aos-mobile-ui';

describe('IncrementButton Component', () => {
  const props = {
    iconName: 'plus',
    onPress: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<IncrementButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });
});
