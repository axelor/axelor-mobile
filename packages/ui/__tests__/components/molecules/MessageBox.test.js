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
import {TouchableOpacity} from 'react-native';
import {HtmlInput, MessageBox} from '@axelor/aos-mobile-ui';

describe('MessageBox Component', () => {
  const props = {
    placeholder: 'Type a message',
    disabled: false,
    value: 'Hello',
    onChange: jest.fn(),
    onSend: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<MessageBox {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render an HtmlInput component', () => {
    const wrapper = shallow(<MessageBox {...props} />);

    expect(wrapper.find(HtmlInput).exists()).toBe(true);
  });

  it('should render a TouchableOpacity with paper-plane Icon for sending', () => {
    const wrapper = shallow(<MessageBox {...props} />);

    expect(wrapper.find(TouchableOpacity).exists()).toBe(true);
    expect(wrapper.find('Icon[name="paper-plane"]').exists()).toBe(true);
  });

  it('should call onChange when input value changes', () => {
    const wrapper = shallow(<MessageBox {...props} />);

    wrapper.find(HtmlInput).simulate('change', 'New Message');

    expect(props.onChange).toHaveBeenCalledWith('New Message');
  });

  it('should call onSend when TouchableOpacity is pressed', () => {
    const wrapper = shallow(<MessageBox {...props} />);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(props.onSend).toHaveBeenCalled();
  });

  it('should not render a touchable button when disabled is true', () => {
    const wrapper = shallow(<MessageBox {...props} disabled={true} />);
    const touchableComponent = wrapper.find(TouchableOpacity);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).toBe(true);
  });
});
