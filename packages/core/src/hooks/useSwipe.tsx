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
