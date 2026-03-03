/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {Checkbox} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('Checkbox Component', () => {
  const Colors = getDefaultThemeColors();

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

  it('renders without crashing', () => {
    const {getByTestId} = setupCheckbox();

    expect(getByTestId('checkboxContainer')).toBeTruthy();
  });

  it('should render icon with provided props', () => {
    const {queryByTestId} = setupCheckbox();

    expect(queryByTestId('icon-square')).toBeTruthy();
    expect(queryByTestId('icon-dash-square-fill')).toBeFalsy();
    expect(queryByTestId('icon-check-square-fill')).toBeFalsy();
  });

  it('should not trigger onChange when disabled', () => {
    const {getByTestId, props} = setupCheckbox({
      disabled: true,
      onChange: jest.fn(),
    });

    fireEvent.press(getByTestId('iconTouchable'));
    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('should toggle icon when pressed', () => {
    const {queryByTestId, props} = setupCheckbox({onChange: jest.fn()});

    expect(queryByTestId('icon-square')).toBeTruthy();
    expect(queryByTestId('icon-dash-square-fill')).toBeFalsy();
    expect(queryByTestId('icon-check-square-fill')).toBeFalsy();

    fireEvent.press(queryByTestId('iconTouchable'));
    expect(props.onChange).toHaveBeenCalledWith(true);

    expect(queryByTestId('icon-square')).toBeFalsy();
    expect(queryByTestId('icon-dash-square-fill')).toBeFalsy();
    expect(queryByTestId('icon-check-square-fill')).toBeTruthy();
  });

  it('should render checked icon when default checked', () => {
    const {getByTestId} = setupCheckbox({isDefaultChecked: true});

    expect(getByTestId('icon-check-square-fill')).toBeTruthy();
  });

  it('should render partial icon when default partial checked', () => {
    const {getByTestId} = setupCheckbox({isDefaultPartialChecked: true});

    expect(getByTestId('icon-dash-square-fill')).toBeTruthy();
  });

  it('should render title text', () => {
    const {getByText, props} = setupCheckbox();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should adjust icon color when disabled', () => {
    const {getByTestId, rerender, props} = setupCheckbox();

    expect(getByTestId('icon-square').props.fill).toBe(props.iconColor);

    rerender({disabled: true});

    expect(getByTestId('icon-square').props.fill).toBe(
      Colors.secondaryColor.background,
    );
  });

  it('should apply custom styles', () => {
    const {getByTestId, getByText, props} = setupCheckbox({
      style: {backgroundColor: 'blue'},
      styleTxt: {color: 'white'},
    });

    expect(getByTestId('checkboxContainer')).toHaveStyle(props.style);
    expect(getByText(props.title)).toHaveStyle(props.styleTxt);
  });
});
