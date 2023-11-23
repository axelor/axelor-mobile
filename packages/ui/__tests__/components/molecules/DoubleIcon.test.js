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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {DoubleIcon, Icon, lightTheme} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('DoubleIcon Component', () => {
  const Colors = lightTheme.colors;

  const props = {
    topIconConfig: {
      name: 'plus',
    },
    bottomIconConfig: {
      name: 'user',
    },
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<DoubleIcon {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should give all props of topIconConfig and bottomIconConfig to the right icons', () => {
    const topIconConfig = {
      name: 'plus',
      color: Colors.primaryColor.background,
      size: 20,
      FontAwesome5: true,
    };
    const bottomIconConfig = {
      name: 'user',
      color: Colors.secondaryColor.background,
      size: 15,
      FontAwesome5: false,
    };
    const wrapper = shallow(
      <DoubleIcon
        topIconConfig={topIconConfig}
        bottomIconConfig={bottomIconConfig}
        touchable={true}
        onPress={jest.fn()}
      />,
    );

    expect(wrapper.find(Icon).at(0).props()).toMatchObject(bottomIconConfig);
    expect(wrapper.find(Icon).at(1).props()).toMatchObject(topIconConfig);
  });

  it('should use size props if size is not defined in icon configs', () => {
    const size = 50;
    const wrapper = shallow(<DoubleIcon {...props} size={size} />);

    expect(wrapper.find(Icon).at(0).prop('size')).toBe(size);
    expect(wrapper.find(Icon).at(1).prop('size')).toBe(size * 0.6);
  });

  it('should use predefinedPositions props if provided', () => {
    const predefinedPositions = {
      left: {left: -10},
      top: {top: -10},
      right: {right: -10},
      bottom: {bottom: -10},
      'bottom-right': {bottom: -10, right: -10},
      'bottom-left': {bottom: -7, left: -10},
      'top-left': {top: -10, left: -10},
      'top-right': {top: -10, right: -10},
    };
    const predefinedPositionsKeys = Object.keys(predefinedPositions);

    for (const positionKey of predefinedPositionsKeys) {
      const wrapper = shallow(
        <DoubleIcon {...props} predefinedPosition={positionKey} />,
      );
      expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject(
        predefinedPositions[positionKey],
      );
    }
  });

  it('should use topIconPosition props if provided', () => {
    const topIconPosition = {
      left: 10,
      right: -15,
    };
    const wrapper = shallow(
      <DoubleIcon {...props} topIconPosition={topIconPosition} />,
    );

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject(
      topIconPosition,
    );
  });
});
