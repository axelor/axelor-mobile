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

import {DistributionBar} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('DistributionBar Component', () => {
  const Colors = getDefaultThemeColors();

  const setupDistributionBar = overrideProps =>
    setup({
      Component: DistributionBar,
      baseProps: {
        distribution: [
          {value: 3, color: Colors.errorColor},
          {value: 1, color: Colors.cautionColor},
          {value: 5, color: Colors.successColor},
        ],
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupDistributionBar();

    expect(getByTestId('distributionBarContainer')).toBeTruthy();
  });

  it('renders each group with the right style', () => {
    const {getAllByTestId, getByTestId, props} = setupDistributionBar({
      height: 40,
      total: 100,
    });

    expect(getAllByTestId(/^distributionBarGroup-idx.*/)).toHaveLength(
      props.distribution.length,
    );

    props.distribution.forEach((_group, idx) => {
      expect(getByTestId(`distributionBarGroup-idx${idx}`)).toHaveStyle({
        width: `${(_group.value / props.total) * 100}%`,
        height: props.height - 2,
        backgroundColor: _group.color.background,
      });
    });
  });

  it('renders with default height when not provided', () => {
    const {getByTestId} = setupDistributionBar();

    expect(getByTestId('distributionBarContainer')).toHaveStyle({height: 30});
  });

  it('handles empty distribution array correctly', () => {
    const {queryAllByTestId} = setupDistributionBar({distribution: []});

    expect(queryAllByTestId(/^distributionBarGroup-idx.*/)).toHaveLength(0);
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupDistributionBar({style: {width: 200}});

    expect(getByTestId('distributionBarContainer')).toHaveStyle(props.style);
  });
});
