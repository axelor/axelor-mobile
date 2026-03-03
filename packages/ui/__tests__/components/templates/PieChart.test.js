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

import {PieChart} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('PieChart Component', () => {
  const Colors = getDefaultThemeColors();

  const setupPieChart = overrideProps =>
    setup({
      Component: PieChart,
      baseProps: {
        datasets: [
          {
            label: 'Canceled',
            color: Colors.primaryColor,
            value: 0,
          },
          {
            label: 'Draft quotation',
            color: Colors.secondaryColor,
            value: 1,
          },
        ],
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupPieChart();

    expect(getByTestId('pieChartContainer')).toBeTruthy();
  });

  it('should use widthGraph props to calculate width of Card container', () => {
    const MARGIN = 5;
    const {getByTestId, props} = setupPieChart({widthGraph: 200});

    expect(getByTestId('pieChartContainer')).toHaveStyle({
      width: props.widthGraph - MARGIN * 2,
    });
  });

  it('should display a legend if props is true', () => {
    const {getByTestId, getByText, props} = setupPieChart({legend: true});

    expect(getByTestId('pieChartLegendContainer')).toBeTruthy();

    props.datasets.forEach(_i => {
      expect(getByText(`${_i.label} : ${_i.value}`)).toBeTruthy();
    });
  });

  it('should display title if provided', () => {
    const {getByText, props} = setupPieChart({title: 'Title'});

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupPieChart({styleContainer: {width: 200}});

    expect(getByTestId('pieChartContainer')).toHaveStyle(props.styleContainer);
  });
});
