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
import {CircleButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('CircleButton Component', () => {
  const Colors = getDefaultThemeColors();

  const setupCircleButton = overrideProps =>
    setup({
      Component: CircleButton,
      baseProps: {
        testID: 'circleButton',
        onPress: jest.fn(),
        iconName: 'check-lg',
        disabled: false,
        size: 50,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupCircleButton();

    expect(getByTestId('circleButton')).toBeTruthy();
  });

  it('should render enabled circle button with default styles', () => {
    const {getByTestId, props} = setupCircleButton({square: false});

    expect(getByTestId('circleButton')).toHaveStyle({
      borderRadius: props.size,
      width: props.size,
      height: props.size,
    });

    const _iconElt = getByTestId(`icon-${props.iconName}`);
    expect(_iconElt).toBeTruthy();
    expect(_iconElt.props.width).toBe(Math.floor(props.size / 2));
    expect(_iconElt.props.height).toBe(Math.floor(props.size / 2));
  });

  it('should render square button with default border radius', () => {
    const {getByTestId, props} = setupCircleButton();

    expect(getByTestId('circleButton')).toHaveStyle({
      borderRadius: 7,
      width: props.size,
      height: props.size,
    });
  });

  it('should forward provided color to Button', () => {
    const {getByTestId, props} = setupCircleButton({color: Colors.infoColor});

    expect(getByTestId('circleButton')).toHaveStyle({
      borderColor: props.color.background,
      backgroundColor: props.color.background_light,
    });
  });

  it('should trigger onPress when pressed', () => {
    const {getByTestId, props} = setupCircleButton({
      onPress: jest.fn(),
      disabled: false,
      onDisabledPress: jest.fn(),
    });

    fireEvent.press(getByTestId('circleButton'));
    expect(props.onPress).toHaveBeenCalled();
    expect(props.onDisabledPress).not.toHaveBeenCalled();
  });

  it('should trigger onDisabledPress when pressed in disabled state', () => {
    const {getByTestId, props} = setupCircleButton({
      onPress: jest.fn(),
      disabled: true,
      onDisabledPress: jest.fn(),
    });

    fireEvent.press(getByTestId('circleButton'));
    expect(props.onPress).not.toHaveBeenCalled();
    expect(props.onDisabledPress).toHaveBeenCalled();
  });
});
