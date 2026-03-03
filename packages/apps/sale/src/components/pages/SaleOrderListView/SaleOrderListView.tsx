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

import React, {useEffect, useMemo, useState} from 'react';
import {
  filterChip,
  SearchListView,
  useNavigation,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {ChipSelect} from '@axelor/aos-mobile-ui';
import {CustomerSearchBar} from '../../organisms';
import {SaleOrderCard} from '../../atoms';
import {fetchSaleOrder} from '../../../features/saleOrderSlice';

interface SaleOrderListViewProps {
  statusList: number[];
  customer?: any;
}

const SaleOrderListView = ({
  statusList,
  customer: _customer,
}: SaleOrderListViewProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {SaleOrder} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {user} = useSelector(state => state.user);
  const {loading, moreLoading, isListEnd, saleOrderList} = useSelector(
    (state: any) => state.sale_saleOrder,
  );

  const [filteredList, setFilteredList] = useState(saleOrderList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [customer, setCustomer] = useState(_customer);

  useEffect(
    () =>
      setFilteredList(
        filterChip(saleOrderList, selectedStatus, 'statusSelect'),
      ),
    [saleOrderList, selectedStatus],
  );

  const saleOrderStatusList = useMemo(
    () =>
      getSelectionItems(SaleOrder?.statusSelect, selectedStatus).filter(
        ({value}) => statusList.includes(value as number),
      ),
    [SaleOrder?.statusSelect, getSelectionItems, selectedStatus, statusList],
  );

  const sliceFunctionData = useMemo(
    () => ({
      statusList: statusList,
      customerId: customer?.id,
      companyId: user.activeCompany?.id,
    }),
    [customer?.id, statusList, user.activeCompany?.id],
  );

  return (
    <SearchListView
      list={filteredList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={fetchSaleOrder}
      sliceFunctionData={sliceFunctionData}
      searchPlaceholder={I18n.t('Base_Search')}
      fixedItems={
        <CustomerSearchBar defaultValue={customer} onChange={setCustomer} />
      }
      chipComponent={
        <ChipSelect
          mode="switch"
          onChangeValue={setSelectedStatus}
          selectionItems={saleOrderStatusList}
        />
      }
      expandableFilter={false}
      renderListItem={({item}) => (
        <SaleOrderCard
          statusSelect={item.statusSelect}
          sequence={item.saleOrderSeq}
          orderBeingEdited={item.orderBeingEdited}
          externalReference={item.externalReference}
          clientPartnerName={item.clientPartner?.fullName}
          companyName={item.company?.name}
          tradingName={item.tradingName?.name}
          orderDate={item.orderDate}
          WTPrice={item.exTaxTotal}
          ATIPrice={item.inTaxTotal}
          currency={item.currency}
          deliveryState={item.deliveryState}
          invoicingState={item.invoicingState}
          onPress={() =>
            navigation.navigate('SaleOrderDetailsScreen', {
              saleOrderId: item.id,
            })
          }
        />
      )}
    />
  );
};

export default SaleOrderListView;
