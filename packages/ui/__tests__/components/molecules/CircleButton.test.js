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
import {fireEvent} from '@testing-library/react-native';
import {CircleButton} from '@axelor/aos-mobile-ui';
import {getComputedStyles, getDefaultThemeColors, setup} from '../../tools';

const Colors = getDefaultThemeColors();

describe('CircleButton Component', () => {
  const baseProps = {
    onPress: jest.fn(),
    iconName: 'check-lg',
    disabled: false,
    size: 50,
    testID: 'circleButton',
  };

  const setupCircleButton = overrideProps =>
    setup({
      Component: CircleButton,
      baseProps,
      overrideProps,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(() => setupCircleButton()).not.toThrow();
  });

  it('should render enabled circle button with default styles', () => {
    const {
      getByTestId,
      getByTestId: getById,
      props,
    } = setupCircleButton({
      square: false,
      disabled: false,
    });

    const button = getByTestId('circleButton');
    const buttonStyles = getComputedStyles(button.props.style);
    expect(button.props.accessibilityState?.disabled ?? false).toBe(false);
    expect(buttonStyles).toMatchObject({
      borderRadius: props.size,
      width: props.size,
      height: props.size,
    });

    const icon = getById(`icon-${props.iconName}`);
    expect(icon.props.width).toBe(Math.floor(props.size / 2));
    expect(icon.props.height).toBe(Math.floor(props.size / 2));
  });

  it('should render disabled circle button', () => {
    const {
      getByTestId,
      getByTestId: getById,
      props,
    } = setupCircleButton({
      disabled: true,
    });

    const button = getByTestId('circleButton');
    expect(button.props.accessibilityState?.disabled).toBe(true);

    expect(getById(`icon-${props.iconName}`)).toBeTruthy();
  });

  it('should render square button with default border radius', () => {
    const {getByTestId, props} = setupCircleButton({square: true});

    const buttonStyles = getComputedStyles(
      getByTestId('circleButton').props.style,
    );
    expect(buttonStyles).toMatchObject({
      borderRadius: 7,
      width: props.size,
      height: props.size,
    });
  });

  it('should forward provided color to Button', () => {
    const customColor = Colors.infoColor;
    const {getByTestId} = setupCircleButton({color: customColor});
    const buttonStyles = getComputedStyles(
      getByTestId('circleButton').props.style,
    );

    expect(buttonStyles).toMatchObject({
      backgroundColor: customColor.background_light,
      borderColor: customColor.background,
    });
  });

  it('should trigger onPress when pressed', () => {
    const {getByTestId, props} = setupCircleButton({onPress: jest.fn()});

    fireEvent.press(getByTestId('circleButton'));

    expect(props.onPress).toHaveBeenCalledTimes(1);
  });
});
