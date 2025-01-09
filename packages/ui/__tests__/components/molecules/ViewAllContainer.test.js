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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {Card, Icon, Text, ViewAllContainer} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('ViewAllContainer Component', () => {
  const props = {
    children: <View testID="children" />,
    onViewPress: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<ViewAllContainer {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render children', () => {
    const wrapper = shallow(<ViewAllContainer {...props} />);

    expect(wrapper.find('[testID="children"]').exists()).toBe(true);
  });

  it('should call onViewPress when TouchableOpacity is pressed', () => {
    const wrapper = shallow(<ViewAllContainer {...props} />);

    wrapper.find(TouchableOpacity).simulate('press');
    expect(props.onViewPress).toHaveBeenCalledTimes(1);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <ViewAllContainer {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });

  it('should render title when provided', () => {
    const title = 'Title';
    const wrapper = shallow(<ViewAllContainer {...props} title={title} />);

    expect(wrapper.find(Text).at(0).prop('children')).toBe(title);
  });

  it('should render first and second data whith renderFirstTwoItems function when provided', () => {
    const data = ['Data 0', 'Data 1', 'Data 2'];
    const renderFirstTwoItems = jest.fn((item, index) => (
      <Text>
        `${index} : ${item}`
      </Text>
    ));
    const wrapper = shallow(
      <ViewAllContainer
        {...props}
        data={data}
        renderFirstTwoItems={renderFirstTwoItems}
      />,
    );

    expect(wrapper.find(View).at(0).find(Text).length).toBe(2);
    expect(renderFirstTwoItems).toHaveBeenNthCalledWith(1, data[0], 0);
    expect(renderFirstTwoItems).toHaveBeenNthCalledWith(2, data[1], 1);
  });

  it('should not render TouchableOpacity when disabled is true', () => {
    const wrapper = shallow(<ViewAllContainer {...props} disabled />);

    expect(wrapper.find(TouchableOpacity).exists()).toBe(false);
  });

  it('should render a top View with Text and plus Icon when isHeaderExist is true', () => {
    const onNewIcon = jest.fn();
    const wrapper = shallow(
      <ViewAllContainer {...props} isHeaderExist onNewIcon={onNewIcon} />,
    );

    const topView = wrapper.find(View).at(0);

    expect(topView.find(Text).length).toBe(1);
    expect(topView.find(Icon).length).toBe(1);
    expect(topView.find(Icon).prop('name')).toBe('plus');
    expect(topView.find(Icon).prop('touchable')).toBe(true);

    topView.find(Icon).simulate('press');
    expect(onNewIcon).toHaveBeenCalledTimes(1);
  });
});
