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
import {CardIndicator} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('CardIndicator Component', () => {
  const setupCardIndicator = overrideProps =>
    setup({
      Component: CardIndicator,
      baseProps: {
        indication: 'heart',
        children: <View testID="indicatorChild" />,
        isVisible: true,
        handleClose: jest.fn(),
        usePopup: false,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupCardIndicator();

    expect(getByTestId('cardIndicatorContainer')).toBeTruthy();
  });

  it('should render card indicator when visible and usePopup is false', () => {
    const {queryByTestId, queryByText, rerender, props} = setupCardIndicator();

    expect(queryByTestId('indicatorChild')).toBeTruthy();

    expect(queryByTestId('cardContainer')).toBeTruthy();
    expect(queryByText(props.indication)).toBeTruthy();

    expect(queryByTestId('alertModal')).toBeFalsy();

    rerender({isVisible: false});

    expect(queryByTestId('indicatorChild')).toBeTruthy();

    expect(queryByText(props.indication)).toBeFalsy();
    expect(queryByTestId('cardContainer')).toBeFalsy();

    expect(queryByTestId('alertModal')).toBeFalsy();
  });

  it('should render alert indicator when usePopup is true', () => {
    const {queryByTestId, queryByText, rerender, props} = setupCardIndicator({
      usePopup: true,
    });

    expect(queryByTestId('indicatorChild')).toBeTruthy();

    expect(queryByTestId('alertModal')).toBeTruthy();
    expect(queryByText(props.indication)).toBeTruthy();

    rerender({isVisible: false});

    expect(queryByTestId('indicatorChild')).toBeTruthy();

    expect(queryByTestId('alertModal')).toBeFalsy();
    expect(queryByText(props.indication)).toBeFalsy();
  });

  it('should apply custom container style', () => {
    const {getByTestId, props} = setupCardIndicator({
      style: {margin: 16, opacity: 0.5},
    });

    expect(getByTestId('cardIndicatorContainer')).toHaveStyle(props.style);
  });
});
