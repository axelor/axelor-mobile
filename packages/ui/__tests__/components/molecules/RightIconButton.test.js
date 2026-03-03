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

import React from 'react';
import {View} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import {RightIconButton} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('RightIconButton Component', () => {
  const setupRightIconButton = overrideProps =>
    setup({
      Component: RightIconButton,
      baseProps: {
        onPress: jest.fn(),
        title: 'Click Me',
        icon: <View testID="mocked_icon" />,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupRightIconButton();

    expect(getByTestId('rightIconButtonContainer')).toBeTruthy();
  });

  it('displays the title when provided', () => {
    const {getByText, props} = setupRightIconButton();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('displays the icon', () => {
    const {getByTestId} = setupRightIconButton();

    expect(getByTestId('mocked_icon')).toBeTruthy();
  });

  it('touchable is not disabled', () => {
    const {getByTestId, props} = setupRightIconButton({onPress: jest.fn()});

    fireEvent.press(getByTestId('rightIconButtonContainer'));
    expect(props.onPress).toHaveBeenCalled();
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupRightIconButton({style: {width: 200}});

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });
});
