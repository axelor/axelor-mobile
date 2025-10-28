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

  it('should render without crashing', () => {
    expect(() => setupCardIndicator()).not.toThrow();
  });

  it('should render card indicator when visible and usePopup is false', () => {
    const {
      getByTestId,
      getByText,
      queryByTestId,
      queryByText,
      rerender,
      props,
    } = setupCardIndicator();

    expect(getByTestId('indicatorChild')).toBeTruthy();
    expect(getByText(props.indication)).toBeTruthy();
    expect(getByTestId('cardIndicatorCard')).toBeTruthy();

    rerender(<CardIndicator {...props} isVisible={false} />);

    expect(queryByText(props.indication)).toBeNull();
    expect(queryByTestId('cardIndicatorCard')).toBeNull();
  });

  it('should render alert indicator when usePopup is true', () => {
    const {getByText, queryByTestId, queryByText, rerender, props} =
      setupCardIndicator({usePopup: true});

    expect(getByText(props.indication)).toBeTruthy();
    expect(queryByTestId('cardIndicatorCard')).toBeNull();

    rerender(<CardIndicator {...props} isVisible={false} />);

    expect(queryByText(props.indication)).toBeNull();
    expect(queryByTestId('cardIndicatorCard')).toBeNull();
  });
});
