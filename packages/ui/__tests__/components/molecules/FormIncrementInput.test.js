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
import {FormIncrementInput, Increment, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('FormIncrementInput Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    title: 'Input Title',
    defaultValue: 10,
    onChange: jest.fn(),
    stepSize: 1,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<FormIncrementInput {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with initial props', () => {
    const wrapper = shallow(<FormIncrementInput {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
    expect(wrapper.find(Increment).prop('value')).toBe(props.defaultValue);
  });

  it('updates input value on change', () => {
    const {defaultValue, stepSize} = props;

    const wrapper = shallow(<FormIncrementInput {...props} />);

    const newValue = defaultValue + stepSize;

    wrapper.find(Increment).simulate('valueChange', newValue);

    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('handles focus and blur', () => {
    const wrapper = shallow(<FormIncrementInput {...props} />);

    wrapper.find(Increment).simulate('focus');

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.primaryColor.background,
    });

    wrapper.find(Increment).simulate('blur');

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('applies required styling when field is required and no default value', () => {
    const wrapper = shallow(
      <FormIncrementInput {...props} required={true} defaultValue={null} />,
    );

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when field is required and not empty', () => {
    const wrapper = shallow(<FormIncrementInput {...props} required={true} />);

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('renders readonly input when necessary', () => {
    const wrapper = shallow(<FormIncrementInput {...props} readOnly={true} />);

    expect(wrapper.find(Increment).prop('readonly')).toBe(true);
  });
});
