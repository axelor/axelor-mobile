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
import {fireEvent, render} from '@testing-library/react-native';
import {RadioButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

describe('RadioButton Component', () => {
  const Colors = getDefaultThemeColors();
  const onPressMock = jest.fn();

  const baseProps = {
    title: 'Option 1',
    onPress: jest.fn(),
    selected: false,
  };

  const setup = (override = {}) => {
    const props = {...baseProps, ...override};
    const utils = render(<RadioButton {...props} />);
    return {...utils, props};
  };

  it('renders without crashing', () => {
    const {getByText} = setup();
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('renders the correct title', () => {
    const {getByText} = setup({title: 'CustomTitle'});
    expect(getByText('CustomTitle')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const {getByRole} = setup({onPress});

    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('applies selected styles when `selected` is true', () => {
    const {getByTestId} = setup({selected: true});
    expect(getByTestId('radio').props.style).toMatchObject({
      backgroundColor: Colors.primaryColor.background,
    });
  });
});
