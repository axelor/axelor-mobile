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
import {Alert} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Alert Component', () => {
  const setupAlert = overrideProps =>
    setup({
      Component: Alert,
      baseProps: {
        visible: true,
        title: 'Alert title',
        children: <View testID="alertChildren" />,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupAlert();

    expect(getByTestId('alertModal')).toBeTruthy();
  });

  it('should render the content when visible', () => {
    const {getByTestId} = setupAlert();

    expect(getByTestId('alertChildren')).toBeTruthy();
  });

  it('should not render the content when visible prop is false', () => {
    const {queryByTestId} = setupAlert({visible: false});

    expect(queryByTestId('alertChildren')).toBeFalsy();
  });

  it('should render the title', () => {
    const {getByText, props} = setupAlert();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should render the cancelButtonConfig and the confirmButtonConfig', () => {
    const {getByTestId} = setupAlert({
      cancelButtonConfig: {title: 'Cancel'},
      confirmButtonConfig: {title: 'Confirm'},
    });

    expect(getByTestId('alertCancelButton')).toBeTruthy();
    expect(getByTestId('alertConfirmButton')).toBeTruthy();
  });

  it('should not render the cancelButtonConfig and the confirmButtonConfig when hide prop is true', () => {
    const {queryByTestId} = setupAlert({
      cancelButtonConfig: {title: 'Cancel', hide: true},
      confirmButtonConfig: {title: 'Confirm', hide: true},
    });

    expect(queryByTestId('alertCancelButton')).toBeFalsy();
    expect(queryByTestId('alertConfirmButton')).toBeFalsy();
  });

  it('should render the cancel button in the header when showInHeader prop is true', () => {
    const {getAllByTestId, getByTestId, queryByTestId} = setupAlert({
      cancelButtonConfig: {title: 'Cancel', showInHeader: true},
    });

    expect(queryByTestId('alertCancelButton')).toBeFalsy();
    expect(getAllByTestId('iconTouchable')).toHaveLength(1);
    expect(getByTestId('icon-x-lg')).toBeTruthy();
  });

  it('renders with custom style', () => {
    const {getByTestId, props} = setupAlert({style: {margin: 10}});

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });
});
