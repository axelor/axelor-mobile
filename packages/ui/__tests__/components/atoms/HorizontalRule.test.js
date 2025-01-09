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
import {HorizontalRule} from '@axelor/aos-mobile-ui';

describe('HorizontalRule Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<HorizontalRule />);
    expect(wrapper.exists()).toBe(true);
  });

  it('applies custom style correctly', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<HorizontalRule style={customStyle} />);

    expect(wrapper.prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
