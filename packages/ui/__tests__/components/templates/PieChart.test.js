/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {PieChart as RNPieChart} from 'react-native-gifted-charts';
import {shallow} from 'enzyme';
import {PieChart, Text} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, getGlobalStyles} from '../../tools';

describe('PieChart Component', () => {
  const Colors = getDefaultThemeColors();

  const props = {
    datasets: [
      {
        label: 'Canceled',
        color: Colors.primaryColor,
        value: 0,
      },
      {
        label: 'Draft quotation',
        color: Colors.secondaryColor,
        value: 1,
      },
    ],
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<PieChart {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should use widthGraph props to calculate width of Card container', () => {
    const widthGraph = 200;
    const MARGIN = 5;
    const wrapper = shallow(<PieChart {...props} widthGraph={widthGraph} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      width: widthGraph - MARGIN * 2,
    });
  });

  it('should give props to RNPieChart component', () => {
    const extendedProps = {
      donut: true,
      showGradient: true,
      sectionAutoFocus: false,
      radius: 30,
      innerRadius: 30,
      focusOnPress: true,
    };

    const wrapper = shallow(<PieChart {...props} {...extendedProps} />);

    expect(wrapper.find(RNPieChart).prop('data')).toBe(props.datasets);
    expect(wrapper.find(RNPieChart).props()).toMatchObject(extendedProps);
  });

  it('should display a legend if props is true', () => {
    const wrapper = shallow(<PieChart {...props} legend />);
    const chartLegend = wrapper.find('ChartLegend').dive();

    props.datasets.forEach((dataset, index) => {
      const textChildren = chartLegend.find(Text).at(index).prop('children');
      const expectedText = `${dataset.label} : ${dataset.value}`;
      expect(textChildren).toContain(expectedText);
    });
  });

  it('should display title if provided', () => {
    const title = 'Title';
    const wrapper = shallow(<PieChart {...props} title={title} />);

    expect(wrapper.find(Text).prop('children')).toBe(title);
  });

  it('should apply custom style when styleContainer is provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <PieChart {...props} styleContainer={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });
});
