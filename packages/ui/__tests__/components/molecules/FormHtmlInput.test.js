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
import {
  FormHtmlInput,
  HtmlInput,
  lightTheme,
  Text,
} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('FormHtmlInput Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Input Title',
    placeholder: 'Enter text',
    defaultValue: 'Initial Value',
    onChange: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<FormHtmlInput {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with initial props', () => {
    const wrapper = shallow(<FormHtmlInput {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
    expect(wrapper.find(HtmlInput).prop('defaultInput')).toBe(
      props.defaultValue,
    );
  });

  it('updates input value on change', () => {
    const wrapper = shallow(<FormHtmlInput {...props} />);

    const newValue = 'New Value';
    wrapper.find(HtmlInput).simulate('change', newValue);

    expect(wrapper.find(HtmlInput).prop('defaultInput')).toBe(newValue);
    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('handles focus and blur', () => {
    const wrapper = shallow(<FormHtmlInput {...props} />);

    wrapper.find(HtmlInput).simulate('focus');

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.primaryColor.background,
    });

    wrapper.find(HtmlInput).simulate('blur');

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('applies required styling when field is required and empty', () => {
    const wrapper = shallow(
      <FormHtmlInput {...props} required={true} defaultValue={null} />,
    );

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('does not apply required styling when field is required and not empty', () => {
    const wrapper = shallow(<FormHtmlInput {...props} required={true} />);

    expect(getGlobalStyles(wrapper.find(View).at(1))).toMatchObject({
      borderColor: Colors.secondaryColor.background,
    });
  });

  it('renders readonly input when necessary', () => {
    const wrapper = shallow(<FormHtmlInput {...props} readonly={true} />);

    expect(wrapper.find(HtmlInput).prop('readonly')).toBe(true);
  });

  it('renders nothing when readonly input and empty value', () => {
    const wrapper = shallow(
      <FormHtmlInput {...props} defaultValue={null} readonly hideIfNull />,
    );

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('renders input when readonly and not empty value', () => {
    const wrapper = shallow(
      <FormHtmlInput {...props} defaultValue={'Test'} readonly hideIfNull />,
    );

    expect(wrapper.isEmptyRender()).not.toBeTruthy();
  });
});
