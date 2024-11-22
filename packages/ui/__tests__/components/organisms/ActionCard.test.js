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
import {ActionCard, InfoButton, Card} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('ActionCard Component', () => {
  const actionList = [
    {iconName: 'edit', onPress: jest.fn(), key: '1'},
    {iconName: 'delete', onPress: jest.fn(), key: '2'},
    {iconName: 'share', onPress: jest.fn(), key: '3'},
  ];
  const props = {
    children: <Card testID="childrenComponent">Card Content</Card>,
    actionList,
    translator: jest.fn(key => key),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<ActionCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render children correctly', () => {
    const wrapper = shallow(<ActionCard {...props} />);

    expect(wrapper.find('[testID="childrenComponent"]')).toHaveLength(1);
  });

  it('should render InfoButton components for each action in the list', () => {
    const wrapper = shallow(<ActionCard {...props} />);

    expect(wrapper.find(InfoButton).length).toBe(actionList.length);
  });

  it('should call the appropriate onPress function when an action is pressed', () => {
    const wrapper = shallow(<ActionCard {...props} />);

    wrapper.find(InfoButton).at(0).simulate('press');
    expect(actionList[0].onPress).toHaveBeenCalled();
  });

  it('should render InfoButton components for quick action if present', () => {
    const quickAction = {iconName: 'heart', onPress: jest.fn()};
    const wrapper = shallow(
      <ActionCard {...props} quickAction={quickAction} />,
    );

    expect(wrapper.find(InfoButton).length).toBe(actionList.length + 1);

    const quickActionWrapper = wrapper.find(InfoButton).at(actionList.length);
    expect(quickActionWrapper.props()).toMatchObject(quickAction);
  });

  it('should apply custom style to the container if provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<ActionCard {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find('View').at(0))).toMatchObject(
      customStyle,
    );
  });
});
