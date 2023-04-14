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
import {Dimensions, StyleSheet} from 'react-native';
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

const DONE_STATUS_KEY = 'done';
const PARTIALLY_DONE_STATUS_KEY = 'partially_done';
const NOT_DONE_STATUS_KEY = 'not_done';

const getitemStatus = item => {
  const _realQty = parseFloat(item.realQty);
  const _qty = parseFloat(item.qty);

  if (
    item.isRealQtyModifiedByUser === false ||
    _realQty == null ||
    _realQty === 0
  ) {
    return NOT_DONE_STATUS_KEY;
  }

  if (_realQty < _qty) {
    return PARTIALLY_DONE_STATUS_KEY;
  }

  return DONE_STATUS_KEY;
};

const SupplierArrivalLineListScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {supplierArrivalLineList} = useSupplierLinesWithRacks(supplierArrival);
  const {loadingSALines, moreLoading, isListEnd} = useSelector(
    state => state.supplierArrivalLine,
  );

  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = (
    item,
    skipVerification = !mobileSettings?.isVerifySupplierArrivalLineEnabled,
  ) => {
    showLine({
      item: {name: 'supplierArrival', data: supplierArrival},
      itemLine: {name: 'supplierArrivalLine', data: item},
      lineDetailsScreen: 'SupplierArrivalLineDetailScreen',
      selectTrackingScreen: 'SupplierArrivalSelectTrackingScreen',
      selectProductScreen: 'SupplierArrivalSelectProductScreen',
      skipTrackingNumberVerification: true,
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
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      }

      if (!Array.isArray(selectedStatus) || selectedStatus.length === 0) {
        return list;
      }

      return list.filter(item => {
        return selectedStatus.find(
          _status => _status?.key === getitemStatus(item),
        );
      });
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
              supplierArrival
                ? StockMove.getStockMoveDate(
                    supplierArrival.statusSelect,
                    supplierArrival,
                  )
                : null
            }
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            marginHorizontal={3}
            width={Dimensions.get('window').width * 0.3}
            selectionItems={[
              {
                title: I18n.t('Stock_Done'),
                color: Colors.primaryColor,
                key: DONE_STATUS_KEY,
              },
              {
                title: I18n.t('Stock_PartiallyDone'),
                color: Colors.cautionColor,
                key: PARTIALLY_DONE_STATUS_KEY,
              },
              {
                title: I18n.t('Stock_NotDone'),
                color: Colors.secondaryColor,
                key: NOT_DONE_STATUS_KEY,
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
