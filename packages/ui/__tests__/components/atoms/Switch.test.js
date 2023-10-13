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
import {Switch as RNSwitch} from 'react-native';
import {Switch} from '@axelor/aos-mobile-ui';

describe('Switch Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Switch />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the switch with the correct initial value', () => {
    const props = {
      isEnabled: true,
      handleToggle: jest.fn(),
    };
    const wrapper = shallow(<Switch {...props} />);
    expect(wrapper.prop('value')).toBe(true);
  });

  it('should call handleToggle function with value true when switching on', () => {
    const handleToggle = jest.fn();
    const isEnabled = false;

    const wrapper = shallow(
      <Switch isEnabled={isEnabled} handleToggle={handleToggle} />,
    );
    wrapper.find(RNSwitch).simulate('valueChange');
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('should call handleToggle function with value false when switching off', () => {
    const handleToggle = jest.fn();
    const isEnabled = true;

    const wrapper = shallow(
      <Switch isEnabled={isEnabled} handleToggle={handleToggle} />,
    );
    wrapper.find(RNSwitch).simulate('valueChange');
    expect(handleToggle).toHaveBeenCalledWith(false);
  });
});
