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
import {ToggleButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('ToggleButton Component', () => {
  const Colors = getDefaultThemeColors();

  const setupToggleButton = overrideProps =>
    setup({
      Component: ToggleButton,
      baseProps: {
        activeColor: Colors.errorColor,
        inactiveColor: Colors.warningColor,
        buttonConfig: {title: 'Button title', iconName: 'check'},
        onPress: jest.fn(),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByRole} = setupToggleButton();

    expect(getByRole('button')).toBeTruthy();
  });

  it('should give the props of buttonConfig to Button component', () => {
    const {getByTestId, getByText, props} = setupToggleButton();

    expect(getByText(props.buttonConfig.title)).toBeTruthy();
    expect(getByTestId(`icon-${props.buttonConfig.iconName}`)).toBeTruthy();
  });

  it('should render a Button whose color changes if pressed', () => {
    const {getByRole, props} = setupToggleButton({onPress: jest.fn()});

    expect(getByRole('button')).toHaveStyle({
      borderColor: props.inactiveColor.background,
      backgroundColor: Colors.backgroundColor,
    });

    fireEvent.press(getByRole('button'));
    expect(props.onPress).toHaveBeenCalledWith(true);

    expect(getByRole('button')).toHaveStyle({
      borderColor: props.activeColor.background,
      backgroundColor: props.activeColor.background_light,
    });

    fireEvent.press(getByRole('button'));
    expect(props.onPress).toHaveBeenCalledWith(false);

    expect(getByRole('button')).toHaveStyle({
      borderColor: props.inactiveColor.background,
      backgroundColor: Colors.backgroundColor,
    });
  });

  it('should render a Button with isNeutralBackground props set to false if provided', () => {
    const {getByRole, props} = setupToggleButton({isNeutralBackground: false});

    expect(getByRole('button')).toHaveStyle({
      borderColor: props.inactiveColor.background,
      backgroundColor: props.inactiveColor.background_light,
    });
  });

  it('should render a Button with default color set to activeColor if isActive is true', () => {
    const {getByRole, props} = setupToggleButton({isActive: true});

    expect(getByRole('button')).toHaveStyle({
      borderColor: props.activeColor.background,
      backgroundColor: props.activeColor.background_light,
    });
  });
});
