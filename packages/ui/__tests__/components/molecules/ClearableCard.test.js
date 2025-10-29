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
import {ClearableCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('ClearableCard Component', () => {
  const setupClearableCard = overrideProps =>
    setup({
      Component: ClearableCard,
      baseProps: {
        onClearPress: jest.fn(),
        valueTxt: 'test',
        clearable: true,
      },
      overrideProps,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(() => setupClearableCard()).not.toThrow();
  });

  it('renders clear icon when clearable is true', () => {
    const {getAllByTestId, getByText, props} = setupClearableCard();

    expect(getByText(props.valueTxt)).toBeTruthy();
    expect(getAllByTestId('iconTouchable')[0]).toBeTruthy();
    expect(getAllByTestId('icon-x-lg')[0]).toBeTruthy();
  });

  it('does not render clear icon when clearable is false', () => {
    const {queryAllByTestId, getByText, props} = setupClearableCard({
      clearable: false,
    });

    expect(getByText(props.valueTxt)).toBeTruthy();
    expect(queryAllByTestId('iconTouchable')).toHaveLength(0);
  });

  it('calls onClearPress when clear icon is pressed', () => {
    const {getAllByTestId, props} = setupClearableCard({
      onClearPress: jest.fn(),
    });

    fireEvent.press(getAllByTestId('iconTouchable')[0]);

    expect(props.onClearPress).toHaveBeenCalledTimes(1);
  });
});
