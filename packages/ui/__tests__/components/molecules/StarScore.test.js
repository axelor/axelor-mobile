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

  it('should render without crashing', () => {
    const onPress = jest.fn();
    const score = 3.5;
    const wrapper = shallow(<StarScore score={score} onPress={onPress} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of active stars based on score', () => {
    const onPress = jest.fn();
    const score = 3.5;
    const wrapper = shallow(<StarScore score={score} onPress={onPress} />);
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star'),
    ).toHaveLength(3);
    if (wrapper.prop('showHalfStar')) {
      expect(
        wrapper
          .find(Icon)
          .filterWhere(item => item.prop('name') === 'star-half'),
      ).toHaveLength(1);
    }
  });

  it('renders half stars when showHalfStar is true', () => {
    const onPress = jest.fn();
    const score = 3.5;
    const wrapper = shallow(
      <StarScore score={score} showHalfStar={true} onPress={onPress} />,
    );
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star-half'),
    ).toHaveLength(1);
  });

  it('renders missing stars when showMissingStar is true', () => {
    const onPress = jest.fn();
    const score = 2;
    const wrapper = shallow(
      <StarScore score={score} showMissingStar={true} onPress={onPress} />,
    );
    expect(
      wrapper.find(Icon).filterWhere(item => item.prop('name') === 'star-o'),
    ).toHaveLength(3);
  });

  it('calls onPress with the correct argument when a star is pressed', () => {
    const onPress = jest.fn();
    const score = 2;
    const wrapper = shallow(
      <StarScore score={score} onPress={onPress} editMode={true} />,
    );

    wrapper.find(Icon).first().simulate('press');
    expect(onPress).toHaveBeenCalledWith(1);
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
