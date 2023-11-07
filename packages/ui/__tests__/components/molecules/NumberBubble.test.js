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
import {NumberBubble, Text, lightTheme} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('NumberBubble Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    number: 4,
    color: Colors.primaryColor,
    isNeutralBackground: true,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<NumberBubble {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the correct number', () => {
    const wrapper = shallow(<NumberBubble {...props} />);
    expect(wrapper.find(Text).prop('children')).toBe(props.number);
  });

  it('should have correct styles when neutral background is false', () => {
    const neutralProps = {
      ...props,
      isNeutralBackground: false,
    };
    const wrapper = shallow(<NumberBubble {...neutralProps} />);

    expect(getGlobalStyles(wrapper.find('View').at(0))).toMatchObject({
      backgroundColor: Colors.primaryColor.background_light,
    });
  });

  it('should have correct styles when neutral background is true', () => {
    const neutralProps = {
      ...props,
      isNeutralBackground: true,
    };
    const wrapper = shallow(<NumberBubble {...neutralProps} />);

    expect(getGlobalStyles(wrapper.find('View').at(0))).toMatchObject({
      backgroundColor: Colors.backgroundColor,
    });
  });
});
