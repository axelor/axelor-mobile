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

import {BarChart} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('BarChart Component', () => {
  const Colors = getDefaultThemeColors();

  const setupBarChart = overrideProps =>
    setup({
      Component: BarChart,
      baseProps: {
        datasets: [
          [
            {
              label: 'T0001 - APOLLO',
              color: Colors.primaryColor,
              value: 1,
            },
            {
              label: 'T0002 - MICHEL Loic',
              color: Colors.secondaryColor,
              value: 2,
            },
          ],
          [
            {
              label: 'T0001 - APOLLO',
              color: Colors.warningColor,
              value: 3,
            },
            {
              label: 'T0002 - MICHEL Loic',
              color: Colors.errorColor,
              value: 5,
            },
          ],
        ],
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupBarChart();

    expect(getByTestId('cardContainer')).toBeTruthy();
  });

  it('should use widthGraph props to calculate width of Card container', () => {
    const MARGIN = 5;
    const {getByTestId, props} = setupBarChart({widthGraph: 200});

    expect(getByTestId('cardContainer')).toHaveStyle({
      width: props.widthGraph - MARGIN * 2,
    });
  });

  it('should display title if provided', () => {
    const {getByText, props} = setupBarChart({title: 'Title'});

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupBarChart({style: {width: 200}});

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });
});
