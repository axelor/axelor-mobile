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
import {Button, View} from 'react-native';
import {render} from '@testing-library/react-native';
import {Screen} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Screen Component', () => {
  const baseProps = {
    children: <View testID="child" />,
  };

  const setupScreen = (overrideProps = {}) =>
    setup({
      Component: Screen,
      baseProps,
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupScreen();
    expect(getByTestId('child')).toBeTruthy();
  });

  it('shows loading indicator when `loading` is true', () => {
    const {getByTestId} = setupScreen({loading: true});
    expect(getByTestId('loadingIndicator')).toBeTruthy();
  });

  it('does not show loading indicator when `loading` is false', () => {
    const {queryByTestId} = setupScreen({loading: false});
    expect(queryByTestId('loadingIndicator')).toBeNull();
  });

  it('renders fixedItems when provided', () => {
    const {getByTestId} = setupScreen({
      fixedItems: <Button testID="fixedButton" title="Fixed" />,
    });
    expect(getByTestId('fixedButton')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByTestId, props} = setupScreen({style: customStyle});
    expect(getByTestId('screenRoot')).toHaveStyle(props.style);
  });
});
