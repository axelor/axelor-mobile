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

import React from 'react';
import {View} from 'react-native';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

jest.mock('../../../lib/components/organisms/InfoButton/InfoButton', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_infoButton" {...props} />;
});

describe('ActionCard Component', () => {
  const setupActionCard = overrideProps =>
    setup({
      Component: ActionCard,
      baseProps: {
        children: <View testID="childrenComponent" />,
        actionList: [
          {iconName: 'pencil-fill', onPress: jest.fn(), key: '1'},
          {iconName: 'check-lg', onPress: jest.fn(), key: '2'},
          {iconName: 'plus-lg', onPress: jest.fn(), key: '3'},
        ],
        translator: jest.fn(key => key),
        forceActionsDisplay: true,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupActionCard();

    expect(getByTestId('actionCardContainer')).toBeTruthy();
  });

  it('should render children correctly', () => {
    const {getByTestId} = setupActionCard();

    expect(getByTestId('childrenComponent')).toBeTruthy();
  });

  it('should render InfoButton components for each action in the list', () => {
    const {getAllByTestId, props} = setupActionCard();

    const _buttonElts = getAllByTestId('mocked_infoButton');

    expect(_buttonElts).toHaveLength(props.actionList.length);
    props.actionList.forEach((_a, idx) => {
      expect(_buttonElts.at(idx).props).toMatchObject({
        iconName: _a.iconName,
        onPress: _a.onPress,
      });
    });
  });

  it('should render InfoButton components for quick action if present', () => {
    const {getAllByTestId, props} = setupActionCard({
      quickAction: {iconName: 'heart', onPress: jest.fn()},
    });

    const _buttonElts = getAllByTestId('mocked_infoButton');
    expect(_buttonElts).toHaveLength(props.actionList.length + 1);
    expect(_buttonElts.at(props.actionList.length).props).toMatchObject(
      props.quickAction,
    );
  });

  it('should apply custom style to the container if provided', () => {
    const {getByTestId, props} = setupActionCard({style: {width: 200}});

    expect(getByTestId('actionCardContainer')).toHaveStyle(props.style);
  });
});
