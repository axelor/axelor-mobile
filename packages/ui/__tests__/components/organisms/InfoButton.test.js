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

import {fireEvent} from '@testing-library/react-native';
import {InfoButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('InfoButton Component', () => {
  const Colors = getDefaultThemeColors();

  const setupInfoButton = overrideProps =>
    setup({
      Component: InfoButton,
      baseProps: {
        iconName: 'plus-lg',
        iconColor: Colors.primaryColor,
        indication: 'This is an info button.',
        onPress: jest.fn(),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupInfoButton();

    expect(getByTestId('cardIndicatorContainer')).toBeTruthy();
    expect(getByTestId('cardIconButtonContainer')).toBeTruthy();
  });

  it('should render with the correct icon', () => {
    const {getByTestId, props} = setupInfoButton();

    expect(getByTestId(`icon-${props.iconName}`)).toBeTruthy();
  });

  it('calls the onPress function when the button is pressed', () => {
    const {getByTestId, props} = setupInfoButton({onPress: jest.fn()});

    fireEvent.press(getByTestId('cardIconButtonContainer'));
    expect(props.onPress).toHaveBeenCalled();
  });

  it('renders correctly the indication on long press', () => {
    const {getByTestId, queryByText, props} = setupInfoButton();

    expect(queryByText(props.indication)).toBeFalsy();

    fireEvent(getByTestId('cardIconButtonContainer'), 'longPress');
    expect(queryByText(props.indication)).toBeTruthy();

    fireEvent(getByTestId('cardIconButtonContainer'), 'longPress');
    expect(queryByText(props.indication)).toBeFalsy();
  });
});
