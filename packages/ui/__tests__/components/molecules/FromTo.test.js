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
import {FromTo, Icon, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('FromTo Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    fromComponent: <Text>From</Text>,
    toComponent: <Text>To</Text>,
    style: {borderColor: Colors.primaryColor.background_light},
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<FromTo {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the fromComponent, arrow icon, and toComponent', () => {
    const wrapper = shallow(<FromTo {...props} />);

    expect(wrapper.contains(props.fromComponent)).toBe(true);
    expect(wrapper.contains(props.toComponent)).toBe(true);

    expect(wrapper.find(Icon).exists()).toBe(true);
  });

  it('applies custom style when provided', () => {
    const wrapper = shallow(<FromTo {...props} />);

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      props.style,
    );
  });
});
