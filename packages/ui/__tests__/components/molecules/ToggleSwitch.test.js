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

import {fireEvent} from '@testing-library/react-native';
import {ToggleSwitch} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('ToggleSwitch Component', () => {
  const Colors = getDefaultThemeColors();

  const setupToggleSwitch = overrideProps =>
    setup({
      Component: ToggleSwitch,
      baseProps: {
        leftTitle: 'Left',
        rightTitle: 'rightTitle',
        onSwitch: jest.fn(),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupToggleSwitch();

    expect(getByTestId('toggleSwitchContainer')).toBeTruthy();
  });

  it('calls onSwitch when left side is pressed', () => {
    const {getByTestId, props} = setupToggleSwitch({onSwitch: jest.fn()});

    // Make left side disabled first as function is not called if the item is active
    fireEvent.press(getByTestId('toggleSwitchRightButton'));

    fireEvent.press(getByTestId('toggleSwitchLeftButton'));
    expect(props.onSwitch).toHaveBeenCalledTimes(2);
  });

  it('calls onSwitch when right side is pressed', () => {
    const {getByTestId, props} = setupToggleSwitch({onSwitch: jest.fn()});

    fireEvent.press(getByTestId('toggleSwitchRightButton'));
    expect(props.onSwitch).toHaveBeenCalledTimes(1);
  });

  it('changes active style on press', () => {
    const style = {backgroundColor: Colors.primaryColor.background_light};
    const {getByTestId} = setupToggleSwitch({onSwitch: jest.fn()});

    expect(getByTestId('toggleSwitchLeftButton')).toHaveStyle(style);
    expect(getByTestId('toggleSwitchRightButton')).not.toHaveStyle(style);

    fireEvent.press(getByTestId('toggleSwitchRightButton'));

    expect(getByTestId('toggleSwitchLeftButton')).not.toHaveStyle(style);
    expect(getByTestId('toggleSwitchRightButton')).toHaveStyle(style);
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupToggleSwitch({
      styleToogle: {height: 50},
      styleContainer: {width: 200},
    });

    expect(getByTestId('toggleSwitchContainer')).toHaveStyle(
      props.styleContainer,
    );
    expect(getByTestId('toggleSwitchLeftButton')).toHaveStyle(
      props.styleToogle,
    );
    expect(getByTestId('toggleSwitchRightButton')).toHaveStyle(
      props.styleToogle,
    );
  });
});
