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
import {SwitchCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

jest.mock('../../../lib/components/atoms/Switch/Switch', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_switch" {...props} />;
});

describe('SwitchCard Component', () => {
  const setupSwitchCard = overrideProps =>
    setup({
      Component: SwitchCard,
      baseProps: {title: 'Test Switch', defaultValue: false},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupSwitchCard();

    expect(getByTestId('switchCardContainer')).toBeTruthy();
  });

  it('renders with the correct title', () => {
    const {getByText, props} = setupSwitchCard();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('passes the default value to the Switch component', () => {
    const {getByTestId, rerender, props} = setupSwitchCard();

    expect(getByTestId('mocked_switch').props.isEnabled).toBe(
      props.defaultValue,
    );

    rerender({defaultValue: !props.defaultValue});

    expect(getByTestId('mocked_switch').props.isEnabled).toBe(
      !props.defaultValue,
    );
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupSwitchCard({style: {width: 200}});

    expect(getByTestId('switchCardContainer')).toHaveStyle(props.style);
  });
});
