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

import {ProgressCircle} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('ProgressCircle Component', () => {
  const Colors = getDefaultThemeColors();

  const setupProgressCircle = overrideProps =>
    setup({
      Component: ProgressCircle,
      baseProps: {progress: 0.25},
      overrideProps,
    });

  it('renders correctly without crashing', () => {
    const {getByTestId} = setupProgressCircle();

    expect(getByTestId('internalCircle')).toBeTruthy();
    expect(getByTestId('progressCircle')).toBeTruthy();
  });

  it('uses success stroke color when isError is false', () => {
    const {getByTestId} = setupProgressCircle();

    const circle = getByTestId('progressCircle');
    expect(circle.props.stroke).toBe(Colors.successColor.background);
  });

  it('uses error stroke color when isError is true', () => {
    const {getByTestId} = setupProgressCircle({isError: true});

    const circle = getByTestId('progressCircle');

    expect(circle.props.stroke).toBe(Colors.errorColor.background);
  });

  it('calculates correct strokeDashoffset based on progress', () => {
    const {getByTestId, props} = setupProgressCircle({
      circleSize: 100,
      strokeWidth: 10,
    });
    const {circleSize, strokeWidth, progress} = props;

    const radius = circleSize / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const expectedOffset = circumference - circumference * progress;

    const circle = getByTestId('progressCircle');
    expect(circle.props.strokeDashoffset).toBeCloseTo(expectedOffset, 5);
  });

  it('displays correct step text', () => {
    const {getByText, props} = setupProgressCircle({innerText: 'Test'});

    expect(getByText(props.innerText)).toBeTruthy();
  });
});
