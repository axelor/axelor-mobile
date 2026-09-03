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

import {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder} from 'react-native';

const ANIMATION_DURATION = 250;
const DRAG_VELOCITY = 0.5;
const TAP_SLOP = 5;

interface MonthPanelDragProps {
  isExpanded: boolean;
  travel: number;
  onToggle: () => void;
}

export const useMonthPanelDrag = ({
  isExpanded,
  travel,
  onToggle,
}: MonthPanelDragProps) => {
  const progress = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const [isDragging, setIsDragging] = useState(false);

  const expandedRef = useRef(isExpanded);
  expandedRef.current = isExpanded;

  const travelRef = useRef(travel);
  travelRef.current = travel;

  const onToggleRef = useRef(onToggle);
  onToggleRef.current = onToggle;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isExpanded ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }, [isExpanded, progress]);

  const settle = useRef((toValue: number) => {
    Animated.timing(progress, {
      toValue,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }).current;

  const progressFrom = useRef((offset: number) =>
    Math.min(
      1,
      Math.max(0, (expandedRef.current ? 1 : 0) + offset / travelRef.current),
    ),
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > TAP_SLOP,
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        Math.abs(gestureState.dy) > TAP_SLOP,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => setIsDragging(true),
      onPanResponderMove: (_, gestureState) =>
        progress.setValue(progressFrom(gestureState.dy)),
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);

        const wasExpanded = expandedRef.current;
        const moved = progressFrom(gestureState.dy);

        const shouldExpand =
          gestureState.vy > DRAG_VELOCITY
            ? true
            : gestureState.vy < -DRAG_VELOCITY
              ? false
              : moved >= 0.5;

        if (shouldExpand === wasExpanded) {
          settle(wasExpanded ? 1 : 0);

          return;
        }

        onToggleRef.current();
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
        settle(expandedRef.current ? 1 : 0);
      },
    }),
  ).current;

  return {progress, isDragging, panHandlers: panResponder.panHandlers};
};
