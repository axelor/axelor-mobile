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

import {BorderBar} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('BorderBar Component', () => {
  const setupBorderBar = overrideProps =>
    setup({Component: BorderBar, overrideProps});

  it('renders without crashing', () => {
    const {getByTestId} = setupBorderBar();
    expect(getByTestId('borderBar')).toBeTruthy();
  });

  it('applies the given color as background color', () => {
    const {getByTestId, props} = setupBorderBar({color: '#FF0000'});

    expect(getByTestId('borderBar')).toHaveStyle({
      backgroundColor: props.color,
    });
  });

  it('applies custom style correctly', () => {
    const {getByTestId, props} = setupBorderBar({style: {marginRight: 13}});

    expect(getByTestId('borderBar')).toHaveStyle(props.style);
  });

  it('uses a custom testID when provided', () => {
    const {getByTestId} = setupBorderBar({testID: 'customBorderBar'});

    expect(getByTestId('customBorderBar')).toBeTruthy();
  });
});
