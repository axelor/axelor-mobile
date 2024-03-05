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
import {shallow} from 'enzyme';
import {BottomBar, Card, Text, checkNullString} from '@axelor/aos-mobile-ui';
import {getVisibleItems} from '../../../src/components/templates/BottomBar/display.helper';
import {getDefaultThemeColors, getGlobalStyles} from '../../tools';

const Screen = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);

describe('PieChart Component', () => {
  const Colors = getDefaultThemeColors();

  const props = {
    itemSize: 40,
    items: [
      {
        iconName: 'house',
        viewComponent: <Screen title="House view component" />,
        color: Colors.secondaryColor_dark,
      },
      {
        iconName: 'clock-history',
        viewComponent: <Screen title="Clock history view component" />,
        indicator: 5,
        color: Colors.plannedColor,
      },
      {
        iconName: 'trash',
        viewComponent: <Screen title="Trash view component" />,
        color: Colors.infoColor,
        hidden: true,
      },
      {
        iconName: 'x-lg',
        viewComponent: <Screen title="X view component" />,
        color: Colors.progressColor,
      },
      {
        iconName: 'person-fill',
        viewComponent: <Screen title="Person view component" />,
      },
    ],
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<BottomBar {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should correctly give the items props', () => {
    const wrapper = shallow(<BottomBar {...props} />);

    const visibleItems = getVisibleItems(props.items);

    visibleItems.forEach((item, index) => {
      expect(wrapper.find('BarItem').at(index).exists()).toBe(true);
      expect(wrapper.find('BarItem').at(index).prop('iconName')).toBe(
        item.iconName,
      );
      expect(wrapper.find('BarItem').at(index).prop('color')).toBe(item.color);
      expect(wrapper.find('BarItem').at(index).prop('title')).toBe(item.title);
      expect(wrapper.find('BarItem').at(index).prop('size')).toBe(
        props.itemSize,
      );
      expect(wrapper.find('BarItem').at(index).prop('disabled')).toBe(
        item.disabled,
      );
      expect(wrapper.find('BarItem').at(index).prop('indicator')).toBe(
        item.indicator,
      );
    });
  });

  it('should correctly render the BarItem component', () => {
    const wrapper = shallow(<BottomBar {...props} />);

    const visibleItems = getVisibleItems(props.items);

    visibleItems.forEach((item, index) => {
      expect(wrapper.find('BarItem').at(index).exists()).toBe(true);

      const barItemWrapper = wrapper.find('BarItem').at(index).dive();

      expect(barItemWrapper.find('Button').exists()).toBe(true);
      expect(barItemWrapper.find('Button').props()).toMatchObject({
        iconName: item.iconName,
        color: item.color ?? Colors.primaryColor,
        disabled: item.disabled,
      });

      if (item.indicator > 0) {
        expect(barItemWrapper.find('NumberBubble').exists()).toBe(true);
        expect(barItemWrapper.find('NumberBubble').props()).toMatchObject({
          number: item.indicator,
          color: item.color ?? Colors.primaryColor,
          isNeutralBackground: true,
        });
      }

      if (!checkNullString(item.title)) {
        expect(barItemWrapper.find('Text').exists()).toBe(true);
        expect(barItemWrapper.find('Text').prop('children')).toBe(item.title);
      }
    });
  });

  it('should render the selected view', () => {
    const wrapper = shallow(<BottomBar {...props} />);
    const visibleItems = getVisibleItems(props.items);

    wrapper.find('BarItem').at(1).simulate('press');
    expect(
      wrapper.find('ScrollView').contains(visibleItems[1].viewComponent),
    ).toBe(true);

    wrapper.find('BarItem').at(3).simulate('press');
    expect(
      wrapper.find('ScrollView').contains(visibleItems[3].viewComponent),
    ).toBe(true);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<BottomBar {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });
});
