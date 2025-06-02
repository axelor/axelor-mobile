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
import {render} from '@testing-library/react-native';
import {ProgressCircle} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

const TEST_ID = {
  INTERNAL_CIRCLE: 'internal-circle',
  PROGRESS_CIRCLE: 'progress-circle',
};

describe('ProgressCircle Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {activeStep: 1, numberOfSteps: 4, translator: () => ''};

  it('renders correctly without crashing', () => {
    const {getByTestId} = render(<ProgressCircle {...props} />);

    expect(getByTestId(TEST_ID.INTERNAL_CIRCLE)).toBeTruthy();
    expect(getByTestId(TEST_ID.PROGRESS_CIRCLE)).toBeTruthy();
  });

  it('uses success stroke color when isError is false', () => {
    const {getByTestId} = render(<ProgressCircle {...props} />);

    const circle = getByTestId(TEST_ID.PROGRESS_CIRCLE);
    expect(circle.props.stroke).toBe(Colors.successColor.background);
  });

  it('uses error stroke color when isError is true', () => {
    const {getByTestId} = render(<ProgressCircle {...props} isError />);

    const circle = getByTestId(TEST_ID.PROGRESS_CIRCLE);

    expect(circle.props.stroke).toBe(Colors.errorColor.background);
  });

  it('calculates correct strokeDashoffset based on progress', () => {
    const computedProps = {...props, circleSize: 100, strokeWidth: 10};
    const {circleSize, strokeWidth, activeStep, numberOfSteps} = computedProps;

    const progress = activeStep / numberOfSteps;
    const radius = circleSize / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const expectedOffset = circumference - circumference * progress;

    const {getByTestId} = render(<ProgressCircle {...computedProps} />);

    const circle = getByTestId(TEST_ID.PROGRESS_CIRCLE);
    expect(circle.props.strokeDashoffset).toBeCloseTo(expectedOffset, 5);
  });

  it('displays correct step text', () => {
    const mockTranslator = jest.fn(
      (_, {activeStep, numberOfSteps}) =>
        `Step ${activeStep} of ${numberOfSteps}`,
    );

    const {getByText} = render(
      <ProgressCircle {...props} translator={mockTranslator} />,
    );

    expect(getByText(mockTranslator(undefined, props))).toBeTruthy();
  });
});
