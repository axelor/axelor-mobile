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

import {fireEvent} from '@testing-library/react-native';
import {Button} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('Button Component', () => {
  const Colors = getDefaultThemeColors();

  const setupButton = overrideProps =>
    setup({
      Component: Button,
      baseProps: {
        title: 'Click here',
        onPress: jest.fn(),
        width: 45,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByRole} = setupButton();
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders correctly with default props', () => {
    const {getByRole, getByText, props} = setupButton();

    expect(getByText(props.title)).toBeTruthy();
    expect(getByRole('button').props.disabled).toBeFalsy();
  });

  it('should call onPress function when needed', () => {
    const {getByRole, props} = setupButton({onPress: jest.fn()});

    fireEvent.press(getByRole('button'));
    expect(props.onPress).toHaveBeenCalled();
  });

  it('should not call the onPress function in disabled state', () => {
    const {getByRole, props} = setupButton({
      onPress: jest.fn(),
      disabled: true,
    });

    fireEvent.press(getByRole('button'));
    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('should call the right onPress function in disabled state', () => {
    const {getByRole, props} = setupButton({
      onPress: jest.fn(),
      disabled: true,
      onDisabledPress: jest.fn(),
    });

    fireEvent.press(getByRole('button'));
    expect(props.onPress).not.toHaveBeenCalled();
    expect(props.onDisabledPress).toHaveBeenCalled();
  });

  it('renders with custom style', () => {
    const defaultColor = Colors.primaryColor;
    const {getByRole, getByText, props} = setupButton({style: {margin: 10}});

    expect(getByRole('button')).toHaveStyle({
      borderColor: defaultColor.background,
      backgroundColor: defaultColor.background_light,
      width: props.width,
      ...props.style,
    });

    expect(getByText(props.title)).toHaveStyle({
      color: defaultColor.foreground,
    });
  });

  it('renders with correct color', () => {
    const {getByRole, getByText, props} = setupButton({
      color: Colors.secondaryColor_dark,
    });

    expect(getByRole('button')).toHaveStyle({
      borderColor: props.color.background,
      backgroundColor: props.color.background_light,
    });

    expect(getByText(props.title)).toHaveStyle({
      color: props.color.foreground,
    });
  });

  it('renders neutral background when asked', () => {
    const {getByRole, getByText, props} = setupButton({
      isNeutralBackground: true,
    });

    expect(getByRole('button')).toHaveStyle({
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.backgroundColor,
    });

    expect(getByText(props.title)).toHaveStyle({
      color: Colors.text,
    });
  });

  it('renders Icon when provided', () => {
    const {getByTestId, props} = setupButton({iconName: 'check'});

    expect(getByTestId(`icon-${props.iconName}`)).toBeTruthy();
  });
});
