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
import {Chip} from '@axelor/aos-mobile-ui';
import {getComputedStyles, getDefaultThemeColors, setup} from '../../tools';

const Colors = getDefaultThemeColors();

describe('Chip Component', () => {
  const baseProps = {
    onPress: jest.fn(),
    title: 'Chip title',
    selected: true,
    selectedColor: Colors.infoColor,
    readonly: false,
  };

  const setupChip = overrideProps =>
    setup({
      Component: Chip,
      baseProps,
      overrideProps,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(() => setupChip()).not.toThrow();
  });

  it('should render a touchable chip with label', () => {
    const {getByTestId, getByText, props} = setupChip({
      selectedColor: null,
      readonly: false,
    });

    expect(getByText(props.title)).toBeTruthy();
    expect(
      getByTestId('chipTouchable').props.accessibilityState?.disabled ?? false,
    ).toBe(false);

    const chipContainerStyles = getComputedStyles(
      getByTestId('chipContainer').props.style,
    );

    expect(chipContainerStyles).toMatchObject({
      backgroundColor: Colors.primaryColor.background_light,
      borderColor: Colors.primaryColor.background,
    });

    const labelStyles = getComputedStyles(getByText(props.title).props.style);
    expect(labelStyles).toMatchObject({
      color: Colors.primaryColor.foreground,
    });
  });

  it('should disable touchable when readonly', () => {
    const {getByTestId} = setupChip({readonly: true});

    expect(
      getByTestId('chipTouchable').props.accessibilityState?.disabled,
    ).toBe(true);
  });

  it('should invoke onPress when pressed', () => {
    const {getByTestId, props} = setupChip({onPress: jest.fn()});

    fireEvent.press(getByTestId('chipTouchable'));

    expect(props.onPress).toHaveBeenCalledTimes(1);
  });

  it('should use custom selected color', () => {
    const {getByTestId, getByText, props} = setupChip();
    const chipContainerStyles = getComputedStyles(
      getByTestId('chipContainer').props.style,
    );

    expect(chipContainerStyles).toMatchObject({
      backgroundColor: props.selectedColor.background_light,
      borderColor: props.selectedColor.background,
    });

    const labelStyles = getComputedStyles(getByText(props.title).props.style);
    expect(labelStyles).toMatchObject({
      color: props.selectedColor.foreground,
    });
  });

  it('should use default colors when not selected', () => {
    const {getByTestId, getByText, props} = setupChip({
      selected: false,
      selectedColor: null,
    });

    const chipContainerStyles = getComputedStyles(
      getByTestId('chipContainer').props.style,
    );

    expect(chipContainerStyles).toMatchObject({
      backgroundColor: Colors.backgroundColor,
      borderColor: Colors.primaryColor.background,
    });

    const labelStyles = getComputedStyles(getByText(props.title).props.style);
    expect(labelStyles).toMatchObject({
      color: Colors.text,
    });
  });

  it('should use provided color border when not selected', () => {
    const {getByTestId, getByText, props} = setupChip({selected: false});
    const chipContainerStyles = getComputedStyles(
      getByTestId('chipContainer').props.style,
    );

    expect(chipContainerStyles).toMatchObject({
      backgroundColor: Colors.backgroundColor,
      borderColor: props.selectedColor.background,
    });

    const labelStyles = getComputedStyles(getByText(props.title).props.style);
    expect(labelStyles).toMatchObject({
      color: Colors.text,
    });
  });
});
