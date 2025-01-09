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
import {Card, Icon, Increment, QuantityCard, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('QuantityCard Component', () => {
  const props = {
    labelQty: 'Label qty',
    defaultValue: 5,
    onValueChange: jest.fn(),
    editable: false,
    iconName: 'pencil-fill',
    translator: jest.fn(key => key),
  };
  const children = <View testID="children" />;

  it('should render without crashing', () => {
    const wrapper = shallow(<QuantityCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render children when provided', () => {
    const wrapper = shallow(<QuantityCard {...props} children={children} />);

    expect(wrapper.find('[testID="children"]').exists()).toBe(true);
  });

  it('should render labelQty', () => {
    const wrapper = shallow(<QuantityCard {...props} />);
    const wrapperChlidren = shallow(
      <QuantityCard {...props} children={children} />,
    );

    expect(wrapper.find(Text).at(0).prop('children')).toBe(props.labelQty);
    expect(wrapperChlidren.find(Text).at(0).prop('children')).toBe(
      props.labelQty,
    );
  });

  it('should render Increment component with isBigButton if editable is true', () => {
    const wrapper = shallow(<QuantityCard {...props} editable isBigButton />);
    const wrapperChlidren = shallow(
      <QuantityCard {...props} children={children} editable isBigButton />,
    );

    expect(wrapper.find(Increment).exists()).toBe(true);
    expect(wrapper.find(Increment).prop('isBigButton')).toBe(true);
    expect(wrapperChlidren.find(Increment).exists()).toBe(true);
    expect(wrapperChlidren.find(Increment).prop('isBigButton')).toBe(true);
  });

  it('should render defaultValue', () => {
    const wrapper = shallow(<QuantityCard {...props} />);
    const wrapperEditable = shallow(<QuantityCard {...props} editable />);
    const wrapperChlidren = shallow(
      <QuantityCard {...props} children={children} />,
    );
    const wrapperChlidrenEditable = shallow(
      <QuantityCard {...props} children={children} editable />,
    );

    expect(wrapper.find(Text).at(1).prop('children')).toBe(
      props.defaultValue.toFixed(2),
    );
    expect(wrapperEditable.find(Increment).prop('value')).toBe(
      props.defaultValue.toFixed(2),
    );
    expect(wrapperChlidren.find(Text).at(1).prop('children')).toBe(
      props.defaultValue.toFixed(2),
    );
    expect(wrapperChlidrenEditable.find(Increment).prop('value')).toBe(
      props.defaultValue.toFixed(2),
    );
  });

  it('should render right icon if actionQty is true', () => {
    const wrapperChlidren = shallow(
      <QuantityCard {...props} children={children} actionQty />,
    );

    expect(wrapperChlidren.find(Icon).prop('name')).toBe(props.iconName);
  });

  it('should apply custom style when provided with no children', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<QuantityCard {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });
});
