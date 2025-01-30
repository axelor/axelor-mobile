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
import {CardIconButton, CardIndicator, InfoButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

describe('InfoButton Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    iconName: 'plus',
    iconColor: Colors.primaryColor,
    indication: 'This is an info button.',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<InfoButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the correct icon', () => {
    const wrapper = shallow(<InfoButton {...props} />);

    expect(wrapper.find(CardIconButton).props()).toMatchObject({
      iconName: props.iconName,
      iconColor: props.iconColor,
    });
  });

  it('should display the indication when clicked', () => {
    const wrapper = shallow(<InfoButton {...props} />);
    const card = wrapper.find(CardIconButton).dive();

    expect(wrapper.find(CardIndicator).exists()).toBe(true);
    card.find(TouchableOpacity).simulate('longPress');

    expect(wrapper.find(CardIndicator).props()).toMatchObject({
      indication: props.indication,
      isVisible: true,
    });
  });

  it('should hide the indication when clicked twice', () => {
    const wrapper = shallow(<InfoButton {...props} />);
    const card = wrapper.find(CardIconButton).dive();

    card.find(TouchableOpacity).simulate('longPress');
    expect(wrapper.find(CardIndicator).prop('isVisible')).toBe(true);

    card.find(TouchableOpacity).simulate('longPress');
    expect(wrapper.find(CardIndicator).prop('isVisible')).toBe(false);
  });
});
