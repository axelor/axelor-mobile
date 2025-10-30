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
import {getDefaultThemeColors, setup} from '../../tools';

describe('CardIconButton Component', () => {
  const Colors = getDefaultThemeColors();

  const setupCardIconButton = overrideProps =>
    setup({
      Component: CardIconButton,
      baseProps: {iconName: 'heart', iconColor: 'red', onPress: jest.fn()},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupCardIconButton();

    expect(getByTestId('cardIconButtonContainer')).toBeTruthy();
  });

  it('should render icon with provided name and color', () => {
    const {getByTestId, props} = setupCardIconButton();
    const icon = getByTestId(`icon-${props.iconName}`);

    expect(icon).toBeTruthy();
    expect(icon.props.fill).toBe(props.iconColor);
  });

  it('should invoke onPress handler when pressed', () => {
    const {getByTestId, props} = setupCardIconButton({onPress: jest.fn()});

    fireEvent.press(getByTestId('cardIconButtonContainer'));
    expect(props.onPress).toHaveBeenCalled();
  });

  it('should not invoke onPress when disabled', () => {
    const {getByTestId, props} = setupCardIconButton({
      onPress: jest.fn(),
      disabled: true,
    });

    fireEvent.press(getByTestId('cardIconButtonContainer'));
    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('should call onLongPress when provided', () => {
    const {getByTestId, props} = setupCardIconButton({onLongPress: jest.fn()});

    fireEvent(getByTestId('cardIconButtonContainer'), 'longPress');
    expect(props.onLongPress).toHaveBeenCalled();
  });

  it('should not invoke onLongPress when disabled', () => {
    const {getByTestId, props} = setupCardIconButton({
      onLongPress: jest.fn(),
      disabled: true,
    });

    fireEvent(getByTestId('cardIconButtonContainer'), 'longPress');
    expect(props.onLongPress).not.toHaveBeenCalled();
  });

  it('should update icon color when disabled', () => {
    const {getByTestId, props} = setupCardIconButton({disabled: true});

    expect(getByTestId(`icon-${props.iconName}`).props.fill).toBe(
      Colors.secondaryColor.background,
    );
  });

  it('should apply custom container style', () => {
    const {getByTestId, props} = setupCardIconButton({
      style: {margin: 16, opacity: 0.5},
    });

    expect(getByTestId('cardIconButtonContainer')).toHaveStyle(props.style);
  });
});
