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
import {DoubleIcon} from '@axelor/aos-mobile-ui';
import {getComputedStyles, getDefaultThemeColors, setup} from '../../tools';

describe('DoubleIcon Component', () => {
  const Colors = getDefaultThemeColors();

  const props = {
    topIconConfig: {
      name: 'plus',
    },
    bottomIconConfig: {
      name: 'person-fill',
    },
  };

  const setupDoubleIcon = overrideProps =>
    setup({
      Component: DoubleIcon,
      baseProps: props,
      overrideProps,
    });

  it('should render without crashing', () => {
    expect(() => setupDoubleIcon()).not.toThrow();
  });

  it('should give all props of topIconConfig and bottomIconConfig to the right icons', () => {
    const topIconConfig = {
      name: 'plus',
      color: Colors.primaryColor.background,
      size: 20,
    };
    const bottomIconConfig = {
      name: 'person-fill',
      color: Colors.secondaryColor.background,
      size: 15,
    };
    const {getByTestId} = setupDoubleIcon({
      topIconConfig,
      bottomIconConfig,
    });

    const bottomIcon = getByTestId(`icon-${bottomIconConfig.name}`);
    const topIcon = getByTestId(`icon-${topIconConfig.name}`);

    expect(bottomIcon.props.fill).toBe(bottomIconConfig.color);
    expect(bottomIcon.props.width).toBe(bottomIconConfig.size);
    expect(bottomIcon.props.height).toBe(bottomIconConfig.size);

    expect(topIcon.props.fill).toBe(topIconConfig.color);
    expect(topIcon.props.width).toBe(topIconConfig.size);
    expect(topIcon.props.height).toBe(topIconConfig.size);
  });

  it('should use size props if size is not defined in icon configs', () => {
    const size = 50;
    const {getByTestId} = setupDoubleIcon({size});

    const bottomIcon = getByTestId(`icon-${props.bottomIconConfig.name}`);
    const topIcon = getByTestId(`icon-${props.topIconConfig.name}`);

    expect(bottomIcon.props.width).toBe(size);
    expect(bottomIcon.props.height).toBe(size);
    expect(topIcon.props.width).toBeCloseTo(size * 0.6);
    expect(topIcon.props.height).toBeCloseTo(size * 0.6);
  });

  it('should give touchable props when provided', () => {
    const {getByTestId, rerender, props} = setupDoubleIcon({touchable: true});

    expect(
      getByTestId('doubleIconTouchable').props.accessibilityState?.disabled,
    ).toBe(false);

    rerender(<DoubleIcon {...props} touchable={false} />);

    expect(
      getByTestId('doubleIconTouchable').props.accessibilityState?.disabled,
    ).toBe(true);
  });

  it('should call onPress when icons are pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = setupDoubleIcon({onPress, touchable: true});

    fireEvent.press(getByTestId('doubleIconTouchable'));

    expect(onPress).toHaveBeenCalledTimes(1);
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

    Object.entries(predefinedPositions).forEach(([positionKey, expected]) => {
      const {getByTestId} = setupDoubleIcon({
        predefinedPosition: positionKey,
      });

      const styles = getComputedStyles(
        getByTestId('topIconContainer').props.style,
      );
      expect(styles).toMatchObject(expected);
    });
  });

  it('should use topIconPosition props if provided', () => {
    const topIconPosition = {
      left: 10,
      right: -15,
    };
    const {getByTestId} = setupDoubleIcon({topIconPosition});

    const styles = getComputedStyles(
      getByTestId('topIconContainer').props.style,
    );
    expect(styles).toMatchObject(topIconPosition);
  });

  it('should render with custom style', () => {
    const customStyle = {
      margin: 20,
    };
    const {getByTestId} = setupDoubleIcon({style: customStyle});

    const touchableStyles = getComputedStyles(
      getByTestId('doubleIconTouchable').props.style,
    );

    expect(touchableStyles).toMatchObject(customStyle);
  });
});
