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
import {BootstrapIcon} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

describe('BootstrapIcon Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    name: '123',
    size: 25,
    color: Colors.primaryColor.background,
  };

  it('renders without crashing', () => {
    const {getByTestId} = render(<BootstrapIcon {...props} />);
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('gives the correct props to Svg', () => {
    const {getByTestId} = render(<BootstrapIcon {...props} />);
    const icon = getByTestId('icon');

    expect(icon.props.width).toBe(props.size);
    expect(icon.props.height).toBe(props.size);
    expect(icon.props.fill).toBe(props.color);
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const {getByTestId} = render(
      <BootstrapIcon {...props} style={customStyle} />,
    );
    expect(getByTestId('icon').props.style).toMatchObject(customStyle);
  });

  it('renders fallback Text when icon does not exist', () => {
    const {getByText} = render(<BootstrapIcon {...props} name="Fake icon" />);
    expect(getByText('?')).toBeTruthy();
  });
});
