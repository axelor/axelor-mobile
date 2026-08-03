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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useThemeColor} from '../../../theme';
import {Card, Icon} from '../../atoms';
import BarItem from './BarItem';
import ItemTitle from './ItemTitle';
import {BottomBarItem} from './types.helper';
import {getVisibleItems} from './display.helper';

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
  const Colors = useThemeColor();

  const itemPositions = useRef<any>({});
  const animatedX = useSharedValue(0);
  const scrollRef = useRef<ScrollView>(null);
  const viewportWidthRef = useRef<number>(0);
  const contentWidthRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const didInitialScrollRef = useRef<boolean>(false);

  const [selectedKey, setSelectedKey] = useState<string>();
  const [selectedItemColor, setSelectedItemColor] = useState<any>();
  const [showLeftIndicator, setShowLeftIndicator] = useState<boolean>(false);
  const [showRightIndicator, setShowRightIndicator] = useState<boolean>(false);

  const onItemLayout = useCallback(
    (event: any, key: any) => {
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

  const recomputeIndicators = useCallback(() => {
    const maxX = contentWidthRef.current - viewportWidthRef.current;
    setShowLeftIndicator(offsetRef.current > 1);
    setShowRightIndicator(maxX > 1 && offsetRef.current < maxX - 1);
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      offsetRef.current = event.nativeEvent.contentOffset.x;
      recomputeIndicators();
    },
    [recomputeIndicators],
  );

  const scrollToKey = useCallback(
    (key?: string, animated: boolean = true) => {
      const x = key != null ? itemPositions.current[key] : null;
      if (
        x == null ||
        scrollRef.current == null ||
        viewportWidthRef.current === 0
      ) {
        return;
      }
      const target = Math.max(0, x - (viewportWidthRef.current - itemSize) / 2);
      scrollRef.current.scrollTo({x: target, animated});
    },
    [itemSize],
  );

  useEffect(() => {
    scrollToKey(selectedKey);
  }, [selectedKey, scrollToKey]);

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
      <View style={styles.viewContainer} testID="bottomBarViewComtainer">
        {activeView?.viewComponent}
      </View>
      <View testID="bottomBarComtainer" style={styles.barContainer}>
        <Card style={[styles.bottomContainer, style]}>
          <View style={styles.scrollWrapper}>
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={handleScroll}
              onLayout={event => {
                viewportWidthRef.current = event.nativeEvent.layout.width;
                recomputeIndicators();
              }}
              onContentSizeChange={width => {
                contentWidthRef.current = width;
                recomputeIndicators();
                if (!didInitialScrollRef.current) {
                  didInitialScrollRef.current = true;
                  scrollToKey(selectedKey, false);
                }
              }}
              contentContainerStyle={styles.itemsContainer}>
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
            </ScrollView>
            {showLeftIndicator && (
              <View
                pointerEvents="none"
                style={[styles.chevron, styles.chevronLeft]}>
                <Icon name="chevron-left" size={16} />
              </View>
            )}
            {showRightIndicator && (
              <View
                pointerEvents="none"
                style={[styles.chevron, styles.chevronRight]}>
                <Icon name="chevron-right" size={16} />
              </View>
            )}
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
  viewContainer: {
    flex: 1,
  },
  barContainer: {
    flexShrink: 0,
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
  scrollWrapper: {
    position: 'relative',
  },
  itemsContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chevron: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  chevronLeft: {
    left: -8,
  },
  chevronRight: {
    right: -8,
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
