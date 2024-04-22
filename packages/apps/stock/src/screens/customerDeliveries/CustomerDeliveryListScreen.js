/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
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

  const {loadingList, moreLoading, isListEnd, deliveryList} = useSelector(
    state => state.customerDelivery,
  );

  const [stockLocation, setStockLocation] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [navigate, setNavigate] = useState(false);

  const navigateToCustomerDelivery = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('CustomerDeliveryDetailScreen', {
        customerDeliveryId: item?.id,
      });
    }
  };

  const sliceFunctionData = useMemo(
    () => ({
      fromStockLocationId: stockLocation?.id,
      partnerId: customer?.id,
      statusList: selectedStatus,
    }),
    [customer?.id, selectedStatus, stockLocation?.id],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={deliveryList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchDeliveries}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={navigateToCustomerDelivery}
        displaySearchValue={displayStockMoveSeq}
        searchPlaceholder={I18n.t('Stock_Ref')}
        searchNavigate={navigate}
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
        }
        headerChildren={
          <>
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
          </>
        }
        renderListItem={({item}) => (
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
            availability={item.availableStatusSelect}
            onPress={() => navigateToCustomerDelivery(item)}
          />
        )}
      />
    </Screen>
  );
};

export default CustomerDeliveryListScreen;
