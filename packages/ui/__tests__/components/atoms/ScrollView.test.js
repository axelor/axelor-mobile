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
import {ScrollView} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('ScrollView Component', () => {
  const setupScrollView = (overrideProps = {}) =>
    setup({
      Component: ScrollView,
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupScrollView({
      children: <View testID="child" />,
    });

    expect(getByTestId('child')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = {backgroundColor: 'red'};

    const {getByTestId} = setupScrollView({
      style: customStyle,
      children: <View testID="child" />,
    });

    const scroll = getByTestId('scrollViewContainer');

    expect(scroll.props.contentContainerStyle).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
