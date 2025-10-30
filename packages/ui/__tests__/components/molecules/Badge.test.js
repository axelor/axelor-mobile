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
import {getDefaultThemeColors, setup} from '../../tools';

describe('Badge Component', () => {
  const Colors = getDefaultThemeColors();

  const setupBadge = overrideProps =>
    setup({Component: Badge, baseProps: {title: 'Badge Title'}, overrideProps});

  it('renders without crashing', () => {
    const {getByTestId} = setupBadge();

    expect(getByTestId('bagdeContainer')).toBeTruthy();
  });

  it('should render the correct title', () => {
    const {getByText, props} = setupBadge();

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const {getByTestId, getByText, props} = setupBadge({
      style: {backgroundColor: 'blue'},
      txtStyle: {color: 'white'},
    });

    expect(getByTestId('bagdeContainer')).toHaveStyle(props.style);
    expect(getByText(props.title)).toHaveStyle(props.txtStyle);
  });

  it('should apply default color if color prop is not provided', () => {
    const {getByTestId} = setupBadge();

    expect(getByTestId('bagdeContainer')).toHaveStyle({
      backgroundColor: Colors.primaryColor.background_light,
      borderColor: Colors.primaryColor.background,
    });
  });

  it('should apply custom color if color prop is provided', () => {
    const {getByTestId, getByText, props} = setupBadge({
      color: Colors.infoColor,
    });

    expect(getByTestId('bagdeContainer')).toHaveStyle({
      backgroundColor: props.color.background_light,
      borderColor: props.color.background,
    });
    expect(getByText(props.title)).toHaveStyle({
      color: props.color.foreground,
    });
  });

  it('should apply default number of lines if numberOfLines prop is not provided', () => {
    const {getByText, props} = setupBadge();

    expect(getByText(props.title).props.numberOfLines).toBe(1);
  });

  it('should apply custom number of lines if numberOfLines prop is provided', () => {
    const {getByText, props} = setupBadge({numberOfLines: 2});

    expect(getByText(props.title).props.numberOfLines).toBe(
      props.numberOfLines,
    );
  });
});
