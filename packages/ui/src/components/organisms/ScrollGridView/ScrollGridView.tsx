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

import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import GridView, {Column} from '../GridView/GridView';
import {Text} from '../../atoms';

const LOADING_DELAY_MS = 1500;

interface ScrollGridViewProps {
  style?: any;
  loadingList: boolean;
  columns: Column[];
  data: any[];
  fetchData: (page: number) => void;
  moreLoading: boolean;
  isListEnd: boolean;
  translator?: (key: string) => string;
  onRowPress?: (row: any) => void;
}

const ScrollGridView = ({
  style,
  loadingList,
  columns,
  data,
  fetchData,
  moreLoading,
  isListEnd,
  translator = t => t,
  onRowPress,
}: ScrollGridViewProps) => {
  const [, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const initialize = useCallback(() => {
    setPage(0);
    fetchData(0);
  }, [fetchData]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleMoreData = useCallback(() => {
    if (!isListEnd && !moreLoading) {
      setPage(current => {
        const next = current + 1;
        fetchData(next);
        return next;
      });
    }
  }, [fetchData, isListEnd, moreLoading]);

  useEffect(() => {
    if (
      !loadingList &&
      !moreLoading &&
      !isListEnd &&
      contentHeight > 0 &&
      layoutHeight > 0 &&
      contentHeight <= layoutHeight
    ) {
      handleMoreData();
    }
  }, [
    contentHeight,
    handleMoreData,
    isListEnd,
    layoutHeight,
    loadingList,
    moreLoading,
  ]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (loadingList && !moreLoading) {
      timer = setTimeout(() => setIsLoading(true), LOADING_DELAY_MS);
    } else {
      setIsLoading(false);
    }
    return () => clearTimeout(timer);
  }, [loadingList, moreLoading]);

  const handleScroll = useCallback(
    ({nativeEvent}: {nativeEvent: any}) => {
      const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - 20
      ) {
        handleMoreData();
      }
    },
    [handleMoreData],
  );

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <ScrollView
      style={style}
      contentContainerStyle={styles.scrollContent}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      onContentSizeChange={(_, h) => setContentHeight(h)}
      onLayout={e => setLayoutHeight(e.nativeEvent.layout.height)}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={initialize} />
      }>
      <GridView
        styleContainer={styles.gridContainer}
        columns={columns}
        data={data}
        transparent
        onRowPress={onRowPress}
        translator={translator}
      />
      <View style={styles.footer}>
        {moreLoading && <ActivityIndicator size="large" color="black" />}
        {isListEnd && (
          <Text writingType="details" fontSize={14}>
            {data?.length === 0
              ? translator('Base_NoData')
              : translator('Base_NoMoreItems')}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  gridContainer: {
    width: '100%',
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default ScrollGridView;
