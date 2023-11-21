/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import ScrollList from '../ScrollList/ScrollList';
import {Text} from '../../atoms';
import {ThemeColors, useThemeColor} from '../../../theme';

interface Indicator {
  title: string;
  numberItems: number;
  loading: boolean;
}

const Separator = ({indicator}: {indicator: Indicator}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.itemSeparatorContainer}>
      <View style={styles.halfBar} />
      <View style={styles.barContainer}>
        <Text
          writingType="important"
          textColor={Colors.secondaryColor.background}>
          {indicator?.title} : {!indicator?.loading && indicator?.numberItems}
        </Text>
        {indicator?.loading && (
          <ActivityIndicator
            size="small"
            color={Colors.secondaryColor.background}
          />
        )}
      </View>
      <View style={styles.halfBar} />
    </View>
  );
};

interface GroupByScrollListProps {
  style?: any;
  loadingList: boolean;
  data: any[];
  renderItem: (item: any) => any;
  fetchData: (fetchOptions?: any) => any[] | void;
  moreLoading: boolean;
  isListEnd: boolean;
  filter: boolean;
  translator?: (translationKey: string) => string;
  horizontal?: boolean;
  disabledRefresh?: boolean;
  separatorCondition: (prevItem: any, currentItem: any) => boolean;
  fetchIndicator: (currentItem: any) => Indicator;
}

const GroupByScrollList = ({
  style,
  loadingList = false,
  data = [],
  renderItem,
  fetchData = () => [],
  moreLoading = false,
  isListEnd = false,
  filter = false,
  translator,
  horizontal = false,
  disabledRefresh = false,
  separatorCondition,
  fetchIndicator,
}: GroupByScrollListProps) => {
  const _renderItem = ({item, index}) => {
    let prevItem = null;
    if (index !== 0) {
      prevItem = data[index - 1];
    }

    if (index === 0 || separatorCondition(prevItem, item)) {
      const indicator = fetchIndicator(item);
      return (
        <>
          <Separator indicator={indicator} />
          {renderItem({item, index})}
        </>
      );
    }

    return renderItem({item, index});
  };

  return (
    <ScrollList
      style={style}
      loadingList={loadingList}
      data={data}
      renderItem={_renderItem}
      fetchData={fetchData}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      filter={filter}
      translator={translator}
      horizontal={horizontal}
      disabledRefresh={disabledRefresh}
    />
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    itemSeparatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    halfBar: {
      width: '30%',
      height: 2,
      backgroundColor: Colors.secondaryColor.background,
    },
    barContainer: {
      width: '30%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

export default GroupByScrollList;
