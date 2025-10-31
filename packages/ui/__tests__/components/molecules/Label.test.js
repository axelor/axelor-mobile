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
import {Label} from '@axelor/aos-mobile-ui';
import {hexToRgb} from '../../../lib/utils/commons-utlis';
import {getDefaultThemeColors, setup} from '../../tools';

describe('Label Component', () => {
  const Colors = getDefaultThemeColors();

  const setupLabel = overrideProps =>
    setup({
      Component: Label,
      baseProps: {message: 'This is label message.', onClose: jest.fn()},
      overrideProps,
    });

  function checkColorStyle(elt, color) {
    expect(elt).toHaveStyle({
      backgroundColor: `rgba(${hexToRgb(color.background_light)}, 0.4)`,
      borderColor: color.background_light,
    });
  }

  it('renders the provided message', () => {
    const {getByTestId, props} = setupLabel();

    expect(getByTestId('labelContainer')).toBeTruthy();
  });

  it('applies default "error" styles when type is not provided', () => {
    const {getByTestId} = setupLabel();

    checkColorStyle(getByTestId('labelContainer'), Colors.errorColor);
    expect(getByTestId('icon-exclamation-triangle-fill')).toBeTruthy();
  });

  it('applies "success" styles when type is "success"', () => {
    const {getByTestId} = setupLabel({type: 'success'});

    checkColorStyle(getByTestId('labelContainer'), Colors.successColor);
    expect(getByTestId('icon-check-circle-fill')).toBeTruthy();
  });

  it('applies "info" styles when type is "info"', () => {
    const {getByTestId} = setupLabel({type: 'info'});

    checkColorStyle(getByTestId('labelContainer'), Colors.infoColor);
    expect(getByTestId('icon-info-circle-fill')).toBeTruthy();
  });

  it('applies "danger" styles when type is "danger"', () => {
    const {getByTestId} = setupLabel({type: 'danger'});

    checkColorStyle(getByTestId('labelContainer'), Colors.cautionColor);
    expect(getByTestId('icon-exclamation-circle-fill')).toBeTruthy();
  });

  it('renders a close icon only when showClose is true', () => {
    const {queryByTestId} = setupLabel();

    expect(queryByTestId('icon-x-lg')).toBeNull();
  });

  it('calls onClose and hides the label when the close icon is pressed', () => {
    const {getByTestId, props, queryByTestId} = setupLabel({
      showClose: true,
      onClose: jest.fn(),
    });
    expect(getByTestId('icon-x-lg')).toBeTruthy();

    fireEvent.press(getByTestId('icon-x-lg'));
    expect(props.onClose).toHaveBeenCalled();

    expect(queryByTestId('labelContainer')).toBeNull();
  });

  it('should apply custom styles', () => {
    const {getByTestId, props} = setupLabel({style: {backgroundColor: 'blue'}});

    expect(getByTestId('labelContainer')).toHaveStyle(props.style);
  });
});
