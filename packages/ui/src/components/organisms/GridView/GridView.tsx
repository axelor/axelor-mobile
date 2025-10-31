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

import React, {useCallback, useMemo} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {checkNullString} from '../../../utils';
import {Card, Text} from '../../atoms';
import CellView from './CellView';

interface Column {
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
}: {
  style?: any;
  title?: string;
  columns: Column[];
  data: any[];
  translator?: (value: string) => string;
}) => {
  const columnWidth = useMemo(() => {
    if (!Array.isArray(columns) || columns.length === 0) {
      return COLUMN_DEFAULT_WIDTH;
    }

    const width = (Dimensions.get('window').width * 0.85) / columns.length;

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
    (row, rowIdx, dataArray) => {
      return (
        <View
          key={rowIdx}
          style={styles.rowContainer}
          testID="gridViewRowContainer">
          {columns.map((_c, idx, self) => (
            <CellView
              key={`${_c.key} - ${rowIdx}`}
              showRight={idx < self.length - 1}
              showBottom={rowIdx < dataArray.length - 1}
              width={_c.width ?? columnWidth}>
              <Text>{_c?.getValue?.(row) ?? row?.[_c.key] ?? ''}</Text>
            </CellView>
          ))}
        </View>
      );
    },
    [columnWidth, columns],
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
