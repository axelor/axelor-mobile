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
import {HalfLabelCard} from '@axelor/aos-mobile-ui';
import {setup, getDefaultThemeColors} from '../../tools';

describe('HalfLabelCard Component', () => {
  const Colors = getDefaultThemeColors();
  const baseProps = {
    title: 'Card Title',
    iconName: 'star',
    onPress: jest.fn(),
  };

  const setupHalfLabelCard = overrideProps =>
    setup({
      Component: HalfLabelCard,
      baseProps,
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId, getByText, props} = setupHalfLabelCard();

    expect(getByTestId('cardContainer')).toBeTruthy();
    expect(getByText(props.title)).toBeTruthy();
  });

  it('renders the provided icon, title, and chevron icon', () => {
    const {getByTestId, getByText, props} = setupHalfLabelCard();

    expect(getByTestId(`icon-${props.iconName}`)).toBeTruthy();
    expect(getByText(props.title)).toBeTruthy();
    expect(getByTestId('icon-chevron-right')).toBeTruthy();
  });

  it('renders a touchable component', () => {
    const {getByTestId, props} = setupHalfLabelCard({onPress: jest.fn()});

    const touchableComponent = getByTestId('cardContainer').parent;
    expect(touchableComponent).toBeTruthy();

    expect(touchableComponent.props.disabled).not.toBe(true);

    fireEvent.press(touchableComponent);

    expect(props.onPress).toHaveBeenCalled();
  });

  it('applies custom style when provided', () => {
    const customStyle = {backgroundColor: Colors.primaryColor.background_light};
    const {getByTestId} = setupHalfLabelCard({style: customStyle});

    expect(getByTestId('cardContainer')).toHaveStyle(customStyle);
  });
});
