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

import {TitledValue} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('TitledValue Component', () => {
  const setupTitledValue = overrideProps =>
    setup({
      Component: TitledValue,
      baseProps: {title: 'Test Title', value: 'Test Value'},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupTitledValue();

    expect(getByTestId('titledValueContainer')).toBeTruthy();
  });

  it('renders the title and value', () => {
    const {getByText, props} = setupTitledValue();

    expect(getByText(props.title)).toBeTruthy();
    expect(getByText(props.value)).toBeTruthy();
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupTitledValue({style: {width: 200}});

    expect(getByTestId('titledValueContainer')).toHaveStyle(props.style);
  });
});
