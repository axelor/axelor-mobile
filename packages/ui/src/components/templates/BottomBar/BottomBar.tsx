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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, PanResponder, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import {useConfig} from '../../../config/ConfigContext';
import {useThemeColor} from '../../../theme';
import {Card} from '../../atoms';
import BarItem from './BarItem';
import {BottomBarItem, DisplayItem} from './types.helper';
import {getVisibleItems} from './display.helper';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BottomBar = ({
  style,
  items,
  itemSize = 50,
}: {
  style?: any;
  items: BottomBarItem[];
  itemSize?: number;
}) => {
  const {headerHeight} = useConfig();
  const Colors = useThemeColor();

  const [selectedKey, setSelectedKey] = useState<string>();
  const [viewHeight, setViewHeight] = useState<number>(WINDOW_HEIGHT * 0.8);
  const [selectedItemColor, setSelectedItemColor] = useState<any>();

  const itemPositions = useRef({});
  const animatedX = useSharedValue(0);

  const onItemLayout = useCallback(
    (event, key) => {
      itemPositions.current[key] = event.nativeEvent.layout.x;
      if (key === selectedKey) {
        animatedX.value = itemPositions.current[key];
      }
    },
    [animatedX, selectedKey],
  );

  useEffect(() => {
    if (selectedKey && itemPositions.current[selectedKey] != null) {
      animatedX.value = withSpring(itemPositions.current[selectedKey], {
        damping: 13,
        stiffness: 90,
        mass: 1,
      });
    }
  }, [selectedKey, animatedX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animatedX.value}],
    };
  });

  const visibleItems: DisplayItem[] = useMemo(
    () => getVisibleItems(items),
    [items],
  );

  const renderItem = useCallback(
    (item: DisplayItem) => {
      return (
        <View key={item.key} onLayout={event => onItemLayout(event, item.key)}>
          <BarItem
            {...item}
            size={itemSize}
            onPress={() => {
              setSelectedItemColor(item.color);
              setSelectedKey(item.key);
            }}
            isSelected={selectedKey === item.key}
          />
        </View>
      );
    },
    [itemSize, onItemLayout, selectedKey],
  );

  useEffect(() => {
    if (selectedKey == null) {
      setSelectedKey(visibleItems?.[0].key);
      setSelectedItemColor(visibleItems?.[0].color);
    }
  }, [selectedKey, visibleItems]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return (
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
            Math.abs(gestureState.dx) > 10
          );
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (Math.abs(gestureState.dx) > 10) {
            if (gestureState.dx < 0) {
              const currentIndex = visibleItems.findIndex(
                item => item.key === selectedKey,
              );
              if (currentIndex < visibleItems.length - 1) {
                setSelectedKey(visibleItems[currentIndex + 1].key);
                setSelectedItemColor(visibleItems[currentIndex + 1].color);
              }
            } else if (gestureState.dx > 0) {
              const currentIndex = visibleItems.findIndex(
                item => item.key === selectedKey,
              );
              if (currentIndex > 0) {
                setSelectedKey(visibleItems[currentIndex - 1].key);
                setSelectedItemColor(visibleItems[currentIndex - 1].color);
              }
            }
          }
        },
      }),
    [selectedKey, visibleItems],
  );

  return (
    <View style={styles.container}>
      <View style={{height: viewHeight}}>
        {visibleItems.find(_item => _item.key === selectedKey)?.viewComponent}
      </View>
      <View
        onLayout={event => {
          const {height: barHeight} = event.nativeEvent.layout;
          setViewHeight(
            WINDOW_HEIGHT -
              StaticSafeAreaInsets.safeAreaInsetsTop -
              headerHeight -
              barHeight,
          );
        }}
        {...panResponder.panHandlers}>
        <Card style={[styles.bottomContainer, style]}>
          {visibleItems.map(renderItem)}
          <Animated.View
            style={[
              styles.animatedBar,
              animatedStyle,
              {
                backgroundColor:
                  selectedItemColor?.background != null
                    ? selectedItemColor?.background
                    : Colors.primaryColor?.background,
              },
            ]}
          />
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingRight: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginBottom: 10,
  },
  animatedBar: {
    position: 'absolute',
    height: 2,
    width: 41,
    bottom: 10,
    left: 7,
    borderRadius: 1,
  },
});

export default BottomBar;
