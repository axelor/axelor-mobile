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
import {TouchableOpacity, View} from 'react-native';
import {render} from '@testing-library/react-native';
import {BlockInteractionScreen} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';

describe('BlockInteractionScreen Component', () => {
  const defaultHeaderHeight = 70;

  beforeEach(() => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      headerHeight: defaultHeaderHeight,
    }));
  });

  const wrapper = ({children}) => (
    <BlockInteractionScreen>{children}</BlockInteractionScreen>
  );

  it('renders without crashing', () => {
    const {getByTestId} = render(
      wrapper({children: <View testID="children" />}),
    );
    expect(getByTestId('children')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const {getByTestId} = render(
      wrapper({children: <View testID="children" />}),
    );
    expect(getByTestId('children')).toBeTruthy();
  });

  it('renders touchable child', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      wrapper({
        children: <TouchableOpacity testID="touchable" onPress={onPress} />,
      }),
    );

    const button = getByTestId('touchable');
    expect(button).toBeTruthy();
  });

  it('applies header offset correctly when not hidden', () => {
    const {getByTestId} = render(
      wrapper({children: <View testID="children" />}),
    );
    const container = getByTestId('BlockInteractionContainer');
    expect(container.props.style).toMatchObject({top: defaultHeaderHeight});
  });

  it('applies no offset when header is hidden', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      headerHeight: defaultHeaderHeight,
    }));

    const {getByTestId} = render(
      <BlockInteractionScreen hideHeader>
        <View testID="children" />
      </BlockInteractionScreen>,
    );
    const container = getByTestId('BlockInteractionContainer');
    expect(container.props.style).toMatchObject({top: 0});
  });
});
