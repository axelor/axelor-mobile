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
import {shallow} from 'enzyme';
import {Checkbox, Icon, Text} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

describe('Checkbox Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    title: 'Checkbox Label',
    onChange: jest.fn(),
    isDefaultChecked: false,
    disabled: false,
    iconColor: Colors.infoColor.background,
    iconSize: 20,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders icon with the correct props', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    const iconComponent = wrapper.find(Icon);

    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.prop('color')).toBe(props.iconColor);
    expect(iconComponent.prop('size')).toBe(props.iconSize);
    expect(iconComponent.prop('touchable')).toBe(!props.disabled);
  });

  it('renders disabled icon when specified', () => {
    const wrapper = shallow(<Checkbox {...props} disabled={true} />);
    const iconComponent = wrapper.find(Icon);

    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.prop('touchable')).toBe(false);
  });

  it('renders correct icon when checkbox is pressed', () => {
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper.find(Icon).prop('name')).toBe('square');

    wrapper.find(Icon).simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('check-square-fill');
  });

  it('renders correct icon if isDefaultChecked is true', () => {
    const wrapper = shallow(<Checkbox {...props} isDefaultChecked />);

    expect(wrapper.find(Icon).prop('name')).toBe('check-square-fill');
  });

  it('renders correct icon if isDefaultPartialChecked is true', () => {
    const wrapper = shallow(<Checkbox {...props} isDefaultPartialChecked />);

    expect(wrapper.find(Icon).prop('name')).toBe('dash-square-fill');
  });

  it('renders with correct title', () => {
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
  });

  it('renders with correct icon color based on disabled prop', () => {
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper.find(Icon).prop('color')).toEqual(props.iconColor);

    wrapper.setProps({disabled: true});

    expect(wrapper.find(Icon).prop('color')).toEqual(
      Colors.secondaryColor.background,
    );
  });
});
