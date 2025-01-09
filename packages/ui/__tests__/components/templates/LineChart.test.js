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
import {LineChart as RNLineChart} from 'react-native-gifted-charts';
import {shallow} from 'enzyme';
import {LineChart, Card, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('LineChart Component', () => {
  const Colors = getDefaultThemeColors();

  const props = {
    datasets: [
      [
        {
          label: 'Canceled',
          value: 1,
        },
        {
          label: 'Draft quotation',
          value: 2,
        },
      ],
      [
        {
          label: 'Canceled',
          value: 3,
        },
        {
          label: 'Draft quotation',
          value: 5,
        },
      ],
    ],
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<LineChart {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should use widthGraph props to calculate width of Card container', () => {
    const widthGraph = 200;
    const MARGIN = 5;
    const wrapper = shallow(<LineChart {...props} widthGraph={widthGraph} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject({
      width: widthGraph - MARGIN * 2,
    });
  });

  it('should give props to RNLineChart component', () => {
    const spacing = 10;
    const backgroundColor = Colors.primaryColor;
    const wrapper = shallow(
      <LineChart
        {...props}
        spacing={spacing}
        backgroundColor={backgroundColor}
      />,
    );

    expect(wrapper.find(RNLineChart).prop('spacing')).toBe(spacing);
    expect(wrapper.find(RNLineChart).prop('backgroundColor')).toBe(
      backgroundColor,
    );
  });

  it('should display title if provided', () => {
    const title = 'Title';
    const wrapper = shallow(<LineChart {...props} title={title} />);

    expect(wrapper.find(Text).prop('children')).toBe(title);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<LineChart {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });
});
