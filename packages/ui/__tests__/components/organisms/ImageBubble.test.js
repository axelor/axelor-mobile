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
import {ImageBubble} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('ImageBubble Component', () => {
  const setupImageBubble = overrideProps =>
    setup({
      Component: ImageBubble,
      baseProps: {
        source: {
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg',
        },
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupImageBubble();

    expect(getByTestId('imageBubbleContainer')).toBeTruthy();
  });

  it('should render a round Image define with imageSize props', () => {
    const {getByRole, props} = setupImageBubble({imageSize: 50});

    expect(getByRole('image')).toHaveStyle({
      borderRadius: props.imageSize,
      width: props.imageSize,
      height: props.imageSize,
    });
  });

  it('should render the listComponent when provided', () => {
    const {getAllByTestId, props} = setupImageBubble({
      listComponent: [
        <View testID="listComponent" />,
        <View testID="listComponent" />,
        <View testID="listComponent" />,
      ],
    });

    expect(getAllByTestId('listComponent')).toHaveLength(
      props.listComponent.length,
    );
  });

  it('should apply custom style when provided', () => {
    const {getByRole, props} = setupImageBubble({style: {width: 200}});

    expect(getByRole('image')).toHaveStyle(props.style);
  });
});
