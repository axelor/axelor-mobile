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

import {TextUnit} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('TextUnit Component', () => {
  const Colors = getDefaultThemeColors();

  const setupTextUnit = overrideProps =>
    setup({
      Component: TextUnit,
      baseProps: {value: '400', unit: 'm'},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByText, props} = setupTextUnit();

    expect(getByText(`${props.value} ${props.unit}`)).toBeTruthy();
  });

  it('renders title if provided', () => {
    const {getByText, props} = setupTextUnit({title: 'Hello'});

    expect(
      getByText(`${props.title} : ${props.value} ${props.unit}`),
    ).toBeTruthy();
  });

  it('should use color and fontSize props for Text component when provided', () => {
    const {getByText, props} = setupTextUnit({
      color: Colors.primaryColor,
      fontSize: 30,
    });

    expect(getByText(`${props.value} ${props.unit}`)).toHaveStyle({
      color: props.color.background,
      fontSize: props.fontSize,
    });
  });

  it('should apply custom style when provided', () => {
    const {getByText, props} = setupTextUnit({style: {width: 200}});

    expect(getByText(`${props.value} ${props.unit}`)).toHaveStyle(props.style);
  });
});
