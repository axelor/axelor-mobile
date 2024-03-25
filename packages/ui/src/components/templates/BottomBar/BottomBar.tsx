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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {Card} from '../../atoms';
import BarItem from './BarItem';
import {BottomBarItem, DisplayItem} from './types.helper';
import {getVisibleItems} from './display.helper';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BottomBar = ({
  style,
  items,
  itemSize = 40,
}: {
  style?: any;
  items: BottomBarItem[];
  itemSize?: number;
}) => {
  const [selectedKey, setSelectedKey] = useState<string>();
  const [viewHeight, setViewHeight] = useState<number>(WINDOW_HEIGHT * 0.8);

  const {headerHeight} = useConfig();

  const visibleItems: DisplayItem[] = useMemo(
    () => getVisibleItems(items),
    [items],
  );

  const renderItem = useCallback(
    (item: DisplayItem) => {
      return (
        <BarItem
          {...item}
          size={itemSize}
          onPress={() => setSelectedKey(item.key)}
          isSelected={selectedKey === item.key}
        />
      );
    },
    [itemSize, selectedKey],
  );

  useEffect(() => {
    if (selectedKey == null) {
      setSelectedKey(visibleItems?.[0].key);
    }
  }, [selectedKey, visibleItems]);

  return (
    <View style={styles.container}>
      <View style={{height: viewHeight}}>
        {visibleItems.find(_item => _item.key === selectedKey)?.viewComponent}
      </View>
      <View
        onLayout={event => {
          const {height: barHeight} = event.nativeEvent.layout;
          setViewHeight(WINDOW_HEIGHT - headerHeight - barHeight);
        }}>
        <Card style={[styles.bottomContainer, style]}>
          {visibleItems.map(renderItem)}
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
});

export default BottomBar;
