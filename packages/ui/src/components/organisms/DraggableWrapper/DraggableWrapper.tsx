/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useMemo, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';

export interface DraggableWrapperProps {
  children: any;
}

const DraggableWrapper = ({children}: DraggableWrapperProps) => {
  const {setIsScrollEnabled} = useConfig();

  const [dragging, setDragging] = useState(false);

  const position = useRef(new Animated.ValueXY()).current;
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
        setIsScrollEnabled(false);
        position.setOffset({
          x: offsetX.current,
          y: offsetY.current,
        });
        position.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: () => {
        setDragging(false);
        setIsScrollEnabled(true);
        position.flattenOffset();
        offsetX.current = (position.x as any).__getValue();
        offsetY.current = (position.y as any).__getValue();
      },
      onPanResponderTerminate: () => {
        setDragging(false);
        setIsScrollEnabled(true);
        position.setValue({x: 0, y: 0});
      },
    }),
  ).current;

  const styles = useMemo(() => {
    return getStyles(dragging);
  }, [dragging]);

  return (
    <Animated.View
      style={[
        {
          transform: position.getTranslateTransform(),
        },
        styles.container,
      ]}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

const getStyles = (dragging: boolean) =>
  StyleSheet.create({
    container: {
      zIndex: 100,
      opacity: dragging ? 0.7 : 1,
    },
  });

export default DraggableWrapper;
