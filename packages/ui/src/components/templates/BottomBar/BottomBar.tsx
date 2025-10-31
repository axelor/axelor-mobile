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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
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
import ItemTitle from './ItemTitle';
import {BottomBarItem} from './types.helper';
import {getVisibleItems} from './display.helper';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BottomBar = ({
  style,
  items,
  updateActiveItem = false,
  itemSize = 50,
  manageActiveTitle = true,
}: {
  style?: any;
  items: BottomBarItem[];
  updateActiveItem?: boolean;
  itemSize?: number;
  manageActiveTitle?: boolean;
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

  const visibleItems: BottomBarItem[] = useMemo(
    () => getVisibleItems(items),
    [items],
  );

  const handleItemPress = useCallback(
    (item: BottomBarItem) => {
      if (typeof item.onPress === 'function') {
        item.onPress();
      }

      if (item.viewComponent != null) {
        setSelectedItemColor(item.color);
        setSelectedKey(item.key);
      }
    },
    [setSelectedKey, setSelectedItemColor],
  );

  const renderItem = useCallback(
    (item: BottomBarItem) => {
      return (
        <View
          key={item.key}
          onLayout={event => onItemLayout(event, item.key)}
          testID={`bar-item-${(item as any).testID}`}>
          <BarItem
            {...item}
            title={manageActiveTitle ? undefined : item.title}
            size={itemSize}
            onPress={() => handleItemPress(item)}
            isSelected={selectedKey === item.key && !('onPress' in item)}
          />
        </View>
      );
    },
    [manageActiveTitle, itemSize, selectedKey, onItemLayout, handleItemPress],
  );

  useEffect(() => {
    if (selectedKey == null) {
      const _viewItem = visibleItems?.find(
        ({viewComponent}) => viewComponent != null,
      );
      setSelectedKey(_viewItem?.key);
      setSelectedItemColor(_viewItem?.color);
    }
  }, [selectedKey, visibleItems]);

  useEffect(() => {
    const activeItem = visibleItems.find(item => item.isActive);

    if (activeItem && updateActiveItem) {
      setSelectedKey(activeItem.key);
      setSelectedItemColor(activeItem.color);
    }
  }, [updateActiveItem, visibleItems]);

  const activeView = useMemo(
    () => visibleItems.find(_item => _item.key === selectedKey),
    [selectedKey, visibleItems],
  );

  return (
    <View style={styles.container}>
      <View style={{height: viewHeight}} testID="bottomBarViewComtainer">
        {activeView?.viewComponent}
      </View>
      <View
        testID="bottomBarComtainer"
        onLayout={event => {
          const {height: barHeight} = event.nativeEvent.layout;
          setViewHeight(
            WINDOW_HEIGHT -
              StaticSafeAreaInsets.safeAreaInsetsTop -
              headerHeight -
              barHeight,
          );
        }}>
        <Card style={[styles.bottomContainer, style]}>
          <View style={styles.itemsContainer}>
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
          </View>
          <ItemTitle
            title={manageActiveTitle ? activeView?.title : undefined}
            style={styles.title}
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
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  animatedBar: {
    position: 'absolute',
    height: 2,
    width: 41,
    bottom: 2,
    left: 7,
    borderRadius: 1,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default BottomBar;
