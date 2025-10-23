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
import {Alert, Text} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Alert Component', () => {
  const setupAlert = overrideProps =>
    setup({
      Component: Alert,
      baseProps: {
        visible: true,
        title: 'TEST',
        children: <Text>ALERT</Text>,
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    expect(() => setupAlert()).not.toThrow();
  });

  it('should render the content when visible', () => {
    const {getByTestId} = setupAlert();

    expect(getByTestId('cardContainer')).toBeTruthy();
  });

  it('should not render the content when visible prop is false', () => {
    const {queryByTestId} = setupAlert({visible: false});

    expect(queryByTestId('cardContainer')).toBeNull();
  });

  it('should render the title', () => {
    const {getByText, props} = setupAlert();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should render the children', () => {
    const {getByText, props} = setupAlert();
    const childContent = props.children.props.children;

    expect(getByText(childContent)).toBeTruthy();
  });

  it('should render the cancelButtonConfig and the confirmButtonConfig', () => {
    const cancelButtonConfig = {title: 'Cancel', testID: 'cancelButton'};
    const confirmButtonConfig = {title: 'Confirm', testID: 'confirmButton'};
    const {getByTestId} = setupAlert({
      cancelButtonConfig,
      confirmButtonConfig,
    });

    expect(getByTestId(cancelButtonConfig.testID)).toBeTruthy();
    expect(getByTestId(confirmButtonConfig.testID)).toBeTruthy();
  });

  it('should not render the cancelButtonConfig and the confirmButtonConfig when hide prop is true', () => {
    const cancelButtonConfig = {
      title: 'Cancel',
      testID: 'cancelButton',
      hide: true,
    };
    const confirmButtonConfig = {
      title: 'Confirm',
      testID: 'confirmButton',
      hide: true,
    };
    const {queryByTestId} = setupAlert({
      cancelButtonConfig,
      confirmButtonConfig,
    });

    expect(queryByTestId(cancelButtonConfig.testID)).toBeNull();
    expect(queryByTestId(confirmButtonConfig.testID)).toBeNull();
  });

  it('should render the cancel button in the header when showInHeader prop is true', () => {
    const cancelButtonConfig = {
      testID: 'cancelButton',
      title: 'Cancel',
      showInHeader: true,
    };
    const {getAllByTestId, getByTestId, queryByTestId} = setupAlert({
      cancelButtonConfig,
      confirmButtonConfig: {hide: true},
    });

    expect(queryByTestId(cancelButtonConfig.testID)).toBeNull();
    expect(getByTestId('iconTouchable')).toBeTruthy();
    expect(getAllByTestId('iconTouchable')).toHaveLength(1);
  });
});
