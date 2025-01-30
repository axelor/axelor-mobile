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
import {IconInput, Icon, lightTheme, Input} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('IconInput Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    placeholder: 'Enter text',
    value: 'Initial value',
    onChange: jest.fn(),
    onSelection: jest.fn(),
    onEndFocus: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<IconInput {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('check if the input value is rendered', () => {
    const wrapper = shallow(<IconInput {...props} />);

    expect(wrapper.find(Input).prop('value')).toBe(props.value);
  });

  it('renders input value and left/right icons', () => {
    const leftIconsList = [<Icon name="leftIcon" />, <Icon name="leftIcon2" />];
    const rightIconsList = [<Icon name="rightIcon" />];
    const wrapper = shallow(
      <IconInput
        {...props}
        leftIconsList={leftIconsList}
        rightIconsList={rightIconsList}
      />,
    );

    leftIconsList.forEach((iconComponent, index) => {
      expect(
        wrapper.findWhere(
          node => node.equals(iconComponent) && node.key() === index.toString(),
        ),
      ).toHaveLength(1);
    });

    rightIconsList.forEach((iconComponent, index) => {
      expect(
        wrapper.findWhere(
          node => node.equals(iconComponent) && node.key() === index.toString(),
        ),
      ).toHaveLength(1);
    });
  });

  it('handles selection and end focus', () => {
    const wrapper = shallow(<IconInput {...props} />);

    wrapper.find(Input).simulate('selection');

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      borderColor: Colors.primaryColor.background,
    });
    expect(props.onSelection).toHaveBeenCalled();

    wrapper.find(Input).simulate('endFocus');

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
    expect(props.onEndFocus).toHaveBeenCalled();
  });

  it('updates input value on change', () => {
    const wrapper = shallow(<IconInput {...props} />);

    const newValue = 'New Value';
    wrapper.find(Input).simulate('change', newValue);

    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('applies required styling when field is required, focus and has no value', () => {
    const wrapper = shallow(
      <IconInput {...props} required={true} value={null} />,
    );

    wrapper.find(Input).simulate('selection');

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when field is required and not empty', () => {
    const wrapper = shallow(<IconInput {...props} required={true} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('renders readonly input when necessary', () => {
    const wrapper = shallow(<IconInput {...props} readOnly={true} />);

    expect(wrapper.find(Input).prop('readOnly')).toBe(true);
  });
});
