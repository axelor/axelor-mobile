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
import {Modal} from 'react-native';
import {shallow} from 'enzyme';
import {Alert, Button, Card, Icon, Text} from '@axelor/aos-mobile-ui';

describe('Alert Card Component', () => {
  const props = {
    visible: true,
    title: 'TEST',
    children: <Text>ALERT</Text>,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Alert {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render a non visible Modal component when visible prop is false', () => {
    const wrapper = shallow(<Alert {...props} visible={false} />);

    expect(wrapper.find(Modal).prop('visible')).toBe(false);
  });

  it('should render the title', () => {
    const wrapper = shallow(<Alert {...props} />);

    expect(wrapper.find(Text).at(0).prop('children')).toBe(props.title);
  });

  it('should render the children', () => {
    const wrapper = shallow(<Alert {...props} />);

    expect(wrapper.find(Card).children().contains(props.children)).toBe(true);
  });

  it('should render the cancelButtonConfig and the confirmButtonConfig', () => {
    const cancelButtonConfig = {};
    const confirmButtonConfig = {};
    const wrapper = shallow(
      <Alert
        {...props}
        cancelButtonConfig={cancelButtonConfig}
        confirmButtonConfig={confirmButtonConfig}
      />,
    );

    expect(wrapper.find(Button).length).toBe(2);
  });

  it('should not render the cancelButtonConfig and the confirmButtonConfig when hide prop is true', () => {
    const cancelButtonConfig = {hide: true};
    const confirmButtonConfig = {hide: true};
    const wrapper = shallow(
      <Alert
        {...props}
        cancelButtonConfig={cancelButtonConfig}
        confirmButtonConfig={confirmButtonConfig}
      />,
    );

    expect(wrapper.find(Button).length).toBe(0);
  });

  it('should render the cancelButtonConfig in header when showInHeader prop is true', () => {
    const cancelButtonConfig = {showInHeader: true};
    const wrapper = shallow(
      <Alert {...props} cancelButtonConfig={cancelButtonConfig} />,
    );

    expect(wrapper.find(Icon).length).toBe(1);
  });
});
