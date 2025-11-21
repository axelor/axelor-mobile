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
import {Keyboard, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {fireEvent} from '@testing-library/react-native';
import {Screen} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';
import {setup} from '../../tools';

describe('Screen Component', () => {
  const setupScreen = overrideProps =>
    setup({
      Component: Screen,
      baseProps: {children: <View testID="child" />},
      overrideProps,
    });

  beforeEach(() => {
    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation(() => ({remove: jest.fn()}));
  });

  it('renders without crashing', () => {
    const {getByTestId} = setupScreen();

    expect(getByTestId('child')).toBeTruthy();
  });

  it('shows loading indicator when loading is true', () => {
    const {getByTestId, queryByTestId} = setupScreen({loading: true});

    expect(getByTestId('loadingIndicator')).toBeTruthy();
    expect(queryByTestId('screenRoot')).toBeFalsy();
  });

  it('does not show loading indicator when loading is false', () => {
    const {getByTestId, queryByTestId} = setupScreen({loading: false});

    expect(getByTestId('screenRoot')).toBeTruthy();
    expect(queryByTestId('loadingIndicator')).toBeFalsy();
  });

  it('renders fixedItems when provided', () => {
    const {getByTestId} = setupScreen({
      fixedItems: <View testID="fixedItem" />,
    });

    expect(getByTestId('fixedItem')).toBeTruthy();
  });

  it('hides fixed item background if hideButtonBackground is true', () => {
    const {getByTestId} = setupScreen({
      fixedItems: <View testID="fixedItem" />,
      hideButtonBackground: true,
    });

    fireEvent(getByTestId('screenFixedItemsContainer'), 'layout', {
      nativeEvent: {layout: {height: 100}},
    });

    expect(
      getByTestId('screenFixedItemsContainer').props.style.some(
        style => style?.elevation,
      ),
    ).toBe(false);
  });

  it('sets pointerEvents to none when showActivityIndicator is true from context', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      showActivityIndicator: true,
    }));

    const {getByTestId} = setupScreen();

    expect(getByTestId('screenRoot').props.pointerEvents).toBe('none');
  });

  it('applies marginTop if removeSpaceOnTop is false', () => {
    const {getByTestId} = setupScreen({removeSpaceOnTop: false});

    expect(getByTestId('screenRoot')).toHaveStyle({paddingTop: '1.5%'});
  });

  it('does not apply marginTop if removeSpaceOnTop is true', () => {
    const {getByTestId} = setupScreen({removeSpaceOnTop: true});

    expect(getByTestId('screenRoot')).not.toHaveStyle({paddingTop: '1.5%'});
  });

  it('applies custom styles', () => {
    const {getByTestId, props} = setupScreen({style: {backgroundColor: 'red'}});

    expect(getByTestId('screenRoot')).toHaveStyle(props.style);
  });

  it('calls SystemNavigationBar.navigationHide on mount and keyboardDidHide', () => {
    const keyboardListeners = {};
    const navigationHide = jest.fn();
    jest
      .spyOn(SystemNavigationBar, 'navigationHide')
      .mockImplementation(navigationHide);

    jest.spyOn(Keyboard, 'addListener').mockImplementation((event, cb) => {
      keyboardListeners[event] = cb;
      return {remove: jest.fn()};
    });

    setupScreen();

    expect(navigationHide).toHaveBeenCalledTimes(1);

    keyboardListeners['keyboardDidHide']();
    expect(navigationHide).toHaveBeenCalledTimes(2);
  });
});
