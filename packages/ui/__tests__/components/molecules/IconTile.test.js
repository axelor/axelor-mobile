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
import {fireEvent} from '@testing-library/react-native';
import {IconTile, Text, addOpacityToHex} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('IconTile Component', () => {
  const Colors = getDefaultThemeColors();

  const setupIconTile = overrideProps =>
    setup({
      Component: IconTile,
      baseProps: {
        testID: 'iconTile',
        icon: 'heart-fill',
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId, props} = setupIconTile();

    expect(getByTestId('iconTile')).toBeTruthy();
    expect(getByTestId(`icon-${props.icon}`)).toBeTruthy();
  });

  it('uses the primary color by default', () => {
    const {getByTestId, props} = setupIconTile();

    expect(getByTestId('iconTile')).toHaveStyle({
      backgroundColor: addOpacityToHex(Colors.primaryColor.background, 0.3),
    });
    expect(getByTestId(`icon-${props.icon}`).props.fill).toBe(
      Colors.primaryColor.background,
    );
  });

  it('derives background and icon color from the color prop', () => {
    const {getByTestId, props} = setupIconTile({color: Colors.infoColor});

    expect(getByTestId('iconTile')).toHaveStyle({
      backgroundColor: addOpacityToHex(Colors.infoColor.background, 0.3),
    });
    expect(getByTestId(`icon-${props.icon}`).props.fill).toBe(
      Colors.infoColor.background,
    );
  });

  it('lets backgroundColor and iconColor override the color prop', () => {
    const {getByTestId, props} = setupIconTile({
      color: Colors.infoColor,
      backgroundColor: '#123456',
      iconColor: '#654321',
    });

    expect(getByTestId('iconTile')).toHaveStyle({backgroundColor: '#123456'});
    expect(getByTestId(`icon-${props.icon}`).props.fill).toBe('#654321');
  });

  it('renders a fixed square when size is provided', () => {
    const {getByTestId} = setupIconTile({size: 40});

    expect(getByTestId('iconTile')).toHaveStyle({width: 40, height: 40});
  });

  it('falls back to padding-based sizing when size is omitted', () => {
    const {getByTestId} = setupIconTile({padding: 14});

    expect(getByTestId('iconTile')).toHaveStyle({padding: 14});
  });

  it('applies the provided border radius', () => {
    const {getByTestId} = setupIconTile({borderRadius: 4});

    expect(getByTestId('iconTile')).toHaveStyle({borderRadius: 4});
  });

  it('forwards the icon size', () => {
    const {getByTestId, props} = setupIconTile({iconSize: 30});

    const _icon = getByTestId(`icon-${props.icon}`);
    expect(_icon.props.width).toBe(30);
    expect(_icon.props.height).toBe(30);
  });

  it('renders children alongside the icon', () => {
    const {getByText, getByTestId, props} = setupIconTile({
      children: <Text>child</Text>,
    });

    expect(getByTestId(`icon-${props.icon}`)).toBeTruthy();
    expect(getByText('child')).toBeTruthy();
  });

  it('does not render an icon when icon is omitted but still renders children', () => {
    const {queryByTestId, getByText} = setupIconTile({
      icon: undefined,
      children: <Text>child</Text>,
    });

    expect(queryByTestId('icon-heart-fill')).toBeFalsy();
    expect(getByText('child')).toBeTruthy();
  });

  it('calls the provided onPress handler', () => {
    const onPress = jest.fn();
    const {getByTestId} = setupIconTile({onPress});

    fireEvent.press(getByTestId('iconTile'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const {getByTestId} = setupIconTile({onPress, disabled: true});

    fireEvent.press(getByTestId('iconTile'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies custom style to the tile', () => {
    const {getByTestId} = setupIconTile({style: {marginRight: 8}});

    expect(getByTestId('iconTile')).toHaveStyle({marginRight: 8});
  });
});
