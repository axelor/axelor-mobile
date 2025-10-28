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

import {Badge} from '@axelor/aos-mobile-ui';
import {getComputedStyles, getDefaultThemeColors, setup} from '../../tools';

describe('Badge Component', () => {
  const Colors = getDefaultThemeColors();
  const setupBadge = overrideProps =>
    setup({
      Component: Badge,
      baseProps: {
        title: 'Badge Title',
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    expect(() => setupBadge()).not.toThrow();
  });

  it('should render the correct title', () => {
    const {getByText, props} = setupBadge();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = {backgroundColor: 'blue'};
    const customTxtStyle = {color: 'white'};
    const {getByTestId} = setupBadge({
      style: customStyle,
      txtStyle: customTxtStyle,
    });
    const containerStyles = getComputedStyles(
      getByTestId('badgeContainer').props.style,
    );
    const textStyles = getComputedStyles(getByTestId('badgeTitle').props.style);

    expect(containerStyles).toMatchObject(customStyle);
    expect(textStyles).toMatchObject(customTxtStyle);
  });

  it('should apply default color if color prop is not provided', () => {
    const {getByTestId} = setupBadge();
    const containerStyles = getComputedStyles(
      getByTestId('badgeContainer').props.style,
    );

    expect(containerStyles).toMatchObject({
      backgroundColor: Colors.primaryColor.background_light,
      borderColor: Colors.primaryColor.background,
    });
  });

  it('should apply custom color if color prop is provided', () => {
    const color = Colors.infoColor;
    const {getByTestId} = setupBadge({color});
    const containerStyles = getComputedStyles(
      getByTestId('badgeContainer').props.style,
    );

    expect(containerStyles).toMatchObject({
      backgroundColor: color.background_light,
      borderColor: color.background,
    });
  });

  it('should apply default number of lines if numberOfLines prop is not provided', () => {
    const {getByText, props} = setupBadge();

    expect(getByText(props.title).props.numberOfLines).toBe(1);
  });

  it('should apply custom number of lines if numberOfLines prop is provided', () => {
    const customNumberOfLines = 2;
    const {getByText, props} = setupBadge({
      numberOfLines: customNumberOfLines,
    });

    expect(getByText(props.title).props.numberOfLines).toBe(
      customNumberOfLines,
    );
  });
});
