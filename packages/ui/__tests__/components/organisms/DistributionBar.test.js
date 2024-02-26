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

  it('calculates percentage width for each group correctly', () => {
    const total = 100;
    const wrapper = shallow(
      <DistributionBar distribution={mockDistribution} total={total} />,
    );

    const groupViews = wrapper.find(View).at(0).children();

    const firstGroupStyle = getGlobalStyles(groupViews.at(0));
    const secondGroupStyle = getGlobalStyles(groupViews.at(1));

    const expectedFirstWidth = `${(mockDistribution[0].value / total) * 100}%`;
    const expectedSecondWidth = `${(mockDistribution[1].value / total) * 100}%`;

    expect(firstGroupStyle.width).toEqual(expectedFirstWidth);
    expect(secondGroupStyle.width).toEqual(expectedSecondWidth);
  });

  it('applies correct height and colors to groups', () => {
    const customHeight = 40;
    const wrapper = shallow(
      <DistributionBar distribution={mockDistribution} height={customHeight} />,
    );

    const groupViews = wrapper.find(View).at(0).children();

    const firstGroupStyles = getGlobalStyles(groupViews.at(0));
    const secondGroupStyles = getGlobalStyles(groupViews.at(1));

    expect(firstGroupStyles).toEqual(
      expect.objectContaining({
        height: customHeight - 2,
        backgroundColor: mockDistribution[0].color.background,
      }),
    );

    expect(secondGroupStyles).toEqual(
      expect.objectContaining({
        height: customHeight - 2,
        backgroundColor: mockDistribution[1].color.background,
      }),
    );
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
