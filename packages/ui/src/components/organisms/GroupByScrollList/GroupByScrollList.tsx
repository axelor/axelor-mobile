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

import React, {ReactElement, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TopSeparator, {TopIndicator, TopSeparatorProps} from './TopSeparator';
import BottomSeparator, {
  BottomIndicator,
  BottomSeparatorProps,
} from './BottomSeparator';
import {ActionType, ScrollList} from '../ScrollList';

interface GroupByScrollListProps {
  style?: any;
  loadingList: boolean;
  data: any[];
  renderItem: (item: any) => any;
  fetchData: (fetchOptions?: any) => any[] | void;
  moreLoading: boolean;
  isListEnd: boolean;
  filter?: boolean;
  translator?: (translationKey: string) => string;
  horizontal?: boolean;
  disabledRefresh?: boolean;
  separatorCondition: (prevItem: any, currentItem: any) => boolean;
  fetchTopIndicator?: (currentItem: any) => TopIndicator;
  customTopSeparator?: ReactElement<TopSeparatorProps>;
  fetchBottomIndicator?: (prevItem: any) => BottomIndicator;
  customBottomSeparator?: ReactElement<BottomSeparatorProps>;
  actionList?: ActionType[];
  verticalActions?: boolean;
  displayStickyIndicator?: boolean;
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
  fetchTopIndicator,
  customTopSeparator,
  fetchBottomIndicator,
  customBottomSeparator,
  actionList,
  verticalActions,
  displayStickyIndicator = true,
}: GroupByScrollListProps) => {
  const [stickyIndicator, setStickyIndicator] = useState(null);

  const renderSeparator = (customSeparator, Separator, props) => {
    return customSeparator ? (
      React.cloneElement(customSeparator, {...props})
    ) : (
      <Separator {...props} />
    );
  };

  const _renderItem = ({item, index}) => {
    let prevItem = null;
    if (index !== 0) {
      prevItem = data[index - 1];
    }

    const isFirstItem = index === 0;
    const isLastItem = index === data.length - 1;
    const isSeparator = !isFirstItem && separatorCondition(prevItem, item);

    if (isFirstItem || isLastItem || isSeparator) {
      const topIndicator =
        isFirstItem || isSeparator ? fetchTopIndicator?.(item) : null;
      const bottomIndicator = isSeparator
        ? fetchBottomIndicator?.(prevItem)
        : null;
      const lastBottomIndicator = isLastItem
        ? fetchBottomIndicator?.(item)
        : null;

      return (
        <View testID="groupByScrollListItemContainer">
          {bottomIndicator &&
            renderSeparator(
              customBottomSeparator,
              BottomSeparator,
              bottomIndicator,
            )}
          {topIndicator &&
            (!isFirstItem || (isFirstItem && !displayStickyIndicator)) &&
            renderSeparator(customTopSeparator, TopSeparator, {
              ...topIndicator,
              isFirstItem: isFirstItem,
            })}
          {renderItem({item, index})}
          {lastBottomIndicator &&
            renderSeparator(
              customBottomSeparator,
              BottomSeparator,
              lastBottomIndicator,
            )}
        </View>
      );
    }

    return (
      <View testID="groupByScrollListItemContainer">
        {renderItem({item, index})}
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const firstItem = viewableItems[0];
      setStickyIndicator(fetchTopIndicator?.(firstItem.item));
    }
  });

  return (
    <View style={styles.container}>
      <View>
        {displayStickyIndicator &&
          stickyIndicator &&
          renderSeparator(customTopSeparator, TopSeparator, stickyIndicator)}
      </View>
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
        actionList={actionList}
        verticalActions={verticalActions}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GroupByScrollList;
