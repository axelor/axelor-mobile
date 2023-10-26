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
import {shallow} from 'enzyme';
import {FormInput, Input, Text, lightTheme} from '@axelor/aos-mobile-ui';
import {View} from 'react-native';
import {getGlobalStyles} from '../../tools';

describe('FormInput Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Input Title',
    defaultValue: 'Initial Value',
    onChange: jest.fn(),
    onSelection: jest.fn(),
    onEndFocus: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<FormInput {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with initial props', () => {
    const wrapper = shallow(<FormInput {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
    expect(wrapper.find(Input).prop('value')).toBe(props.defaultValue);
  });

  it('updates input value on change', () => {
    const wrapper = shallow(<FormInput {...props} />);

    const newValue = 'New Value';
    wrapper.find(Input).simulate('change', newValue);

    expect(wrapper.find(Input).prop('value')).toBe(newValue);
    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('handles selection and end focus', () => {
    const wrapper = shallow(<FormInput {...props} />);

    wrapper.find(Input).simulate('selection');

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.primaryColor.background,
    });
    expect(props.onSelection).toHaveBeenCalled();

    wrapper.find(Input).simulate('endFocus');

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
    expect(props.onEndFocus).toHaveBeenCalled();
  });

  it('applies required styling when field is required and no value', () => {
    const wrapper = shallow(
      <FormInput {...props} required={true} defaultValue={null} />,
    );

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when field is required and not empty', () => {
    const wrapper = shallow(<FormInput {...props} required={true} />);

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('renders readonly input when necessary', () => {
    const wrapper = shallow(<FormInput {...props} readOnly={true} />);

    expect(wrapper.find(Input).prop('readOnly')).toBe(true);
  });
});
