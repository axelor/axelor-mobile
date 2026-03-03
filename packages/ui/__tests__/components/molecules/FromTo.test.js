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
import {View} from 'react-native';
import {FromTo} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('FromTo Component', () => {
  const setupFromTo = overrideProps =>
    setup({
      Component: FromTo,
      baseProps: {
        fromComponent: <View testID="mocked_from" />,
        toComponent: <View testID="mocked_to" />,
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupFromTo();

    expect(getByTestId('fromToContainer')).toBeTruthy();
  });

  it('renders the fromComponent, arrow icon, and toComponent', () => {
    const {getByTestId} = setupFromTo();

    expect(getByTestId('mocked_from')).toBeTruthy();
    expect(getByTestId('icon-chevron-right')).toBeTruthy();
    expect(getByTestId('mocked_to')).toBeTruthy();
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupFromTo({style: {width: 200}});

    expect(getByTestId('fromToContainer')).toHaveStyle(props.style);
  });
});
