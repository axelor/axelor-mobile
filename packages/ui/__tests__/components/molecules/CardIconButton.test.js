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
import {CardIconButton} from '@axelor/aos-mobile-ui';
import {getComputedStyles, getDefaultThemeColors, setup} from '../../tools';

describe('CardIconButton Component', () => {
  const Colors = getDefaultThemeColors();
  const baseProps = {
    iconName: 'heart',
    iconColor: 'red',
    onPress: jest.fn(),
  };

  const setupCardIconButton = overrideProps =>
    setup({
      Component: CardIconButton,
      baseProps,
      overrideProps,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(() => setupCardIconButton()).not.toThrow();
  });

  it('should render icon with provided name and color', () => {
    const {getByTestId, props} = setupCardIconButton();
    const icon = getByTestId(`icon-${props.iconName}`);

    expect(icon).toBeTruthy();
    expect(icon.props.fill).toBe(props.iconColor);
  });

  it('should render an enabled touchable wrapper by default', () => {
    const {getByTestId} = setupCardIconButton();

    const touchable = getByTestId('cardIconButtonTouchable');

    expect(touchable.props.disabled ?? false).toBe(false);
  });

  it('should invoke onPress handler when pressed', () => {
    const {getByTestId, props} = setupCardIconButton({
      onPress: jest.fn(),
    });

    fireEvent.press(getByTestId('cardIconButtonTouchable'));

    expect(props.onPress).toHaveBeenCalled();
  });

  it('should not invoke onPress when disabled', () => {
    const {getByTestId, props} = setupCardIconButton({
      onPress: jest.fn(),
      disabled: true,
    });

    fireEvent.press(getByTestId('cardIconButtonTouchable'));

    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('should call onLongPress when provided', () => {
    const {getByTestId, props} = setupCardIconButton({
      onLongPress: jest.fn(),
    });

    fireEvent(getByTestId('cardIconButtonTouchable'), 'longPress');

    expect(props.onLongPress).toHaveBeenCalled();
  });

  it('should update icon color when disabled', () => {
    const {getByTestId, props} = setupCardIconButton({disabled: true});
    const icon = getByTestId(`icon-${props.iconName}`);

    expect(icon.props.fill).toBe(Colors.secondaryColor.background);
  });

  it('should apply custom container style', () => {
    const customStyle = {margin: 16, opacity: 0.5};
    const {getByTestId} = setupCardIconButton({style: customStyle});

    const styles = getComputedStyles(
      getByTestId('cardIconButtonTouchable').props.style,
    );

    expect(styles).toMatchObject(customStyle);
  });
});
