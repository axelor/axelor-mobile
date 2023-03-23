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

import React, {useEffect, useState} from 'react';
import {
  Button,
  PopUpOneButton,
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
  CustomerDeliveryDetailHeader,
  CustomerDeliveryDetailViewAllContainer,
} from '../../components';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import {getRacks} from '../../features/racksListSlice';
import {realizeCustomerDelivery} from '../../features/customerDeliverySlice';
import StockMove from '../../types/stock-move';
import CustomerDeliveryDetailMovementIndicationCard from '../../components/templates/CustomerDeliveryDetailMovementIndicationCard/CustomerDeliveryDetailMovementIndicationCard';

const CustomerDeliveryDetailScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const {loadingCDLines, customerDeliveryLineList} = useSelector(
    state => state.customerDeliveryLine,
  );
  const {mobileSettings} = useSelector(state => state.config);
  const [isPopupVisible, setVisiblePopup] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

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

  const handleRealize = () => {
    dispatch(
      realizeCustomerDelivery({
        version: customerDelivery.version,
        stockMoveId: customerDelivery.id,
      }),
    );
    navigation.popToTop();
  };

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
        customerDelivery.statusSelect !== StockMove.status.Realized && (
          <Button onPress={handleRealize} title={I18n.t('Base_Realize')} />
        )
      }
      loading={loadingCDLines}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <CustomerDeliveryDetailHeader customerDelivery={customerDelivery} />
        }
      />
      <ScrollView>
        <CustomerDeliveryDetailMovementIndicationCard
          customerDelivery={customerDelivery}
          setVisiblePopup={setVisiblePopup}
        />
        <CustomerDeliveryDetailViewAllContainer
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
      <PopUpOneButton
        title={I18n.t('Stock_DestinationAdress')}
        data={
          customerDelivery.toAddress?.fullName || customerDelivery.toAddressStr
        }
        visible={isPopupVisible}
        btnTitle={I18n.t('Base_OK')}
        onPress={() => setVisiblePopup(false)}
      />
    </Screen>
  );
};

export default CustomerDeliveryDetailScreen;
