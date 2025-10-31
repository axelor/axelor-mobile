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
import {HeaderContainer} from '@axelor/aos-mobile-ui';
import {fireEvent} from '@testing-library/react-native';
import * as configContext from '../../../lib/config/ConfigContext';
import {setup} from '../../tools';

describe('HeaderContainer Component', () => {
  const setupHeaderContainer = overrideProps =>
    setup({
      Component: HeaderContainer,
      baseProps: {
        fixedItems: <View testID="fixedItems" />,
        children: <View testID="children" />,
        chipComponent: <View testID="chipComponent" />,
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupHeaderContainer();

    expect(getByTestId('headerContainerWrapper')).toBeTruthy();
  });

  it('should render fixedItems, children and chipComponent', () => {
    const {getByTestId} = setupHeaderContainer();

    expect(getByTestId('fixedItems')).toBeTruthy();
    expect(getByTestId('children')).toBeTruthy();
    expect(getByTestId('chipComponent')).toBeTruthy();
  });

  it('should not render children if expandableFilter is false', () => {
    const {queryByTestId} = setupHeaderContainer({expandableFilter: false});

    expect(queryByTestId('headerContainerExpandableIcon')).toBeFalsy();
    expect(queryByTestId('children')).toBeFalsy();
  });

  it('should not render children if forceHideByDefault is true', () => {
    const {queryByTestId} = setupHeaderContainer({forceHideByDefault: true});

    expect(queryByTestId('children')).toBeFalsy();
  });

  it('should not render children if showFilter is false', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      showFilter: false,
    }));

    const {queryByTestId} = setupHeaderContainer();

    expect(queryByTestId('children')).toBeFalsy();
  });

  it('should render children if showFilter is true', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      showFilter: true,
    }));

    const {getByTestId} = setupHeaderContainer();

    expect(getByTestId('children')).toBeTruthy();
  });

  it('should render an Icon which toggle children when click on it', () => {
    const {getByTestId, queryByTestId} = setupHeaderContainer();

    expect(getByTestId('headerContainerExpandableIcon')).toBeTruthy();
    expect(getByTestId('children')).toBeTruthy();

    fireEvent.press(getByTestId('headerContainerExpandableIcon'));

    expect(queryByTestId('children')).toBeFalsy();

    fireEvent.press(getByTestId('headerContainerExpandableIcon'));

    expect(getByTestId('children')).toBeTruthy();
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupHeaderContainer({style: {width: 200}});

    expect(getByTestId('headerContainerWrapper')).toHaveStyle(props.style);
  });
});
