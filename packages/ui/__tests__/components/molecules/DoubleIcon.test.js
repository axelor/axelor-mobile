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
import {DoubleIcon} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('DoubleIcon Component', () => {
  const Colors = getDefaultThemeColors();

  const setupDoubleIcon = overrideProps =>
    setup({
      Component: DoubleIcon,
      baseProps: {
        topIconConfig: {
          name: 'plus-lg',
          color: Colors.primaryColor.background,
          size: 20,
        },
        bottomIconConfig: {
          name: 'person-fill',
          color: Colors.secondaryColor.background,
          size: 15,
        },
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupDoubleIcon();

    expect(getByTestId('doubleIconTouchable')).toBeTruthy();
  });

  it('should give all props of topIconConfig and bottomIconConfig to the right icons', () => {
    const {getByTestId, props} = setupDoubleIcon();

    const bottomIcon = getByTestId(`icon-${props.bottomIconConfig.name}`);
    expect(bottomIcon.props.fill).toBe(props.bottomIconConfig.color);
    expect(bottomIcon.props.width).toBe(props.bottomIconConfig.size);
    expect(bottomIcon.props.height).toBe(props.bottomIconConfig.size);

    const topIcon = getByTestId(`icon-${props.topIconConfig.name}`);
    expect(topIcon.props.fill).toBe(props.topIconConfig.color);
    expect(topIcon.props.width).toBe(props.topIconConfig.size);
    expect(topIcon.props.height).toBe(props.topIconConfig.size);
  });

  it('should use size props if size is not defined in icon configs', () => {
    const {getByTestId, props} = setupDoubleIcon({
      size: 50,
      topIconConfig: {name: 'plus-lg'},
      bottomIconConfig: {name: 'person-fill'},
    });

    const bottomIcon = getByTestId(`icon-${props.bottomIconConfig.name}`);
    expect(bottomIcon.props.width).toBe(props.size);
    expect(bottomIcon.props.height).toBe(props.size);

    const topIcon = getByTestId(`icon-${props.topIconConfig.name}`);
    expect(topIcon.props.width).toBeCloseTo(props.size * 0.6);
    expect(topIcon.props.height).toBeCloseTo(props.size * 0.6);
  });

  it('should call onPress when pressed', () => {
    const {getByTestId, props} = setupDoubleIcon({
      onPress: jest.fn(),
      touchable: true,
    });

    fireEvent.press(getByTestId('doubleIconTouchable'));
    expect(props.onPress).toHaveBeenCalled();
  });

  it('should not invocke onPress when pressed in disabled state', () => {
    const {getByTestId, props} = setupDoubleIcon({
      onPress: jest.fn(),
      touchable: false,
    });

    fireEvent.press(getByTestId('doubleIconTouchable'));
    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('should use predefinedPositions props if provided', () => {
    const predefinedPositions = {
      left: {left: -10},
      top: {top: -10},
      right: {right: -10},
      bottom: {bottom: -10},
      'bottom-right': {bottom: -10, right: -10},
      'bottom-left': {bottom: -7, left: -10},
      'top-left': {top: -10, left: -10},
      'top-right': {top: -10, right: -10},
    };
    const {getByTestId, rerender} = setupDoubleIcon();

    Object.entries(predefinedPositions).forEach(([positionKey, expected]) => {
      rerender({predefinedPosition: positionKey});

      expect(getByTestId('topIconContainer')).toHaveStyle(expected);
    });
  });

  it('should use topIconPosition props if provided', () => {
    const {getByTestId, props} = setupDoubleIcon({
      topIconPosition: {left: 10, right: -15},
    });

    expect(getByTestId('topIconContainer')).toHaveStyle(props.topIconPosition);
  });

  it('should render with custom style', () => {
    const {getByTestId, props} = setupDoubleIcon({style: {margin: 20}});

    expect(getByTestId('doubleIconTouchable')).toHaveStyle(props.style);
  });
});
