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
import {render} from '@testing-library/react-native';
import {Card} from '@axelor/aos-mobile-ui';

describe('Card Component', () => {
  it('renders without crashing', () => {
    const {getByTestId} = render(
      <Card>
        <View />
      </Card>,
    );
    expect(getByTestId('CardContainer')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const {getByTestId} = render(
      <Card>
        <View testID="children" />
      </Card>,
    );
    expect(getByTestId('children')).toBeTruthy();
  });

  it('applies custom style correctly', () => {
    const customStyle = {marginBottom: 10};
    const {getByTestId} = render(
      <Card style={customStyle}>
        <View testID="child" />
      </Card>,
    );
    const container = getByTestId('CardContainer');
    expect(container.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
