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
import {SwitchCard, Text} from '@axelor/aos-mobile-ui';

describe('SwitchCard', () => {
  it('should render without crashing', () => {
    const title = 'Test Switch';
    const wrapper = shallow(
      <SwitchCard title={title} defaultValue={false} onToggle={() => {}} />,
    );

    expect(wrapper.exists()).toBe(true);
  });
  it('renders with the correct title', () => {
    const title = 'Test Switch';
    const wrapper = shallow(
      <SwitchCard title={title} defaultValue={false} onToggle={() => {}} />,
    );

    expect(wrapper.find(Text).prop('children')).toBe(title);
  });

  it('passes the default value to the Switch component', () => {
    const defaultValue = true;
    const wrapper = shallow(
      <SwitchCard
        title="Test"
        defaultValue={defaultValue}
        onToggle={() => {}}
      />,
    );

    expect(wrapper.find('Switch').prop('isEnabled')).toBe(defaultValue);
  });

  it('calls onToggle when the switch is toggled', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <SwitchCard title="Test" defaultValue={true} onToggle={onPress} />,
    );

    expect(wrapper.find('Switch').prop('handleToggle')).toBe(onPress);
  });
});
