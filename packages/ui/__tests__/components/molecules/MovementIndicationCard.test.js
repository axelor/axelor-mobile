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
import {View} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import {MovementIndicationCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('MovementIndicationCard Component', () => {
  const setupMovementIndicationCard = overrideProps =>
    setup({
      Component: MovementIndicationCard,
      baseProps: {
        titleTop: 'Top Title',
        iconTop: <View testID="top-icon" />,
        onPressTitleTop: jest.fn(),
        disabledTop: false,
        titleDown: 'Down Title',
        iconDown: <View testID="down-icon" />,
        onPressTitleDown: jest.fn(),
        disabledDown: false,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupMovementIndicationCard();

    expect(getByTestId('movementIndicationCardContainer')).toBeTruthy();
  });

  it('renders both titles and icons', () => {
    const {getByText, getByTestId, props} = setupMovementIndicationCard();

    expect(getByText(props.titleTop)).toBeTruthy();
    expect(getByText(props.titleDown)).toBeTruthy();

    expect(getByTestId('top-icon')).toBeTruthy();
    expect(getByTestId('down-icon')).toBeTruthy();
  });

  it('calls onPressTitleTop when the top title is pressed', () => {
    const {getAllByTestId, props} = setupMovementIndicationCard({
      onPressTitleTop: jest.fn(),
    });

    fireEvent.press(getAllByTestId('movementIndicationCardTouchable').at(0));

    expect(props.onPressTitleTop).toHaveBeenCalled();
  });

  it('disables the top action when disabledTop is true', () => {
    const {getAllByTestId, props} = setupMovementIndicationCard({
      disabledTop: true,
      onPressTitleTop: jest.fn(),
    });

    fireEvent.press(getAllByTestId('movementIndicationCardTouchable').at(0));

    expect(props.onPressTitleTop).not.toHaveBeenCalled();
  });

  it('calls onPressTitleDown when the bottom title is pressed', () => {
    const {getAllByTestId, props} = setupMovementIndicationCard({
      onPressTitleDown: jest.fn(),
    });

    fireEvent.press(getAllByTestId('movementIndicationCardTouchable').at(1));

    expect(props.onPressTitleDown).toHaveBeenCalled();
  });

  it('disables the bottom action when disabledDown is true', () => {
    const {getAllByTestId, props} = setupMovementIndicationCard({
      disabledDown: true,
      onPressTitleDown: jest.fn(),
    });

    fireEvent.press(getAllByTestId('movementIndicationCardTouchable').at(1));

    expect(props.onPressTitleDown).not.toHaveBeenCalled();
  });

  it('applies custom style correctly', () => {
    const {getByTestId, props} = setupMovementIndicationCard({
      style: {marginBottom: 10},
    });

    expect(getByTestId('movementIndicationCardContainer')).toHaveStyle(
      props.style,
    );
  });
});
