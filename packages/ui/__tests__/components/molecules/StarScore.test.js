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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {Icon, StarScore, lightTheme} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

const getIcons = (wrapper, iconName) => {
  return wrapper.find(Icon).filterWhere(item => item.prop('name') === iconName);
};

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

    expect(getIcons(wrapper, 'star')).toHaveLength(3);
    expect(getIcons(wrapper, 'star-half')).toHaveLength(1);
  });

  it('renders the correct number of active stars based on score with disabled showHalfStar props', () => {
    const wrapper = shallow(<StarScore {...props} showHalfStar={false} />);

    expect(getIcons(wrapper, 'star')).toHaveLength(3);
    expect(getIcons(wrapper, 'star-half')).toHaveLength(0);
  });

  it('renders missing stars when showMissingStar is true', () => {
    const wrapper = shallow(<StarScore {...props} showMissingStar={true} />);

    expect(getIcons(wrapper, 'star')).toHaveLength(3);
    expect(getIcons(wrapper, 'star-o')).toHaveLength(2);
  });

  it('renders missing stars when showMissingStar is false', () => {
    const wrapper = shallow(<StarScore {...props} showMissingStar={false} />);

    expect(getIcons(wrapper, 'star')).toHaveLength(3);
    expect(getIcons(wrapper, 'star-o')).toHaveLength(0);
  });

  it('calls onPress with the correct argument when a star is pressed', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <StarScore
        {...props}
        onPress={onPress}
        showMissingStar={true}
        editMode={true}
      />,
    );

    wrapper.find(Icon).at(1).simulate('press');
    wrapper.find(Icon).at(4).simulate('press');

    expect(onPress).toHaveBeenNthCalledWith(1, 2);
    expect(onPress).toHaveBeenNthCalledWith(2, 5);
  });

  it('renders stars with the correct color and size', () => {
    const color = Colors.errorColor;
    const size = 30;
    const wrapper = shallow(<StarScore {...props} color={color} size={size} />);

    expect(wrapper.find(Icon).first().prop('color')).toEqual(color.background);
    expect(wrapper.find(Icon).first().prop('size')).toEqual(size);
  });

  it('renders readonly stars when not in editmode', () => {
    const wrapper = shallow(
      <StarScore {...props} showMissingStar={true} editMode={false} />,
    );

    for (let i = 0; i < 5; i++) {
      expect(wrapper.find(Icon).at(i).prop('touchable')).toBe(false);
    }
  });

  it('updates stars when value change', () => {
    const firstScore = 2;
    const wrapper = shallow(<StarScore {...props} score={firstScore} />);

    expect(getIcons(wrapper, 'star')).toHaveLength(2);
    expect(getIcons(wrapper, 'star-half')).toHaveLength(0);
    expect(getIcons(wrapper, 'star-o')).toHaveLength(0);

    wrapper.setProps({score: 3.5});

    expect(getIcons(wrapper, 'star')).toHaveLength(3);
    expect(getIcons(wrapper, 'star-half')).toHaveLength(0);
    expect(getIcons(wrapper, 'star-o')).toHaveLength(0);
  });

  it('renders stars with custom style', () => {
    const style = {marginTop: 50};
    const wrapper = shallow(<StarScore {...props} style={style} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(style);
  });
});
