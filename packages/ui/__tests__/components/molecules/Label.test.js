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
import {Label} from '@axelor/aos-mobile-ui';
import {hexToRgb} from '../../../lib/utils/commons-utlis';
import {setup, getComputedStyles, getDefaultThemeColors} from '../../tools';

describe('Label Component', () => {
  const Colors = getDefaultThemeColors();
  const baseProps = {
    message: 'This is label message.',
    onClose: jest.fn(),
  };

  const setupLabel = overrideProps =>
    setup({
      Component: Label,
      baseProps,
      overrideProps,
    });

  it('renders the provided message', () => {
    const {getByText} = setupLabel();

    expect(getByText(baseProps.message)).toBeTruthy();
  });

  it('applies default "error" styles when type is not provided', () => {
    const {getByTestId} = setupLabel();
    const styles = getComputedStyles(
      getByTestId('labelContainer').props?.style,
    );

    expect(styles).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(Colors.errorColor.background_light)}, 0.4)`,
      borderColor: Colors.errorColor.background_light,
    });
  });

  it('applies "success" styles when type is "success"', () => {
    const {getByTestId} = setupLabel({type: 'success'});
    const styles = getComputedStyles(
      getByTestId('labelContainer').props?.style,
    );

    expect(styles).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(
        Colors.successColor.background_light,
      )}, 0.4)`,
      borderColor: Colors.successColor.background_light,
    });
  });

  it('applies "info" styles when type is "info"', () => {
    const {getByTestId} = setupLabel({type: 'info'});
    const styles = getComputedStyles(
      getByTestId('labelContainer').props?.style,
    );

    expect(styles).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(Colors.infoColor.background_light)}, 0.4)`,
      borderColor: Colors.infoColor.background_light,
    });
  });

  it('applies "danger" styles when type is "danger"', () => {
    const {getByTestId} = setupLabel({type: 'danger'});
    const styles = getComputedStyles(
      getByTestId('labelContainer').props?.style,
    );

    expect(styles).toMatchObject({
      backgroundColor: `rgba(${hexToRgb(
        Colors.cautionColor.background_light,
      )}, 0.4)`,
      borderColor: Colors.cautionColor.background_light,
    });
  });

  it('renders the corresponding icon for each type', () => {
    const {getByTestId} = setupLabel();

    expect(getByTestId('icon-exclamation-triangle-fill')).toBeTruthy();
  });

  it('renders a close icon only when showClose is true', () => {
    const {queryByTestId} = setupLabel();
    const {getByTestId} = setupLabel({showClose: true});

    expect(queryByTestId('icon-x-lg')).toBeNull();
    expect(getByTestId('icon-x-lg')).toBeTruthy();
  });

  it('calls onClose and hides the label when the close icon is pressed', () => {
    const {getByTestId, props, queryByTestId} = setupLabel({
      showClose: true,
      onClose: jest.fn(),
    });

    fireEvent.press(getByTestId('icon-x-lg'));

    expect(props.onClose).toHaveBeenCalled();
    expect(queryByTestId('labelContainer')).toBeNull();
  });
});
