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
import {Checkbox} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

const Colors = getDefaultThemeColors();

const getIconTouchable = getAllByTestId =>
  getAllByTestId('iconTouchable')[0] ?? null;

const getIconProps = iconTouchable => {
  const child = Array.isArray(iconTouchable?.props?.children)
    ? iconTouchable.props.children[0]
    : iconTouchable?.props?.children;

  return child?.props;
};

describe('Checkbox Component', () => {
  const setupCheckbox = overrideProps =>
    setup({
      Component: Checkbox,
      baseProps: {
        title: 'Checkbox Label',
        onChange: jest.fn(),
        isDefaultChecked: false,
        disabled: false,
        iconColor: Colors.infoColor.background,
        iconSize: 20,
      },
      overrideProps,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(() => setupCheckbox()).not.toThrow();
  });

  it('should render icon with provided props', () => {
    const {getAllByTestId, props} = setupCheckbox();
    const iconTouchable = getIconTouchable(getAllByTestId);
    const iconProps = getIconProps(iconTouchable);

    expect(iconTouchable).toBeTruthy();
    expect(iconProps?.color).toBe(props.iconColor);
    expect(iconProps?.size).toBe(props.iconSize);
    expect(iconTouchable?.props?.disabled ?? false).toBe(props.disabled);
  });

  it('should not trigger onChange when disabled', () => {
    const {getAllByTestId, props} = setupCheckbox({
      disabled: true,
      onChange: jest.fn(),
    });
    const iconTouchable = getIconTouchable(getAllByTestId);

    if (iconTouchable) {
      fireEvent.press(iconTouchable);
    }

    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('should toggle icon when pressed', () => {
    const {getAllByTestId, props} = setupCheckbox({
      onChange: jest.fn(),
    });

    const iconTouchable = getIconTouchable(getAllByTestId);
    expect(getIconProps(iconTouchable)?.name).toBe('square');

    if (iconTouchable) {
      fireEvent.press(iconTouchable);
    }

    const toggledIconProps = getIconProps(getIconTouchable(getAllByTestId));
    expect(toggledIconProps?.name).toBe('check-square-fill');
    expect(props.onChange).toHaveBeenCalledWith(true);
  });

  it('should render checked icon when default checked', () => {
    const {getAllByTestId} = setupCheckbox({isDefaultChecked: true});
    const iconProps = getIconProps(getIconTouchable(getAllByTestId));

    expect(iconProps?.name).toBe('check-square-fill');
  });

  it('should render partial icon when default partial checked', () => {
    const {getAllByTestId} = setupCheckbox({
      isDefaultPartialChecked: true,
    });
    const iconProps = getIconProps(getIconTouchable(getAllByTestId));

    expect(iconProps?.name).toBe('dash-square-fill');
  });

  it('should render title text', () => {
    const {getByText, props} = setupCheckbox();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should adjust icon color when disabled', () => {
    const {getAllByTestId, rerender, props} = setupCheckbox();
    const initialIconProps = getIconProps(getIconTouchable(getAllByTestId));

    expect(initialIconProps?.color).toBe(props.iconColor);

    rerender(<Checkbox {...props} disabled />);

    const disabledIconProps = getIconProps(getIconTouchable(getAllByTestId));
    expect(disabledIconProps?.color).toBe(Colors.secondaryColor.background);
  });
});
