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
import {Icon, StarScore, lightTheme} from '@axelor/aos-mobile-ui';

describe('StarScore', () => {
  const Colors = lightTheme.colors;

  const props = {
    score: 3.5,
    onPress: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<StarScore {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of active stars based on score when showHalfStar is true', () => {
    const wrapper = shallow(<StarScore {...props} showHalfStar={true} />);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star'),
    ).toHaveLength(3);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star-half'),
    ).toHaveLength(1);
  });

  it('renders the correct number of active stars based on score with disabled showHalfStar props', () => {
    const wrapper = shallow(<StarScore {...props} showHalfStar={false} />);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star'),
    ).toHaveLength(3);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star-half'),
    ).toHaveLength(0);
  });

  it('renders missing stars when showMissingStar is true', () => {
    const showMissingStarProps = {
      ...props,
      score: 2,
      showMissingStar: true,
    };

    const wrapper = shallow(<StarScore {...showMissingStarProps} />);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star'),
    ).toHaveLength(2);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star-o'),
    ).toHaveLength(3);
  });

  it('renders missing stars when showMissingStar is false', () => {
    const showMissingStarProps = {
      ...props,
      score: 2,
      showMissingStar: false,
    };

    const wrapper = shallow(<StarScore {...showMissingStarProps} />);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star'),
    ).toHaveLength(2);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star-o'),
    ).toHaveLength(0);
  });

  it('calls onPress with the correct argument when a star is pressed', () => {
    const showMissingStarProps = {
      ...props,
      score: 2,
      onPress: jest.fn(),
    };

    const wrapper = shallow(<StarScore {...showMissingStarProps} />);

    wrapper.find(Icon).first().simulate('press');
    expect(showMissingStarProps.onPress).toHaveBeenCalledWith(1);
  });

  it('renders stars with the correct color and size', () => {
    const onPress = jest.fn();
    const color = Colors.primaryColor;
    const size = 30;
    const wrapper = shallow(
      <StarScore color={color} size={size} score={3} onPress={onPress} />,
    );
    const firstStar = wrapper.find(Icon).first();
    expect(firstStar.props().color).toEqual(color.background);
    expect(firstStar.props().size).toEqual(size);
  });
});
