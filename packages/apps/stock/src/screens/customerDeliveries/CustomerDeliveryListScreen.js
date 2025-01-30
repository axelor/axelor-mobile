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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AutoCompleteSearch,
  ChipSelect,
  Screen,
  HeaderContainer,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {
  CustomerDeliveryCard,
  PartnerSearchBar,
  StockLocationSearchBar,
} from '../../components';
import {searchDeliveries} from '../../features/customerDeliverySlice';
import {displayStockMoveSeq} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const stockLocationScanKey = 'stock-location_customer-delivery-list';

const CustomerDeliveryListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, deliveryList} = useSelector(
    state => state.customerDelivery,
  );

  const [stockLocation, setStockLocation] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [navigate, setNavigate] = useState(false);

  const filterOnStatus = useCallback(
    list => filterChip(list, selectedStatus, 'statusSelect'),
    [selectedStatus],
  );

  const filteredList = useMemo(
    () =>
      filterOnStatus(
        filterList(
          filterList(
            deliveryList,
            'fromStockLocation',
            'id',
            stockLocation?.id ?? '',
          ),
          'partner',
          'id',
          customer?.id ?? '',
        ),
      ),
    [filterOnStatus, stockLocation, deliveryList, customer],
  );

  const navigateToCustomerDelivery = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('CustomerDeliveryDetailScreen', {
        customerDeliveryId: item?.id,
      });
    }
  };

  const fetchDeliveriesAPI = useCallback(
    page => {
      dispatch(
        searchDeliveries({
          searchValue: filter,
          page: page,
        }),
      );
    },
    [dispatch, filter],
  );

  const handleRefChange = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      dispatch(
        searchDeliveries({
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <AutoCompleteSearch
            objectList={deliveryList}
            onChangeValue={item => navigateToCustomerDelivery(item)}
            fetchData={handleRefChange}
            displayValue={displayStockMoveSeq}
            placeholder={I18n.t('Stock_Ref')}
            oneFilter={true}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Stock_Status_Planned'),
                color: StockMove.getStatusColor(
                  StockMove.status.Planned,
                  Colors,
                ),
                key: StockMove.status.Planned,
              },
              {
                title: I18n.t('Stock_Status_Realized'),
                color: StockMove.getStatusColor(
                  StockMove.status.Realized,
                  Colors,
                ),
                key: StockMove.status.Realized,
              },
            ]}
          />
        }>
        <StockLocationSearchBar
          scanKey={stockLocationScanKey}
          placeholderKey="Stock_StockLocation"
          defaultValue={stockLocation}
          onChange={setStockLocation}
        />
        <PartnerSearchBar
          defaultValue={customer}
          onChange={setCustomer}
          placeholderKey="Stock_Customer"
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <CustomerDeliveryCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={item.statusSelect}
            date={
              item.statusSelect === StockMove.status.Draft
                ? item.createdOn
                : item.statusSelect === StockMove.status.Planned
                ? item.estimatedDate
                : item.realDate
            }
            origin={item.origin}
            style={styles.item}
            availability={item.availableStatusSelect}
            onPress={() => navigateToCustomerDelivery(item)}
          />
        )}
        fetchData={fetchDeliveriesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
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

export default CustomerDeliveryListScreen;
