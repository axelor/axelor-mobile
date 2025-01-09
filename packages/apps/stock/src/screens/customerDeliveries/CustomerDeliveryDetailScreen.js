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

import React, {useEffect} from 'react';
import {
  Screen,
  ScrollView,
  HeaderContainer,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  CustomerDeliveryHeader,
  CustomerDeliverySearchLineContainer,
  CustomerDeliveryMovementIndicationCard,
  CustomerDeliveryRealizeButton,
} from '../../components';
import {fetchCustomerDelivery} from '../../features/customerDeliverySlice';

const CustomerDeliveryDetailScreen = ({route, navigation}) => {
  const customerDeliveryId = route.params.customerDeliveryId;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {customerDelivery} = useSelector(state => state.customerDelivery);

  useEffect(() => {
    dispatch(fetchCustomerDelivery({customerDeliveryId: customerDeliveryId}));
  }, [customerDeliveryId, dispatch]);

  if (customerDelivery?.id !== customerDeliveryId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryRealizeButton customerDelivery={customerDelivery} />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <CustomerDeliveryHeader customerDelivery={customerDelivery} />
        }
      />
      <ScrollView>
        <CustomerDeliveryMovementIndicationCard
          customerDelivery={customerDelivery}
        />
        <CustomerDeliverySearchLineContainer />
        <NotesCard
          title={I18n.t('Stock_NotesClient')}
          data={customerDelivery?.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_DeliveryCondition')}
          data={customerDelivery?.deliveryCondition}
        />
      </ScrollView>
    </Screen>
  );
};

export default CustomerDeliveryDetailScreen;
