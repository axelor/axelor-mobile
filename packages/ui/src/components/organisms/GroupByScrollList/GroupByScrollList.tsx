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

import React, {ReactElement} from 'react';
import TopSeparator, {TopIndicator, TopSeparatorProps} from './TopSeparator';
import BottomSeparator, {
  BottomIndicator,
  BottomSeparatorProps,
} from './BottomSeparator';
import ScrollList from '../ScrollList/ScrollList';

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
  fetchTopIndicator?: (currentItem: any) => TopIndicator;
  customTopSeparator?: ReactElement<TopSeparatorProps>;
  fetchBottomIndicator?: (prevItem: any) => BottomIndicator;
  customBottomSeparator?: ReactElement<BottomSeparatorProps>;
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
}: GroupByScrollListProps) => {
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

    if (index === 0 || separatorCondition(prevItem, item)) {
      const isFirstItem = prevItem == null;
      const topIndicator = fetchTopIndicator?.(item);
      const bottomIndicator = !isFirstItem
        ? fetchBottomIndicator?.(prevItem)
        : null;

      return (
        <>
          {bottomIndicator &&
            renderSeparator(
              customBottomSeparator,
              BottomSeparator,
              bottomIndicator,
            )}
          {topIndicator &&
            renderSeparator(customTopSeparator, TopSeparator, {
              ...topIndicator,
              isFirstItem: isFirstItem,
            })}
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

export default GroupByScrollList;
