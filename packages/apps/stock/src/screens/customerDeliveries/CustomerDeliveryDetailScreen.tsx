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

import React, {useCallback, useEffect} from 'react';
import {
  Screen,
  KeyboardAvoidingScrollView,
  HeaderContainer,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {fetchCustomerDelivery} from '../../features/customerDeliverySlice';
import {
  CustomerDeliveryHeader,
  CustomerDeliverySearchLineContainer,
  CustomerDeliveryRealizeButton,
  CustomerDeliveryDropdownCard,
} from '../../components';

const CustomerDeliveryDetailScreen = ({route}: any) => {
  const {customerDeliveryId} = route?.params ?? {};
  const dispatch = useDispatch();
  useContextRegister({
    models: [
      {model: 'com.axelor.apps.stock.db.StockMove', id: customerDeliveryId},
    ],
  });

  const {loading, customerDelivery} = useSelector(
    state => state.customerDelivery,
  );

  const getCustomerDelivery = useCallback(() => {
    dispatch((fetchCustomerDelivery as any)({customerDeliveryId}));
  }, [customerDeliveryId, dispatch]);

  useEffect(() => {
    getCustomerDelivery();
  }, [getCustomerDelivery]);

  if (customerDelivery?.id !== customerDeliveryId) return null;

  return (
    <Screen
      fixedItems={
        <CustomerDeliveryRealizeButton customerDelivery={customerDelivery} />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <CustomerDeliveryHeader customerDelivery={customerDelivery} />
        }
      />
      <KeyboardAvoidingScrollView
        refresh={{loading, fetcher: getCustomerDelivery}}>
        <CustomerDeliveryDropdownCard />
        <CustomerDeliverySearchLineContainer />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default CustomerDeliveryDetailScreen;
