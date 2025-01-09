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
import {DistributionBar} from '@axelor/aos-mobile-ui';
import {shallow} from 'enzyme';
import {getDefaultThemeColors, getGlobalStyles} from '../../tools';

describe('DistributionBar Component', () => {
  const Colors = getDefaultThemeColors();

  const mockDistribution = [
    {value: 3, color: Colors.errorColor},
    {value: 1, color: Colors.cautionColor},
    {value: 5, color: Colors.successColor},
  ];

  it('renders without crashing', () => {
    const wrapper = shallow(
      <DistributionBar distribution={mockDistribution} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders each group with the right style', () => {
    const customHeight = 40;
    const total = 100;
    const wrapper = shallow(
      <DistributionBar
        distribution={mockDistribution}
        total={total}
        height={customHeight}
      />,
    );

    const groupViews = wrapper.find(View).at(0).children();
    mockDistribution.forEach((_group, index) => {
      const groupStyle = getGlobalStyles(groupViews.at(index));
      const expectedWidth = `${(_group.value / total) * 100}%`;

      expect(groupStyle).toMatchObject({
        width: expectedWidth,
        height: customHeight - 2,
        backgroundColor: _group.color.background,
      });
    });
  });

  it('renders with default height when not provided', () => {
    const wrapper = shallow(<DistributionBar distribution={[]} />);
    const containerStyle = getGlobalStyles(wrapper.find(View).first());

    expect(containerStyle.height).toEqual(30);
  });

  it('handles empty distribution array correctly', () => {
    const wrapper = shallow(<DistributionBar distribution={[]} />);

    expect(wrapper.find(View).length).toBe(1);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <DistributionBar distribution={mockDistribution} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View).first())).toMatchObject(
      customStyle,
    );
  });
});
