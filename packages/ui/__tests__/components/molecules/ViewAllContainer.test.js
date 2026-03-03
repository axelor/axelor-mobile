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

import React from 'react';
import {View} from 'react-native';
import {fireEvent, within} from '@testing-library/react-native';
import {ViewAllContainer} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('ViewAllContainer Component', () => {
  const setupViewAllContainer = overrideProps =>
    setup({
      Component: ViewAllContainer,
      baseProps: {
        children: <View testID="children" />,
        onViewPress: jest.fn(),
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupViewAllContainer();

    expect(getByTestId('cardContainer')).toBeTruthy();
  });

  it('should render children', () => {
    const {getByTestId} = setupViewAllContainer();

    expect(getByTestId('children')).toBeTruthy();
  });

  it('should call onViewPress when TouchableOpacity is pressed', () => {
    const {getByTestId, props} = setupViewAllContainer({
      onViewPress: jest.fn(),
    });

    fireEvent.press(getByTestId('viewAllContainerButton'));
    expect(props.onViewPress).toHaveBeenCalledTimes(1);
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupViewAllContainer({style: {width: 200}});

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });

  it('should render title when provided', () => {
    const {getByText, props} = setupViewAllContainer({title: 'Title'});

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should render first and second data whith renderFirstTwoItems function when provided', () => {
    const {queryAllByTestId, props} = setupViewAllContainer({
      data: ['Data 0', 'Data 1', 'Data 2'],
      renderFirstTwoItems: jest.fn((_, index) => (
        <View testID={`item-idx${index}`} />
      )),
    });

    expect(queryAllByTestId(/^item-idx.*/)).toHaveLength(2);

    expect(props.renderFirstTwoItems).toHaveBeenNthCalledWith(
      1,
      props.data[0],
      0,
    );
    expect(props.renderFirstTwoItems).toHaveBeenNthCalledWith(
      2,
      props.data[1],
      1,
    );
  });

  it('should not render TouchableOpacity when disabled is true', () => {
    const {queryByTestId} = setupViewAllContainer({disabled: true});

    expect(queryByTestId('viewAllContainerButton')).toBeFalsy();
  });

  it('should render a top View with Text and plus Icon when isHeaderExist is true', () => {
    const {getByTestId, props} = setupViewAllContainer({
      isHeaderExist: true,
      onNewIcon: jest.fn(),
    });

    const _view = getByTestId('viewAllContainerHeader');

    expect(_view).toBeTruthy();
    expect(within(_view).getByText('Content')).toBeTruthy();
    expect(within(_view).getByTestId('icon-plus-lg')).toBeTruthy();

    fireEvent.press(within(_view).getByTestId('iconTouchable'));
    expect(props.onNewIcon).toHaveBeenCalledTimes(1);
  });
});
