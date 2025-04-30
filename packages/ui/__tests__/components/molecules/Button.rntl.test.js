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
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Button} from '@axelor/aos-mobile-ui';
import {getRNTLGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('Button Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    title: 'Click here',
    onPress: jest.fn(),
    width: 45,
  };

  it('renders correctly with default props', () => {
    render(<Button {...props} />);
    const button = screen.getByRole('button');

    expect(button).toBeTruthy();
    expect(button.props.disabled).toBeFalsy();
  });

  it('renders with custom style', () => {
    const style = {margin: 10};
    render(<Button {...props} style={style} />);
    const button = screen.getByRole('button');

    expect(getRNTLGlobalStyles(button)).toMatchObject({
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.primaryColor.background_light,
    });

    const text = screen.getByText(props.title);
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: Colors.primaryColor.foreground}),
      ]),
    );
  });

  it('renders with correct color', () => {
    render(<Button {...props} color={Colors.secondaryColor_dark} />);
    const button = screen.getByRole('button');

    expect(getRNTLGlobalStyles(button)).toMatchObject({
      borderColor: Colors.secondaryColor_dark.background,
      backgroundColor: Colors.secondaryColor_dark.background_light,
    });

    const text = screen.getByText(props.title);
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: Colors.secondaryColor_dark.foreground}),
      ]),
    );
  });

  it('renders neutral background when asked', () => {
    render(<Button {...props} isNeutralBackground />);
    const button = screen.getByRole('button');

    expect(getRNTLGlobalStyles(button)).toMatchObject({
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.backgroundColor,
    });

    const text = screen.getByText(props.title);
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({color: Colors.text})]),
    );
  });

  it('renders Icon when provided', () => {
    const iconProps = {
      iconName: 'check',
      iconSize: 24,
      styleIcon: {marginTop: 60},
    };
    render(<Button {...props} {...iconProps} />);
    const icon = screen.getByTestId('icon');

    expect(icon).toBeTruthy();
  });

  it('renders with disabled state when no disabledPress', () => {
    render(<Button {...props} disabled />);
    const button = screen.getByRole('button');

    fireEvent.press(button);
    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('renders with no disabled state when it has disabledPress', () => {
    const onDisabledPress = jest.fn();
    render(<Button {...props} disabled onDisabledPress={onDisabledPress} />);
    const button = screen.getByRole('button');

    fireEvent.press(button);
    expect(onDisabledPress).toHaveBeenCalled();
  });
});
