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
import {Platform, RefreshControl} from 'react-native';
import {
  KeyboardAvoidingScrollView,
  Text,
  DEFAULT_OFFSET,
} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

jest.mock('react-native', () => {
  const React = require('react');
  const RN = jest.requireActual('react-native');

  return {
    ...RN,
    KeyboardAvoidingView: props => (
      <RN.View testID="keyboardAvoidingView" {...props} />
    ),
  };
});

describe('KeyboardAvoidingScrollView Component', () => {
  const setupKeyboardAvoidingScrollView = overrideProps =>
    setup({
      Component: KeyboardAvoidingScrollView,
      baseProps: {
        children: <Text>children</Text>,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupKeyboardAvoidingScrollView();

    expect(getByTestId('keyboardAvoidingView')).toBeTruthy();
    expect(getByTestId('keyboardAvoidingScrollView')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const {getByText} = setupKeyboardAvoidingScrollView();

    expect(getByText('children')).toBeTruthy();
  });

  it('applies refreshControl when provided', () => {
    const {getByTestId} = setupKeyboardAvoidingScrollView({
      refresh: {loading: true, fetcher: jest.fn()},
    });

    const scroll = getByTestId('keyboardAvoidingScrollView');
    const refreshControl = scroll.props.refreshControl;

    expect(refreshControl).toBeTruthy();
    expect(refreshControl?.type).toBe(RefreshControl);
    expect(refreshControl?.props.refreshing).toBe(true);
  });

  describe('applies platform-specific props', () => {
    it.each([
      ['ios', 'padding', DEFAULT_OFFSET.ios],
      ['android', 'height', DEFAULT_OFFSET.android],
    ])(
      'on %s sets correct behavior and default offset',
      (platform, expectedBehavior, expectedOffset) => {
        Platform.OS = platform;
        const {getByTestId} = setupKeyboardAvoidingScrollView();
        const view = getByTestId('keyboardAvoidingView');

        expect(view.props.behavior).toBe(expectedBehavior);
        expect(view.props.keyboardVerticalOffset).toBe(expectedOffset);
      },
    );

    it.each([
      ['ios', DEFAULT_OFFSET.ios - 10],
      ['android', DEFAULT_OFFSET.android - 10],
    ])('on %s overrides offset', (platform, expectedOffset) => {
      Platform.OS = platform;
      const {getByTestId} = setupKeyboardAvoidingScrollView({
        keyboardOffset: {[platform]: expectedOffset},
      });
      const view = getByTestId('keyboardAvoidingView');

      expect(view.props.keyboardVerticalOffset).toBe(expectedOffset);
    });
  });
});
