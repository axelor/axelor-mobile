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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  CustomerDeliveryCard,
  PartnerSearchBar,
  StockLocationSearchBar,
} from '../../components';
import {searchDeliveries} from '../../features/customerDeliverySlice';
import {displayStockMoveSeq} from '../../utils/displayers';

const stockLocationScanKey = 'stock-location_customer-delivery-list';

const CustomerDeliveryListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loadingList, moreLoading, isListEnd, deliveryList} = useSelector(
    state => state.customerDelivery,
  );
  const {user} = useSelector(state => state.user);

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

  const statusList = useMemo(() => {
    const statusToDisplay = [
      StockMove?.statusSelect.Planned,
      StockMove?.statusSelect.Realized,
    ];

    return getSelectionItems(StockMove?.statusSelect, selectedStatus).filter(
      ({value}) => statusToDisplay.includes(value),
    );
  }, [StockMove?.statusSelect, getSelectionItems, selectedStatus]);

  const sliceFunctionData = useMemo(
    () => ({
      fromStockLocationId: stockLocation?.id,
      partnerId: customer?.id,
      statusList: selectedStatus,
      companyId: user.activeCompany?.id,
    }),
    [customer?.id, selectedStatus, stockLocation?.id, user.activeCompany?.id],
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
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
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
              title="Stock_Customer"
            />
          </>
        }
        renderListItem={({item}) => (
          <CustomerDeliveryCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={item.statusSelect}
            date={
              item.statusSelect === StockMove?.statusSelect.Draft
                ? item.createdOn
                : item.statusSelect === StockMove?.statusSelect.Planned
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
