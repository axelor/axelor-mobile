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
import {Card, Icon, InfoBubble, Text, lightTheme} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('InfoBubble Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    iconName: 'plus',
    badgeColor: Colors.primaryColor,
    indication: 'This is an info bubble.',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<InfoBubble {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the correct badge color', () => {
    const wrapper = shallow(<InfoBubble {...props} />);

    expect(wrapper.find(Icon).prop('color')).toBe(
      Colors.primaryColor.foreground,
    );
    expect(getGlobalStyles(wrapper.find(Icon))).toMatchObject({
      backgroundColor: Colors.primaryColor.background_light,
      borderColor: Colors.primaryColor.background,
    });
  });

  it('should render with the correct icon color when no bubble', () => {
    const wrapper = shallow(<InfoBubble {...props} coloredBubble={false} />);

    expect(wrapper.find(Icon).prop('color')).toBe(
      Colors.primaryColor.background,
    );
    expect(getGlobalStyles(wrapper.find(Icon))).toBe(null);
  });

  it('should display the indication when clicked', () => {
    const wrapper = shallow(<InfoBubble {...props} />);

    expect(wrapper.find(Card).exists()).toBe(false);
    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find(Icon).exists()).toBe(true);
    expect(wrapper.find(Text).prop('children')).toBe(props.indication);
  });

  it('should hide the indication when clicked twice', () => {
    const wrapper = shallow(<InfoBubble {...props} />);

    wrapper.find(TouchableOpacity).simulate('press');
    expect(wrapper.find(Card).exists()).toBe(true);

    wrapper.find(TouchableOpacity).simulate('press');
    expect(wrapper.find(Card).exists()).toBe(false);
  });
});
