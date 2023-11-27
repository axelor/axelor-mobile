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

import React from 'react';
import TopSeparator, {TopIndicator} from './TopSeparator';
import BottomSeparator, {BottomIndicator} from './BottomSeparator';
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
  fetchTopIndicator: (currentItem: any) => TopIndicator;
  fetchBottomIndicator: (prevItem: any) => BottomIndicator;
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
  fetchBottomIndicator,
}: GroupByScrollListProps) => {
  const _renderItem = ({item, index}) => {
    let prevItem = null;
    if (index !== 0) {
      prevItem = data[index - 1];
    }

    if (index === 0 || separatorCondition(prevItem, item)) {
      const topIndicator = fetchTopIndicator(item);
      const bottomIndicator = prevItem ? fetchBottomIndicator(prevItem) : null;
      const isFirstItem = prevItem ? false : true;
      return (
        <>
          {bottomIndicator && <BottomSeparator {...bottomIndicator} />}
          <TopSeparator {...topIndicator} isFirstItem={isFirstItem} />
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
