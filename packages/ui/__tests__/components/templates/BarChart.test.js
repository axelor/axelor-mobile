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
import {BarChart as RNBarChart} from 'react-native-gifted-charts';
import {shallow} from 'enzyme';
import {BarChart, Card, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('BarChart Component', () => {
  const Colors = getDefaultThemeColors();

  const props = {
    datasets: [
      [
        {
          label: 'T0001 - APOLLO',
          color: Colors.primaryColor,
          value: 1,
        },
        {
          label: 'T0002 - MICHEL Loic',
          color: Colors.secondaryColor,
          value: 2,
        },
      ],
      [
        {
          label: 'T0001 - APOLLO',
          color: Colors.warningColor,
          value: 3,
        },
        {
          label: 'T0002 - MICHEL Loic',
          color: Colors.errorColor,
          value: 5,
        },
      ],
    ],
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<BarChart {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should use widthGraph props to calculate width of Card container', () => {
    const widthGraph = 200;
    const MARGIN = 5;
    const wrapper = shallow(<BarChart {...props} widthGraph={widthGraph} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject({
      width: widthGraph - MARGIN * 2,
    });
  });

  it('should give props to RNBarChart component', () => {
    const spacing = 10;
    const horizontal = true;
    const wrapper = shallow(
      <BarChart {...props} spacing={spacing} horizontal={horizontal} />,
    );

    expect(wrapper.find(RNBarChart).prop('spacing')).toBe(spacing);
    expect(wrapper.find(RNBarChart).prop('horizontal')).toBe(horizontal);
  });

  it('should display title if provided', () => {
    const title = 'Title';
    const wrapper = shallow(<BarChart {...props} title={title} />);

    expect(wrapper.find(Text).prop('children')).toBe(title);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<BarChart {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });
});
