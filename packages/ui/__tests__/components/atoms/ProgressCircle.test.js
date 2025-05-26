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
import {render, screen} from '@testing-library/react-native';
import {ProgressCircle} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';
import {Circle} from 'react-native-svg';

describe('ProgressCircle Component', () => {
  const Colors = getDefaultThemeColors();

  it('renders without crashing', () => {
    const props = {
      activeStep: 1,
      numberOfSteps: 4,
      isError: false,
      translator: jest.fn(() => 'Step 1 of 4'),
    };

    const {toJSON} = render(<ProgressCircle {...props} />);
    expect(toJSON()).toBeTruthy();
  });

  it('uses error color when isError is true', () => {
    const baseProps = {
      activeStep: 1,
      numberOfSteps: 4,
      isError: true,
      translator: jest.fn(() => ''),
    };
    const {UNSAFE_getAllByType} = render(<ProgressCircle {...baseProps} />);
    const circles = UNSAFE_getAllByType(Circle);

    expect(circles[1].props.stroke).toBe(Colors.errorColor.background);
  });
});
