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
import {QuantityCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('QuantityCard Component', () => {
  const setupQuantityCard = overrideProps =>
    setup({
      Component: QuantityCard,
      baseProps: {
        labelQty: 'Label qty',
        defaultValue: 5,
        onValueChange: jest.fn(),
        editable: false,
        translator: jest.fn(),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupQuantityCard();

    expect(getByTestId('cardContainer')).toBeTruthy();
  });

  it('renders children when provided', () => {
    const {getByTestId} = setupQuantityCard({
      children: <View testID="children" />,
    });

    expect(getByTestId('children')).toBeTruthy();
  });

  it('renders labelQty', () => {
    const {getByText, props} = setupQuantityCard();

    expect(getByText(props.labelQty)).toBeTruthy();
  });

  it('renders defaultValue when editable', () => {
    const {getByDisplayValue, getByTestId, props} = setupQuantityCard({
      editable: true,
    });

    expect(getByTestId('incrementContainer')).toBeTruthy();
    expect(getByDisplayValue(props.defaultValue.toFixed(2))).toBeTruthy();
  });

  it('renders defaultValue when read-only', () => {
    const {getByText, queryByTestId, props} = setupQuantityCard({
      editable: false,
    });

    expect(queryByTestId('incrementContainer')).toBeFalsy();
    expect(getByText(props.defaultValue.toFixed(2))).toBeTruthy();
  });

  it('renders right icon if actionQty is true', () => {
    const {getByTestId, props} = setupQuantityCard({
      actionQty: true,
      iconName: 'pencil-fill',
      children: <View testID="children" />,
    });

    expect(getByTestId(`icon-${props.iconName}`)).toBeTruthy();
  });

  it('hides right icon if actionQty is false', () => {
    const {queryByTestId, props} = setupQuantityCard({
      actionQty: true,
      iconName: 'pencil-fill',
    });

    expect(queryByTestId(`icon-${props.iconName}`)).toBeFalsy();
  });

  it('should apply custom style when provided with no children', () => {
    const {getByTestId, props} = setupQuantityCard({style: {width: 200}});

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });
});
