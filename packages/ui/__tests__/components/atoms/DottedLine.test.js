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

import {DottedLine} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('DottedLine Component', () => {
  const setupDottedLine = overrideProps =>
    setup({Component: DottedLine, overrideProps});

  it('renders without crashing', () => {
    const {getByTestId} = setupDottedLine();
    expect(getByTestId('dottedLine')).toBeTruthy();
  });

  it('applies custom style correctly', () => {
    const {getByTestId, props} = setupDottedLine({style: {marginBottom: 12}});
    expect(getByTestId('dottedLine')).toHaveStyle(props.style);
  });
});
