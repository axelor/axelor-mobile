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
import {Platform, RefreshControl} from 'react-native';
import {render} from '@testing-library/react-native';
import {
  KeyboardAvoidingScrollView,
  Text,
  DEFAULT_OFFSET,
} from '@axelor/aos-mobile-ui';

describe('KeyboardAvoidingScrollView Component', () => {
  const wrapper = props => (
    <KeyboardAvoidingScrollView {...props}>
      <Text>Child</Text>
    </KeyboardAvoidingScrollView>
  );

  it('renders without crashing', () => {
    const {getByTestId} = render(wrapper());

    expect(getByTestId('keyboardAvoidingScrollView')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const {getByText} = render(wrapper());
    expect(getByText('Child')).toBeTruthy();
  });

  it('applies refreshControl when provided', () => {
    const fetcher = jest.fn();

    const {getByTestId} = render(wrapper({refresh: {loading: true, fetcher}}));

    const scroll = getByTestId('keyboardAvoidingScrollView');
    const refreshControl = scroll.props.refreshControl;

    expect(refreshControl).toBeTruthy();
    expect(refreshControl?.type).toBe(RefreshControl);
    expect(refreshControl?.props.refreshing).toBe(true);
  });

  describe('platform-specific props', () => {
    it.each([
      ['ios', 'padding', DEFAULT_OFFSET.ios],
      ['android', 'height', DEFAULT_OFFSET.android],
    ])(
      'on %s sets correct behavior and default offset',
      (platform, expectedBehavior, expectedOffset) => {
        Platform.OS = platform;
        const {getByTestId} = render(wrapper());
        const view = getByTestId('keyboardAvoidingView');
        expect(view.props.behavior).toBe(expectedBehavior);
        expect(view.props.keyboardVerticalOffset).toBe(expectedOffset);
      },
    );

    it('overrides offset for ios', () => {
      Platform.OS = 'ios';
      const {getByTestId} = render(
        wrapper({keyboardOffset: {ios: DEFAULT_OFFSET.ios}}),
      );
      const view = getByTestId('keyboardAvoidingView');
      expect(view.props.keyboardVerticalOffset).toBe(DEFAULT_OFFSET.ios);
    });

    it('overrides offset for android', () => {
      Platform.OS = 'android';
      const {getByTestId} = render(
        wrapper({keyboardOffset: {android: DEFAULT_OFFSET.android}}),
      );
      const view = getByTestId('keyboardAvoidingView');
      expect(view.props.keyboardVerticalOffset).toBe(DEFAULT_OFFSET.android);
    });
  });
});
