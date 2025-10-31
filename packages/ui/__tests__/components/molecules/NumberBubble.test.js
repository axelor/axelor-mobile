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

import {NumberBubble} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('NumberBubble Component', () => {
  const Colors = getDefaultThemeColors();

  const setupNumberBubble = overrideProps =>
    setup({
      Component: NumberBubble,
      baseProps: {
        number: 4,
        color: Colors.infoColor,
        isNeutralBackground: true,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupNumberBubble();

    expect(getByTestId('numberBubbleContainer')).toBeTruthy();
  });

  it('renders the provided number', () => {
    const {getByText, props} = setupNumberBubble();

    expect(getByText(props.number.toString())).toBeTruthy();
  });

  it('applies neutral background styles when isNeutralBackground is true', () => {
    const {getByText, getByTestId, props} = setupNumberBubble();

    expect(getByTestId('numberBubbleContainer')).toHaveStyle({
      backgroundColor: Colors.backgroundColor,
      borderColor: props.color.background,
    });

    expect(getByText(props.number.toString())).toHaveStyle({
      color: Colors.text,
    });
  });

  it('applies primary color styles when isNeutralBackground is false', () => {
    const {getByText, getByTestId, props} = setupNumberBubble({
      isNeutralBackground: false,
    });

    expect(getByTestId('numberBubbleContainer')).toHaveStyle({
      backgroundColor: props.color.background_light,
      borderColor: props.color.background,
    });

    expect(getByText(props.number.toString())).toHaveStyle({
      color: props.color.foreground,
    });
  });

  it('applies custom container style', () => {
    const {getByTestId, props} = setupNumberBubble({style: {width: 200}});

    expect(getByTestId('numberBubbleContainer')).toHaveStyle(props.style);
  });
});
