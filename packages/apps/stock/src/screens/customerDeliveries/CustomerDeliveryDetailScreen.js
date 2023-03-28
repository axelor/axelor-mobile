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

import React, {useEffect} from 'react';
import {
  Screen,
  ScrollView,
  HeaderContainer,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  CustomerDeliveryHeader,
  CustomerDeliveryViewAllContainer,
  CustomerDeliveryMovementIndicationCard,
  CustomerDeliveryRealizeButton,
} from '../../components';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import {getRacks} from '../../features/racksListSlice';

const CustomerDeliveryDetailScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {customerDeliveryLineList} = useSelector(
    state => state.customerDeliveryLine,
  );

  useEffect(() => {
    if (customerDelivery != null) {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: customerDelivery.id,
          page: 0,
        }),
      );
    }
  }, [customerDelivery, dispatch]);

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: customerDelivery?.fromStockLocation?.id,
        LineList: customerDeliveryLineList,
      }),
    );
  }, [
    dispatch,
    customerDeliveryLineList,
    customerDelivery?.fromStockLocation?.id,
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.StockMove"
          modelId={customerDelivery?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, customerDelivery]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryRealizeButton
          customerDelivery={customerDelivery}
          navigation={navigation}
        />
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
        <CustomerDeliveryViewAllContainer
          customerDelivery={customerDelivery}
          navigation={navigation}
        />
        <NotesCard
          title={I18n.t('Stock_NotesClient')}
          data={customerDelivery.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_DeliveryCondition')}
          data={customerDelivery.deliveryCondition}
        />
      </ScrollView>
    </Screen>
  );
};

export default CustomerDeliveryDetailScreen;
