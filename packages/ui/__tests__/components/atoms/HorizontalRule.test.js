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

import {HorizontalRule} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('HorizontalRule Component', () => {
  const setupHorizontalRule = overrideProps =>
    setup({Component: HorizontalRule, overrideProps});

  it('renders without crashing', () => {
    const {getByTestId} = setupHorizontalRule();
    expect(getByTestId('horizontalRule')).toBeTruthy();
  });

  it('applies custom style correctly', () => {
    const {getByTestId, props} = setupHorizontalRule({style: {marginTop: 20}});

    expect(getByTestId('horizontalRule')).toHaveStyle(props.style);
  });
});
