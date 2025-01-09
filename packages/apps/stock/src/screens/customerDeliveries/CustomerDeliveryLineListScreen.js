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
import {CustomerDeliveryLineCard, StockMoveHeader} from '../../components';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import {StockMove, StockMoveLine} from '../../types';
import {showLine} from '../../utils/line-navigation';
import {useCustomerLinesWithRacks} from '../../hooks';
import {displayLine} from '../../utils/displayers';

const scanKey = 'trackingNumber-or-product_customer-delivery-line-list';

const CustomerDeliveryLineListScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {customerDeliveryLineList} =
    useCustomerLinesWithRacks(customerDelivery);
  const {loadingCDLines, moreLoading, isListEnd} = useSelector(
    state => state.customerDeliveryLine,
  );

  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = (
    item,
    skipVerification = !mobileSettings?.isVerifyCustomerDeliveryLineEnabled,
  ) => {
    showLine({
      item: {name: 'customerDelivery', data: customerDelivery},
      itemLine: {name: 'customerDeliveryLine', data: item},
      lineDetailsScreen: 'CustomerDeliveryLineDetailScreen',
      selectTrackingScreen: 'CustomerDeliverySelectTrackingScreen',
      selectProductScreen: 'CustomerDeliverySelectProductScreen',
      skipVerification,
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchDeliveryLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (!checkNullString(searchValue)) {
        setFilter(searchValue);
        dispatch(
          fetchCustomerDeliveryLines({
            customerDeliveryId: customerDelivery.id,
            searchValue: searchValue,
            page: 0,
          }),
        );
      } else {
        dispatch(
          fetchCustomerDeliveryLines({
            customerDeliveryId: customerDelivery.id,
            page: page,
          }),
        );
      }
    },
    [dispatch, customerDelivery.id],
  );

  const filterLinesAPI = useCallback(
    ({searchValue}) => fetchDeliveryLinesAPI({searchValue}),
    [fetchDeliveryLinesAPI],
  );

  const scrollLinesAPI = useCallback(
    page => fetchDeliveryLinesAPI({page}),
    [fetchDeliveryLinesAPI],
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
          _status =>
            _status?.key ===
            StockMoveLine.getStockMoveLineStatus(item, customerDelivery),
        );
      });
    },
    [customerDelivery, selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(customerDeliveryLineList),
    [filterOnStatus, customerDeliveryLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            date={
              customerDelivery
                ? StockMove.getStockMoveDate(
                    customerDelivery.statusSelect,
                    customerDelivery,
                  )
                : null
            }
            availability={customerDelivery.availableStatusSelect}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            marginHorizontal={3}
            width={Dimensions.get('window').width * 0.3}
            selectionItems={StockMoveLine.getStockMoveLineStatusItems(
              I18n,
              Colors,
            )}
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
        loadingList={loadingCDLines}
        data={filteredList}
        renderItem={({item}) => (
          <CustomerDeliveryLineCard
            style={styles.item}
            productName={item.product.fullName}
            stockLocationName={item.fromStockLocation?.name}
            pickedQty={
              StockMoveLine.hideLineQty(item, customerDelivery)
                ? 0
                : item.realQty
            }
            askedQty={item.qty}
            trackingNumber={item?.trackingNumber}
            locker={item.locker}
            availability={
              customerDelivery.statusSelect === StockMove.status.Realized
                ? null
                : item.availableStatusSelect
            }
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
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export default CustomerDeliveryLineListScreen;
