/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export function useSwipe(
  onSwipeLeft?: any,
  onSwipeRight?: any,
  rangeOffset = 4,
) {
  let firstTouchX = 0;
  let firstTouchY = 0;

  function onTouchStart(e: any) {
    firstTouchX = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  }

  function onTouchEnd(e: any) {
    const positionX = e.nativeEvent.pageX;
    const positionY = e.nativeEvent.pageY;
    const horizontalSwipeRange = windowWidth / rangeOffset;
    const verticalSwipeRange = windowWidth / rangeOffset;

    const deltaX = positionX - firstTouchX;
    const deltaY = positionY - firstTouchY;

    if (
      Math.abs(deltaX) > horizontalSwipeRange &&
      Math.abs(deltaY) < verticalSwipeRange
    ) {
      if (deltaX > 0) {
        onSwipeRight && onSwipeRight();
      } else {
        onSwipeLeft && onSwipeLeft();
      }
    }
  }

  return {onTouchStart, onTouchEnd};
}
