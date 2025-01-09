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
import {TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {Icon, MovementIndicationCard, Text} from '@axelor/aos-mobile-ui';

describe('MovementIndicationCard Component', () => {
  const props = {
    titleTop: 'Top Title',
    iconTop: <Icon name="top-icon" />,
    onPressTitleTop: jest.fn(),
    disabledTop: false,
    titleDown: 'Down Title',
    iconDown: <Icon name="down-icon" />,
    onPressTitleDown: jest.fn(),
    disabledDown: false,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<MovementIndicationCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render two TouchableOpacity components', () => {
    const wrapper = shallow(<MovementIndicationCard {...props} />);

    expect(wrapper.find(TouchableOpacity).length).toBe(2);
  });

  it('should render two titles', () => {
    const wrapper = shallow(<MovementIndicationCard {...props} />);

    expect(wrapper.find(Text).length).toBe(2);
  });

  it('should render top Icon', () => {
    const wrapper = shallow(<MovementIndicationCard {...props} />);

    expect(wrapper.find('Icon[name="top-icon"]').exists()).toBe(true);
  });

  it('should render down Icon', () => {
    const wrapper = shallow(<MovementIndicationCard {...props} />);

    expect(wrapper.find('Icon[name="down-icon"]').exists()).toBe(true);
  });

  it('should call onPressTitleTop when the top title is pressed', () => {
    const wrapper = shallow(<MovementIndicationCard {...props} />);

    wrapper.find(TouchableOpacity).at(0).simulate('press');

    expect(props.onPressTitleTop).toHaveBeenCalled();
  });

  it('should call onPressTitleDown when the down title is pressed', () => {
    const wrapper = shallow(<MovementIndicationCard {...props} />);

    wrapper.find(TouchableOpacity).at(1).simulate('press');

    expect(props.onPressTitleDown).toHaveBeenCalled();
  });

  it('should not render a touchable titleTop when disabledTop is true', () => {
    const wrapper = shallow(
      <MovementIndicationCard {...props} disabledTop={true} />,
    );
    const touchableComponent = wrapper.find(TouchableOpacity).at(0);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).toBe(true);
  });

  it('should not render a touchable titleDown when disabledDown is true', () => {
    const wrapper = shallow(
      <MovementIndicationCard {...props} disabledDown={true} />,
    );
    const touchableComponent = wrapper.find(TouchableOpacity).at(1);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).toBe(true);
  });
});
