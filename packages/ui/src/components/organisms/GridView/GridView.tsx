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

import React, {useCallback, useMemo} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {checkNullString} from '../../../utils';
import {Card, Text} from '../../atoms';
import CellView from './CellView';

export interface Column {
  key: string;
  title: string;
  width?: number;
  getValue?: (row: any) => any;
}

const COLUMN_DEFAULT_WIDTH = 70;
const CARD_PADDING = '2.5%';

const GridView = ({
  style,
  title,
  columns,
  data,
  translator = t => t,
  onRowPress,
}: {
  style?: any;
  title?: string;
  columns: Column[];
  data: any[];
  translator?: (value: string) => string;
  onRowPress?: (row: any) => void;
}) => {
  const columnWidth = useMemo(() => {
    if (!Array.isArray(columns) || columns.length === 0) {
      return COLUMN_DEFAULT_WIDTH;
    }

    const fixedTotal = columns.reduce(
      (sum, c) => sum + (c.width != null ? c.width : 0),
      0,
    );
    const flexCount = columns.filter(c => c.width == null).length;

    if (flexCount === 0) return COLUMN_DEFAULT_WIDTH;

    const usableWidth = Dimensions.get('window').width * 0.85;
    const width = (usableWidth - fixedTotal) / flexCount;

    return width < COLUMN_DEFAULT_WIDTH ? COLUMN_DEFAULT_WIDTH : width;
  }, [columns]);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.rowContainer} testID="gridViewHeaderContainer">
        {columns.map((_c, idx, self) => (
          <CellView
            key={_c.key}
            showRight={idx < self.length - 1}
            showBottom={true}
            width={_c.width ?? columnWidth}>
            <Text writingType="title" fontSize={16} style={styles.cellTitle}>
              {_c.title}
            </Text>
          </CellView>
        ))}
      </View>
    );
  }, [columnWidth, columns]);

  const renderRow = useCallback(
    (row: any, rowIdx: number, dataArray: any[]) => {
      return (
        <TouchableOpacity
          key={rowIdx}
          style={styles.rowContainer}
          testID="gridViewRowContainer"
          activeOpacity={0.9}
          disabled={!onRowPress}
          onPress={() => onRowPress?.(row)}>
          {columns.map((_c, idx, self) => (
            <CellView
              key={`${_c.key} - ${rowIdx}`}
              showRight={idx < self.length - 1}
              showBottom={rowIdx < dataArray.length - 1}
              width={_c.width ?? columnWidth}>
              <Text>{_c?.getValue?.(row) ?? row?.[_c.key] ?? ''}</Text>
            </CellView>
          ))}
        </TouchableOpacity>
      );
    },
    [columnWidth, columns, onRowPress],
  );

  if (!Array.isArray(columns) || columns.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} testID="gridViewContainer">
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <Card style={[styles.cardContainer, style]}>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          <View>
            {renderHeader()}
            {!Array.isArray(data) || data.length === 0 ? (
              <Text
                writingType="details"
                fontSize={14}
                style={styles.noDataText}>
                {translator('Base_NoData')}
              </Text>
            ) : (
              data.map(renderRow)
            )}
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    margin: 2,
  },
  title: {
    marginLeft: 10,
    marginBottom: 2,
  },
  cardContainer: {
    paddingHorizontal: CARD_PADDING,
    paddingRight: CARD_PADDING,
    paddingVertical: CARD_PADDING,
  },
  scrollView: {
    flexDirection: 'column',
    height: null,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  cellTitle: {
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginVertical: 4,
  },
});

export default GridView;
