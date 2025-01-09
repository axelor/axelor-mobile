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
import {TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {EditableInput, Input} from '@axelor/aos-mobile-ui';

describe('EditableInput Component', () => {
  const props = {
    placeholder: 'Enter text',
    onValidate: jest.fn(),
    defaultValue: 'Initial value',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<EditableInput {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('toggles between editable and non-editable modes when the icon is pressed', () => {
    const wrapper = shallow(<EditableInput {...props} />);

    expect(wrapper.find(Input).prop('readOnly')).toBe(true);
    expect(wrapper.find(Input).prop('value')).toBe(props.defaultValue);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find(Input).prop('readOnly')).toBe(false);
  });

  it('updates input value when changed and toggles back to non-editable', () => {
    const wrapper = shallow(<EditableInput {...props} />);

    wrapper.find(TouchableOpacity).simulate('press');

    const newValue = 'New Value';
    wrapper.find(Input).simulate('change', newValue);
    expect(wrapper.find(Input).prop('value')).toBe(newValue);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find(Input).prop('readOnly')).toBe(true);

    expect(props.onValidate).toHaveBeenCalledWith(newValue);
  });

  it('displays multiline input when multiline prop is true', () => {
    const wrapper = shallow(
      <EditableInput {...props} multiline={true} numberOfLines={3} />,
    );

    expect(wrapper.find(Input).prop('multiline')).toBe(true);
    expect(wrapper.find(Input).prop('numberOfLines')).toBe(3);
  });
});
