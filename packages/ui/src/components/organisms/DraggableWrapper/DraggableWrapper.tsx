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

import React, {useMemo, useRef, useState} from 'react';
import {Animated, Dimensions, PanResponder, StyleSheet} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';

export interface DraggableWrapperProps {
  style?: any;
  children: any;
}

const DraggableWrapper = ({style, children}: DraggableWrapperProps) => {
  const {headerHeight, setIsScrollEnabled} = useConfig();

  const [dragging, setDragging] = useState(false);
  const [isWindowPositionGet, setIsWindowPositionGet] = useState(false);

  const wrapperRef = useRef(null);
  const screenPosition = useRef({x: 0, y: 0});
  const viewLayout = useRef({width: 0, height: 0});
  const position = useRef(new Animated.ValueXY()).current;
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

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

        const newPosX = (position.x as any).__getValue();
        const newPosY = (position.y as any).__getValue();

        const {width: layoutWidth, height: layoutHeight} = viewLayout.current;

        let adjustedPosX = newPosX + screenPosition.current.x;
        let adjustedPosY = newPosY + screenPosition.current.y;

        if (adjustedPosX < 0) {
          adjustedPosX = 0;
        } else if (adjustedPosX + layoutWidth > screenWidth) {
          adjustedPosX = screenWidth - layoutWidth;
        }

        if (adjustedPosY < headerHeight) {
          adjustedPosY = headerHeight;
        } else if (adjustedPosY + layoutHeight > screenHeight) {
          adjustedPosY = screenHeight - layoutHeight;
        }

        adjustedPosX -= screenPosition.current.x;
        adjustedPosY -= screenPosition.current.y;

        Animated.spring(position, {
          toValue: {
            x: adjustedPosX,
            y: adjustedPosY,
          },
          useNativeDriver: false,
        }).start();

        offsetX.current = adjustedPosX;
        offsetY.current = adjustedPosY;
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
        style,
      ]}
      ref={wrapperRef}
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;

        if (isWindowPositionGet) {
          const screenPositionX =
            screenPosition.current.x - width + viewLayout.current.width;
          const screenPositionY =
            screenPosition.current.y - height + viewLayout.current.height;
          screenPosition.current = {x: screenPositionX, y: screenPositionY};
        } else {
          wrapperRef.current.measureInWindow((x, y) => {
            screenPosition.current = {x, y};
          });
          setIsWindowPositionGet(true);
        }

        viewLayout.current = {width, height};
      }}
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
