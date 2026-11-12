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
import {StyleSheet} from 'react-native';
import {BottomBar} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

// Simulate a tablet in portrait mode (~800 dp wide). NumberBubble computes its
// default size from the window width when its module is loaded, so this mock
// must be in place before the UI package is imported (jest.mock is hoisted).
jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
  const window = {width: 800, height: 1280, scale: 2, fontScale: 1};
  return {
    __esModule: true,
    default: {
      get: () => window,
      set: jest.fn(),
      addEventListener: () => ({remove: jest.fn()}),
    },
  };
});

const ITEM_SIZE = 50;

describe('BarItem indicator on tablet', () => {
  const Colors = getDefaultThemeColors();

  const setupBottomBar = (itemSize = ITEM_SIZE) =>
    setup({
      Component: BottomBar,
      baseProps: {
        itemSize,
        items: [
          {
            key: 'home',
            iconName: 'house',
            testID: 'home',
            viewComponent: null,
            color: Colors.secondaryColor_dark,
          },
          {
            key: 'equipment',
            iconName: 'cart',
            testID: 'equipment',
            viewComponent: null,
            indicator: 3,
            color: Colors.plannedColor,
          },
        ],
      },
    });

  const getIndicatorWrapper = bubble => {
    let node = bubble.parent;
    while (node != null) {
      if (StyleSheet.flatten(node.props?.style)?.position === 'absolute') {
        return node;
      }
      node = node.parent;
    }
    return null;
  };

  it.each([40, ITEM_SIZE, 80])(
    'sizes the badge from the button size (%i), not the screen width',
    itemSize => {
      const {getByTestId} = setupBottomBar(itemSize);
      const bubbleStyle = StyleSheet.flatten(
        getByTestId('numberBubbleContainer').props.style,
      );

      expect(bubbleStyle.width).toBeCloseTo(itemSize * 0.5);
      expect(bubbleStyle.height).toBeCloseTo(itemSize * 0.5);
    },
  );

  it('lets taps through the badge to the button', () => {
    const {getByTestId} = setupBottomBar();
    const wrapper = getIndicatorWrapper(getByTestId('numberBubbleContainer'));

    expect(wrapper).not.toBeNull();
    expect(wrapper.props.pointerEvents).toBe('none');
  });
});
