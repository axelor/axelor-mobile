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

import {BootstrapIcon} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('BootstrapIcon Component', () => {
  const Colors = getDefaultThemeColors();

  const setupBootstrapIcon = overrideProps =>
    setup({
      Component: BootstrapIcon,
      baseProps: {
        name: '123',
        size: 25,
        color: Colors.primaryColor.background,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId, props} = setupBootstrapIcon();

    expect(getByTestId(`icon-${props.name}`)).toBeTruthy();
  });

  it('gives the correct props to Svg', () => {
    const {getByTestId, props} = setupBootstrapIcon();
    const icon = getByTestId(`icon-${props.name}`);

    expect(icon.props.width).toBe(props.size);
    expect(icon.props.height).toBe(props.size);
    expect(icon.props.fill).toBe(props.color);
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupBootstrapIcon({style: {width: 200}});

    expect(getByTestId(`icon-${props.name}`)).toHaveStyle(props.style);
  });

  it('renders fallback Text when icon does not exist', () => {
    const {getByText, queryByTestId, props} = setupBootstrapIcon({
      name: 'Fake icon',
    });

    expect(queryByTestId(`icon-${props.name}`)).toBeFalsy();
    expect(getByText('?')).toBeTruthy();
  });
});
