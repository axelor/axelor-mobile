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

import React, {useCallback, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  checkNullString,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {InternalMoveLineCard, StockMoveHeader} from '../../components';
import {fetchInternalMoveLines} from '../../features/internalMoveLineSlice';
import StockMove from '../../types/stock-move';
import {showLine} from '../../utils/line-navigation';
import {displayLine} from '../../utils/displayers';

const scanKey = 'trackingNumber-or-product_internal-move-line-list';

const InternalMoveLineListScreen = ({route, navigation}) => {
  const internalMove = route.params.internalMove;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingIMLines, moreLoading, isListEnd, internalMoveLineList} =
    useSelector(state => state.internalMoveLine);

  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = (item, skipVerification = false) => {
    showLine({
      item: {name: 'internalMove', data: internalMove},
      itemLine: {name: 'internalMoveLine', data: item},
      lineDetailsScreen: 'InternalMoveLineDetailsScreen',
      selectTrackingScreen: 'InternalMoveSelectTrackingScreen',
      selectProductScreen: 'InternalMoveSelectProductScreen',
      skipVerification,
      productKey: 'stockProduct',
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchInternalLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (!checkNullString(searchValue)) {
        setFilter(searchValue);
        dispatch(
          fetchInternalMoveLines({
            internalMoveId: internalMove.id,
            searchValue: searchValue,
            page: 0,
          }),
        );
      } else {
        dispatch(
          fetchInternalMoveLines({
            internalMoveId: internalMove.id,
            page: page,
          }),
        );
      }
    },
    [dispatch, internalMove.id],
  );

  const filterLinesAPI = useCallback(
    value => fetchInternalLinesAPI({searchValue: value}),
    [fetchInternalLinesAPI],
  );
  const scrollLinesAPI = useCallback(
    page => fetchInternalLinesAPI({page}),
    [fetchInternalLinesAPI],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === 'doneStatus') {
            return parseFloat(item.realQty) >= parseFloat(item.qty);
          } else if (selectedStatus[0].key === 'unDoneStatus') {
            return (
              parseFloat(item.realQty) == null ||
              parseFloat(item.realQty) < parseFloat(item.qty)
            );
          } else {
            return item;
          }
        });
      } else {
        return list;
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(internalMoveLineList),
    [filterOnStatus, internalMoveLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={
              internalMove.statusSelect === StockMove.status.Draft
                ? internalMove.createdOn
                : internalMove.statusSelect === StockMove.status.Planned
                ? internalMove.estimatedDate
                : internalMove.realDate
            }
            availability={internalMove.availableStatusSelect}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Stock_Done'),
                color: Colors.primaryColor,
                key: 'doneStatus',
              },
              {
                title: I18n.t('Stock_NotDone'),
                color: Colors.cautionColor,
                key: 'unDoneStatus',
              },
            ]}
          />
        }>
        <ScannerAutocompleteSearch
          objectList={filteredList}
          onChangeValue={handleLineSearch}
          fetchData={filterLinesAPI}
          displayValue={displayLine}
          scanKeySearch={scanKey}
          placeholder={I18n.t('Stock_SearchLine')}
          isFocus={true}
          oneFilter={true}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingIMLines}
        data={filteredList}
        renderItem={({item}) => (
          <InternalMoveLineCard
            style={styles.item}
            productName={item.product?.fullName}
            internalMoveStatus={internalMove.statusSelect}
            availability={
              item.availableStatusSelect == null
                ? null
                : item.availableStatusSelect
            }
            trackingNumber={item.trackingNumber?.trackingNumberSeq}
            expectedQty={item.qty}
            movedQty={item.realQty}
            onPress={() => handleShowLine(item)}
          />
        )}
        fetchData={scrollLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={filter != null && filter !== ''}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default InternalMoveLineListScreen;
