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
import {ActivityIndicator} from 'react-native';
import {shallow} from 'enzyme';
import {LoadingIndicator, lightTheme} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';

describe('LoadingIndicator Component', () => {
  const Colors = lightTheme.colors;

  it('should render without crashing', () => {
    const wrapper = shallow(<LoadingIndicator />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should not render an ActivityIndicator when showActivityIndicator is false', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      showActivityIndicator: false,
    }));

    const wrapper = shallow(<LoadingIndicator />);

    expect(wrapper.find(ActivityIndicator).exists()).toBe(false);
  });

  it('should render an ActivityIndicator when showActivityIndicator is true', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      showActivityIndicator: true,
    }));

    const wrapper = shallow(<LoadingIndicator />);

    expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
    expect(wrapper.find(ActivityIndicator).prop('color')).toBe(
      Colors.primaryColor.background,
    );
  });
});
