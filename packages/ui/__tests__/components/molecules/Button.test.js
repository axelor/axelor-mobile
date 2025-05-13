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
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Button} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

describe('Button Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    title: 'Click here',
    onPress: jest.fn(),
    width: 45,
  };

  it('renders without crashing', () => {
    render(<Button {...props} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('renders correctly with default props', () => {
    render(<Button {...props} />);

    expect(screen.getByText(props.title)).toBeTruthy();
    expect(screen.getByRole('button').props.disabled).toBeFalsy();
  });

  it('should call onPress function when needed', () => {
    const onPress = jest.fn();
    render(<Button {...props} onPress={onPress} />);

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('should not call the onPress function in disabled state', () => {
    const onPress = jest.fn();
    render(<Button {...props} onPress={onPress} disabled />);

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the right onPress function in disabled state', () => {
    const onPress = jest.fn();
    const onDisabledPress = jest.fn();
    render(
      <Button
        {...props}
        onPress={onPress}
        disabled
        onDisabledPress={onDisabledPress}
      />,
    );

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
    expect(onDisabledPress).toHaveBeenCalled();
  });

  it('renders with custom style', () => {
    const style = {margin: 10};
    const defaultColor = Colors.primaryColor;
    render(<Button {...props} style={style} />);

    expect(screen.getByRole('button')).toHaveStyle({
      borderColor: defaultColor.background,
      backgroundColor: defaultColor.background_light,
      width: props.width,
      ...style,
    });

    expect(screen.getByText(props.title)).toHaveStyle({
      color: defaultColor.foreground,
    });
  });

  it('renders with correct color', () => {
    const color = Colors.secondaryColor_dark;
    render(<Button {...props} color={color} />);

    expect(screen.getByRole('button')).toHaveStyle({
      borderColor: color.background,
      backgroundColor: color.background_light,
    });

    expect(screen.getByText(props.title)).toHaveStyle({
      color: color.foreground,
    });
  });

  it('renders neutral background when asked', () => {
    render(<Button {...props} isNeutralBackground />);

    expect(screen.getByRole('button')).toHaveStyle({
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.backgroundColor,
    });

    expect(screen.getByText(props.title)).toHaveStyle({
      color: Colors.text,
    });
  });

  it('renders Icon when provided', () => {
    render(<Button {...props} iconName="check" />);

    expect(screen.getByTestId('icon')).toBeTruthy();
  });
});
