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

import {fireEvent} from '@testing-library/react-native';
import {InfoBubble} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('InfoBubble Component', () => {
  const Colors = getDefaultThemeColors();

  const setupInfoBubble = overrideProps =>
    setup({
      Component: InfoBubble,
      baseProps: {
        iconName: 'plus-lg',
        badgeColor: Colors.primaryColor,
        indication: 'This is an info bubble.',
        usePopup: false,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId, props} = setupInfoBubble();

    expect(getByTestId('cardIndicatorContainer')).toBeTruthy();
    expect(getByTestId(`icon-${props.iconName}`)).toBeTruthy();
  });

  it('should render with the correct badge color', () => {
    const {getByTestId, props} = setupInfoBubble();

    expect(getByTestId(`icon-${props.iconName}`).props.fill).toBe(
      props.badgeColor.foreground,
    );

    expect(getByTestId('iconTouchable')).toHaveStyle({
      backgroundColor: props.badgeColor.background_light,
      borderColor: props.badgeColor.background,
    });
  });

  it('should render with the correct icon color when no bubble', () => {
    const {getByTestId, props} = setupInfoBubble({coloredBubble: false});

    expect(getByTestId(`icon-${props.iconName}`).props.fill).toBe(
      props.badgeColor.background,
    );

    expect(getByTestId('iconTouchable')).toHaveStyle({
      backgroundColor: undefined,
      borderColor: undefined,
    });
  });

  it('should display the indication when clicked', () => {
    const {getByTestId, queryByText, props} = setupInfoBubble();

    expect(queryByText(props.indication)).toBeFalsy();

    fireEvent.press(getByTestId('iconTouchable'));
    expect(queryByText(props.indication)).toBeTruthy();

    fireEvent.press(getByTestId('iconTouchable'));
    expect(queryByText(props.indication)).toBeFalsy();
  });
});
