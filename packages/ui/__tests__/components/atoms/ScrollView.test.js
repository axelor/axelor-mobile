/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {RefreshControl, View} from 'react-native';
import {ScrollView} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';
import {getTestIdStyles, setup} from '../../tools';

describe('ScrollView Component', () => {
  const setupScrollView = overrideProps =>
    setup({
      Component: ScrollView,
      baseProps: {children: <View testID="child" />},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupScrollView();

    expect(getByTestId('scrollViewContainer')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const {getByTestId} = setupScrollView();

    expect(getByTestId('child')).toBeTruthy();
  });

  it('applies refreshControl when provided', () => {
    const {getByTestId} = setupScrollView({
      refresh: {loading: true, fetcher: jest.fn()},
    });

    const scroll = getByTestId('scrollViewContainer');
    const refreshControl = scroll.props.refreshControl;

    expect(refreshControl).toBeTruthy();
    expect(refreshControl?.type).toBe(RefreshControl);
    expect(refreshControl?.props.refreshing).toBe(true);
  });

  it('sets scrollEnabled to false when isScrollEnabled is false from context', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      isScrollEnabled: false,
    }));

    const {getByTestId} = setupScrollView();

    expect(getByTestId('scrollViewContainer').props.scrollEnabled).toBe(false);
  });

  it('applies custom styles', () => {
    const {props} = setupScrollView({
      style: {backgroundColor: 'red'},
      children: <View testID="child" />,
    });

    expect(
      getTestIdStyles('scrollViewContainer', 'contentContainerStyle'),
    ).toMatchObject(props.style);
  });
});
