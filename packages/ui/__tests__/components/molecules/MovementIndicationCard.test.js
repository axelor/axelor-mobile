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
import {Icon, MovementIndicationCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('MovementIndicationCard Component', () => {
  const baseProps = {
    titleTop: 'Top Title',
    iconTop: <Icon name="top-icon" />,
    onPressTitleTop: jest.fn(),
    disabledTop: false,
    titleDown: 'Down Title',
    iconDown: <Icon name="down-icon" />,
    onPressTitleDown: jest.fn(),
    disabledDown: false,
  };

  const setupCard = overrideProps =>
    setup({
      Component: MovementIndicationCard,
      baseProps,
      overrideProps,
    });

  it('renders both titles and icons', () => {
    const {getByText, queryAllByTestId} = setupCard();

    expect(getByText(baseProps.titleTop)).toBeTruthy();
    expect(getByText(baseProps.titleDown)).toBeTruthy();
    expect(queryAllByTestId('iconTouchable').length).toBe(2);
  });

  it('calls onPressTitleTop when the top title is pressed', () => {
    const {getByText, props} = setupCard({
      onPressTitleTop: jest.fn(),
    });

    fireEvent.press(getByText(baseProps.titleTop));

    expect(props.onPressTitleTop).toHaveBeenCalled();
  });

  it('calls onPressTitleDown when the bottom title is pressed', () => {
    const {getByText, props} = setupCard({
      onPressTitleDown: jest.fn(),
    });

    fireEvent.press(getByText(baseProps.titleDown));

    expect(props.onPressTitleDown).toHaveBeenCalled();
  });

  it('disables the top action when disabledTop is true', () => {
    const {getByText, props} = setupCard({
      disabledTop: true,
      onPressTitleTop: jest.fn(),
    });

    fireEvent.press(getByText(baseProps.titleTop));

    expect(props.onPressTitleTop).not.toHaveBeenCalled();
  });

  it('disables the bottom action when disabledDown is true', () => {
    const {getByText, props} = setupCard({
      disabledDown: true,
      onPressTitleDown: jest.fn(),
    });

    fireEvent.press(getByText(baseProps.titleDown));

    expect(props.onPressTitleDown).not.toHaveBeenCalled();
  });
});
