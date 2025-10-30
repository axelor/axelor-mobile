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
import {getDefaultThemeColors, setup} from '../../tools';

describe('Chip Component', () => {
  const Colors = getDefaultThemeColors();

  const setupChip = overrideProps =>
    setup({
      Component: Chip,
      baseProps: {
        onPress: jest.fn(),
        title: 'Chip title',
        selected: true,
        selectedColor: Colors.infoColor,
        readonly: false,
      },
      overrideProps,
    });

  function checkChipStyle(viewElt, textElt, color) {
    expect(viewElt).toHaveStyle({
      borderColor: color.background,
      backgroundColor: color.background_light,
    });

    expect(textElt).toHaveStyle({color: color.foreground});
  }

  it('renders without crashing', () => {
    const {getByTestId} = setupChip();

    expect(getByTestId('chipTouchable')).toBeTruthy();
  });

  it('should render a touchable chip with label', () => {
    const {getByTestId, getByText, props} = setupChip({selectedColor: null});

    const _viewElt = getByTestId('chipContainer');
    const _textElt = getByText(props.title);

    expect(_viewElt).toBeTruthy();
    expect(_textElt).toBeTruthy();

    checkChipStyle(_viewElt, _textElt, Colors.primaryColor);
  });

  it('should disable touchable when readonly', () => {
    const {getByTestId, props} = setupChip({
      readonly: true,
      onPress: jest.fn(),
    });

    fireEvent.press(getByTestId('chipTouchable'));
    expect(props.onPress).not.toHaveBeenCalledTimes(1);
  });

  it('should invoke onPress when pressed', () => {
    const {getByTestId, props} = setupChip({onPress: jest.fn()});

    fireEvent.press(getByTestId('chipTouchable'));
    expect(props.onPress).toHaveBeenCalledTimes(1);
  });

  it('should use custom selected color', () => {
    const {getByTestId, getByText, props} = setupChip();

    const _viewElt = getByTestId('chipContainer');
    const _textElt = getByText(props.title);

    expect(_viewElt).toBeTruthy();
    expect(_textElt).toBeTruthy();

    checkChipStyle(_viewElt, _textElt, props.selectedColor);
  });

  it('should use default colors when not selected', () => {
    const {getByTestId, getByText, props} = setupChip({
      selected: false,
      selectedColor: null,
    });

    const _viewElt = getByTestId('chipContainer');
    const _textElt = getByText(props.title);

    expect(_viewElt).toBeTruthy();
    expect(_textElt).toBeTruthy();

    checkChipStyle(_viewElt, _textElt, {
      foreground: Colors.text,
      background_light: Colors.backgroundColor,
      background: Colors.primaryColor.background,
    });
  });

  it('should use provided color border when not selected', () => {
    const {getByTestId, getByText, props} = setupChip({selected: false});

    const _viewElt = getByTestId('chipContainer');
    const _textElt = getByText(props.title);

    expect(_viewElt).toBeTruthy();
    expect(_textElt).toBeTruthy();

    checkChipStyle(_viewElt, _textElt, {
      foreground: Colors.text,
      background_light: Colors.backgroundColor,
      background: props.selectedColor.background,
    });
  });

  it('should apply custom marginHorizontal when provided', () => {
    const {getByTestId, props} = setupChip({marginHorizontal: 15});

    expect(getByTestId('chipTouchable')).toHaveStyle({
      marginHorizontal: props.marginHorizontal,
    });
  });

  it('should apply custom width when provided', () => {
    const {getByTestId, props} = setupChip({width: 200});

    expect(getByTestId('chipTouchable')).toHaveStyle({width: props.width});
  });

  it('should apply custom styles', () => {
    const {getByTestId, props} = setupChip({
      style: {backgroundColor: 'blue'},
    });

    expect(getByTestId('chipTouchable')).toHaveStyle(props.style);
  });
});
