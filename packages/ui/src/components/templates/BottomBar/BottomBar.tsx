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
import {StyleSheet, View} from 'react-native';
import {BottomBarItem, DisplayItem} from './types.helper';
import {Card, ScrollView} from '../../atoms';
import BarItem from './BarItem';
import {getVisibleItems} from './display.helper';

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
      <ScrollView>
        {visibleItems.find(_item => _item.key === selectedKey)?.viewComponent}
      </ScrollView>
      <Card style={[styles.bottomContainer, style]}>
        {visibleItems.map(renderItem)}
      </Card>
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
