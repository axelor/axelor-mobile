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
import {MovementIndicationCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('MovementIndicationCard Component', () => {
  const setupMovementIndicationCard = overrideProps =>
    setup({
      Component: MovementIndicationCard,
      baseProps: {
        titleTop: 'Main Warehouse',
        labelTop: 'Origin',
        iconTop: 'house-down',
        titleDown: 'Waste',
        labelDown: 'Destination',
        iconDown: 'house-up',
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupMovementIndicationCard();

    expect(getByTestId('movementIndicationCardContainer')).toBeTruthy();
  });

  it('renders both titles without the labels when collapsed', () => {
    const {getByText, queryByText, props} = setupMovementIndicationCard();

    expect(getByText(props.titleTop)).toBeTruthy();
    expect(getByText(props.titleDown)).toBeTruthy();

    expect(queryByText(props.labelTop)).toBeNull();
    expect(queryByText(props.labelDown)).toBeNull();
  });

  it('renders the labels once expanded', () => {
    const {getByTestId, getByText, props} = setupMovementIndicationCard();

    fireEvent.press(getByTestId('movementIndicationCardTouchable'));

    expect(getByText(props.labelTop)).toBeTruthy();
    expect(getByText(props.labelDown)).toBeTruthy();
    expect(getByText(props.titleTop)).toBeTruthy();
    expect(getByText(props.titleDown)).toBeTruthy();
  });

  it('collapses again on a second press', () => {
    const {getByTestId, queryByText, props} = setupMovementIndicationCard();

    fireEvent.press(getByTestId('movementIndicationCardTouchable'));
    fireEvent.press(getByTestId('movementIndicationCardTouchable'));

    expect(queryByText(props.labelTop)).toBeNull();
  });

  it('renders nothing when both titles are empty', () => {
    const {queryByTestId} = setupMovementIndicationCard({
      titleTop: null,
      titleDown: '',
    });

    expect(queryByTestId('movementIndicationCardContainer')).toBeNull();
  });

  it('renders only the given side when the other one is empty', () => {
    const {getByText, queryByText, props} = setupMovementIndicationCard({
      titleDown: null,
    });

    expect(getByText(props.titleTop)).toBeTruthy();
    expect(queryByText('Waste')).toBeNull();
  });

  it('applies custom style correctly', () => {
    const {getByTestId, props} = setupMovementIndicationCard({
      style: {marginBottom: 10},
    });

    expect(getByTestId('movementIndicationCardContainer')).toHaveStyle(
      props.style,
    );
  });
});
