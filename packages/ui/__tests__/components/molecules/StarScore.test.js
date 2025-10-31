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
import {StarScore} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

const getIcons = (getter, iconName) => {
  return getter(`icon-${iconName}`);
};

describe('StarScore Component', () => {
  const Colors = getDefaultThemeColors();

  const setupStarScore = overrideProps =>
    setup({
      Component: StarScore,
      baseProps: {score: 3.5, onPress: jest.fn()},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupStarScore();

    expect(getByTestId('starScoreContainer')).toBeTruthy();
  });

  it('renders the correct number of active stars based on score when showHalfStar is true', () => {
    const {queryAllByTestId} = setupStarScore({showHalfStar: true});

    expect(getIcons(queryAllByTestId, 'star-fill')).toHaveLength(3);
    expect(getIcons(queryAllByTestId, 'start-half-fill')).toHaveLength(1);
  });

  it('renders the correct number of active stars based on score with disabled showHalfStar props', () => {
    const {queryAllByTestId} = setupStarScore({showHalfStar: false});

    expect(getIcons(queryAllByTestId, 'star-fill')).toHaveLength(3);
    expect(getIcons(queryAllByTestId, 'start-half-fill')).toHaveLength(0);
  });

  it('renders missing stars when showMissingStar is true', () => {
    const {queryAllByTestId} = setupStarScore({showMissingStar: true});

    expect(getIcons(queryAllByTestId, 'star-fill')).toHaveLength(3);
    expect(getIcons(queryAllByTestId, 'star')).toHaveLength(2);
  });

  it('renders missing stars when showMissingStar is false', () => {
    const {queryAllByTestId} = setupStarScore({showMissingStar: false});

    expect(getIcons(queryAllByTestId, 'star-fill')).toHaveLength(3);
    expect(getIcons(queryAllByTestId, 'star')).toHaveLength(0);
  });

  it('calls onPress with the correct argument when a star is pressed', () => {
    const {getAllByTestId, props} = setupStarScore({
      showMissingStar: true,
      editMode: true,
      onPress: jest.fn(),
    });

    fireEvent.press(getAllByTestId('iconTouchable').at(1));
    fireEvent.press(getAllByTestId('iconTouchable').at(4));

    expect(props.onPress).toHaveBeenNthCalledWith(1, 2);
    expect(props.onPress).toHaveBeenNthCalledWith(2, 5);
  });

  it('renders stars with the correct color and size', () => {
    const {getAllByTestId, props} = setupStarScore({
      color: Colors.errorColor,
      size: 30,
    });

    getIcons(getAllByTestId, 'star-fill').forEach(_elt => {
      expect(_elt.props).toMatchObject({
        fill: props.color.background,
        width: props.size,
        height: props.size,
      });
    });
  });

  it('renders readonly stars when not in editmode', () => {
    const {getAllByTestId, props} = setupStarScore({
      showMissingStar: true,
      editMode: false,
      onPress: jest.fn(),
    });

    fireEvent.press(getAllByTestId('iconTouchable').at(0));
    fireEvent.press(getAllByTestId('iconTouchable').at(3));

    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('renders stars with custom style', () => {
    const {getByTestId, props} = setupStarScore({style: {marginTop: 50}});

    expect(getByTestId('starScoreContainer')).toHaveStyle(props.style);
  });
});
