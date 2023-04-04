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
import {SupplierArrivalLineCard, StockMoveHeader} from '../../components';
import {fetchSupplierArrivalLines} from '../../features/supplierArrivalLineSlice';
import StockMove from '../../types/stock-move';
import {showLine} from '../../utils/line-navigation';
import {useSupplierLinesWithRacks} from '../../hooks';
import {displayLine} from '../../utils/displayers';

const scanKey = 'trackingNumber-or-product_supplier-arrival-line-list';

const SupplierArrivalLineListScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {supplierArrivalLineList} = useSupplierLinesWithRacks(supplierArrival);
  const {loadingSALines, moreLoading, isListEnd} = useSelector(
    state => state.supplierArrivalLine,
  );

  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = (item, skipVerification = false) => {
    showLine({
      item: {name: 'supplierArrival', data: supplierArrival},
      itemLine: {name: 'supplierArrivalLine', data: item},
      lineDetailsScreen: 'SupplierArrivalLineDetailScreen',
      selectTrackingScreen: 'SupplierArrivalSelectTrackingScreen',
      selectProductScreen: 'SupplierArrivalSelectProductScreen',
      skipVerification,
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchSupplierLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (!checkNullString(searchValue)) {
        setFilter(searchValue);
        dispatch(
          fetchSupplierArrivalLines({
            supplierArrivalId: supplierArrival.id,
            searchValue: searchValue,
            page: 0,
          }),
        );
      } else {
        dispatch(
          fetchSupplierArrivalLines({
            supplierArrivalId: supplierArrival.id,
            page: page,
          }),
        );
      }
    },
    [dispatch, supplierArrival.id],
  );

  const filterLinesAPI = useCallback(
    value => fetchSupplierLinesAPI({searchValue: value}),
    [fetchSupplierLinesAPI],
  );
  const scrollLinesAPI = useCallback(
    page => fetchSupplierLinesAPI({page}),
    [fetchSupplierLinesAPI],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === 'doneStatus') {
            return (
              item.isRealQtyModifiedByUser !== false &&
              parseFloat(item.realQty) >= parseFloat(item.qty)
            );
          } else if (selectedStatus[0].key === 'unDoneStatus') {
            return (
              item.isRealQtyModifiedByUser === false ||
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
    () => filterOnStatus(supplierArrivalLineList),
    [filterOnStatus, supplierArrivalLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            date={
              supplierArrival.statusSelect === StockMove.status.Draft
                ? supplierArrival.createdOn
                : supplierArrival.statusSelect === StockMove.status.Planned
                ? supplierArrival.estimatedDate
                : supplierArrival.realDate
            }
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
        loadingList={loadingSALines}
        data={filteredList}
        renderItem={({item}) => (
          <SupplierArrivalLineCard
            style={styles.item}
            productName={item.product?.fullName}
            deliveredQty={
              item.isRealQtyModifiedByUser === false ? 0 : item.realQty
            }
            askedQty={item?.qty}
            trackingNumber={item?.trackingNumber}
            locker={item?.locker}
            onPress={() => {
              handleShowLine(item);
            }}
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
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export default SupplierArrivalLineListScreen;
