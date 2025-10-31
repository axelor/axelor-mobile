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

import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';

interface UnorderedListProps {
  data: any[];
  numberOfItems?: number;
  renderItem: (item: any) => any;
  style?: any;
}

function UnorderedList({
  data,
  numberOfItems,
  renderItem,
  style,
}: UnorderedListProps) {
  const renderData = useMemo(() => {
    if (!numberOfItems || data.length === 0) {
      return data;
    }

    if (numberOfItems > data.length) {
      console.warn(
        `Number of items provided with value ${numberOfItems} is invalid`,
      );
      return data;
    }

    return data.slice(0, numberOfItems);
  }, [numberOfItems, data]);

  return (
    <FlatList
      testID="unorderedListFlatList"
      data={renderData}
      style={[styles.container, style]}
      renderItem={({item}) => (
        <View style={styles.item} testID="unorderedListItemContainer">
          <Text style={styles.dot}>{'\u2022 '}</Text>
          {renderItem({item})}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  dot: {
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UnorderedList;
