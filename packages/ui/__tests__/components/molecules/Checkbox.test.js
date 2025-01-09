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
import {Checkbox, lightTheme, Icon} from '@axelor/aos-mobile-ui';

describe('Checkbox Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Checkbox Label',
    onChange: jest.fn(),
    isDefaultChecked: false,
    disabled: false,
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
    expect(iconComponent.prop('size')).toBe(props.iconSize);
    expect(iconComponent.prop('touchable')).toBe(true);
  });

  it('renders disabled icon when specified', () => {
    const wrapper = shallow(<Checkbox {...props} disabled={true} />);
    const iconComponent = wrapper.find(Icon);

    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.prop('touchable')).toBe(false);
  });

  it('renders correct icon name based on isChecked prop', () => {
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper.find(Icon).prop('name')).toBe('square-o');

    wrapper.find(Icon).simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('check-square');
  });

  it('renders with correct title', () => {
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper.find('Text').prop('children')).toBe(props.title);
  });

  it('renders with correct icon color based on disabled prop', () => {
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper.find(Icon).prop('color')).toEqual(
      Colors.primaryColor.background,
    );

    wrapper.setProps({disabled: true});

    expect(wrapper.find(Icon).prop('color')).toEqual(
      Colors.secondaryColor.background,
    );
  });
});
