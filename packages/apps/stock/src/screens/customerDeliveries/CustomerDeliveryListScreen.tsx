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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {searchDeliveries} from '../../features/customerDeliverySlice';
import {displayStockMoveSeq} from '../../utils';
import {
  CustomerDeliveryCard,
  PartnerSearchBar,
  StockLocationSearchBar,
} from '../../components';

const stockLocationScanKey = 'stock-location_customer-delivery-list';
const scanKey = 'stock-move_customer-delivery-list';

const CustomerDeliveryListScreen = ({navigation}: any) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loadingList, moreLoading, isListEnd, deliveryList} = useSelector(
    state => state.customerDelivery,
  );
  const {user} = useSelector(state => state.user);

  const [stockLocation, setStockLocation] = useState<any>();
  const [customer, setCustomer] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [navigate, setNavigate] = useState(false);

  const navigateToCustomerDelivery = (_item: any) => {
    if (_item != null) {
      setNavigate(current => !current);
      navigation.navigate('CustomerDeliveryDetailScreen', {
        customerDeliveryId: _item?.id,
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
    <Screen removeSpaceOnTop>
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
        scanKeySearch={scanKey}
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
            {...item}
            onPress={() => navigateToCustomerDelivery(item)}
          />
        )}
      />
    </Screen>
  );
};

export default CustomerDeliveryListScreen;
