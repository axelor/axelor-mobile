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
import {Label, Text, lightTheme} from '@axelor/aos-mobile-ui';
import {hexToRgb} from '../../../lib/utils/commons-utlis';
import {getGlobalStyles} from '../../tools';

describe('Label Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    message: 'This is label message.',
    onClose: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Label {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the correct message', () => {
    const wrapper = shallow(<Label {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.message);
  });

  it('should apply default "error" style when type is not provided', () => {
    const wrapper = shallow(<Label {...props} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(
        Colors.errorColor.background_light,
      )}, 0.4)`,
      borderColor: Colors.errorColor.background_light,
    });
  });

  it('should apply "success" style when type is "success"', () => {
    const wrapper = shallow(<Label {...props} type="success" />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(
        Colors.successColor.background_light,
      )}, 0.4)`,
      borderColor: Colors.successColor.background_light,
    });
  });

  it('should apply "info" style when type is "info"', () => {
    const wrapper = shallow(<Label {...props} type="info" />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(
        Colors.infoColor.background_light,
      )}, 0.4)`,
      borderColor: Colors.infoColor.background_light,
    });
  });

  it('should apply "danger" style when type is "danger"', () => {
    const wrapper = shallow(<Label {...props} type="danger" />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(
        Colors.cautionColor.background_light,
      )}, 0.4)`,
      borderColor: Colors.cautionColor.background_light,
    });
  });

  it('should render a close icon when showClose is true', () => {
    const wrapper = shallow(<Label {...props} showClose />);

    expect(wrapper.find('Icon[name="times"]').exists()).toBe(true);
  });

  it('should call onClose when close icon is pressed', () => {
    const wrapper = shallow(<Label {...props} showClose />);

    wrapper.find('Icon[name="times"]').simulate('press');
    expect(props.onClose).toHaveBeenCalled();
  });
});
