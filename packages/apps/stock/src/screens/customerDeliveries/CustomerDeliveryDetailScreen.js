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
import {StyleSheet} from 'react-native';
import {
  Button,
  PopUpOneButton,
  Screen,
  ScrollView,
  useThemeColor,
  ViewAllContainer,
  HeaderContainer,
  MovementIndicationCard,
  Icon,
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
  CustomerDeliveryLineCard,
} from '../../components';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import {getRacks} from '../../features/racksListSlice';
import {realizeCustomerDelivery} from '../../features/customerDeliverySlice';
import StockMove from '../../types/stock-move';
import {showLine} from '../../utils/line-navigation';

const CustomerDeliveryDetailScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const {loadingCDLines, customerDeliveryLineList} = useSelector(
    state => state.customerDeliveryLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {mobileSettings} = useSelector(state => state.config);
  const [isPopupVisible, setVisiblePopup] = useState(false);
  const I18n = useTranslator();
  const Colors = useThemeColor();
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

  const handleViewAll = () => {
    navigation.navigate('CustomerDeliveryLineListScreen', {
      customerDelivery: customerDelivery,
    });
  };

  const handleShowLine = (item, index) => {
    const locker = !loadingRacks && (racksList?.[index]?.[0]?.rack ?? '');

    const updatedItem = {
      ...item,
      locker,
    };

    showLine({
      item: {name: 'customerDelivery', data: customerDelivery},
      itemLine: {name: 'customerDeliveryLine', data: updatedItem},
      lineDetailsScreen: 'CustomerDeliveryLineDetailScreen',
      selectTrackingScreen: 'CustomerDeliverySelectTrackingScreen',
      selectProductScreen: 'CustomerDeliverySelectProductScreen',
      navigation,
    });
  };

  const handleRealize = () => {
    dispatch(
      realizeCustomerDelivery({
        version: customerDelivery.version,
        stockMoveId: customerDelivery.id,
      }),
    );
    navigation.popToTop();
  };

  const handleNewLine = () => {
    navigation.navigate('CustomerDeliverySelectProductScreen', {
      customerDelivery: customerDelivery,
    });
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
        <MovementIndicationCard
          titleTop={customerDelivery.fromStockLocation?.name}
          iconTop={
            <Icon name="warehouse" color={Colors.primaryColor.background} />
          }
          titleDown={
            customerDelivery.toAddress?.fullName ||
            customerDelivery.toAddressStr
          }
          iconDown={<Icon name="map-marker-alt" />}
          disabledDown={false}
          onPressTitleDown={() => setVisiblePopup(true)}
        />
        <ViewAllContainer
          isHeaderExist={
            customerDelivery.statusSelect !== StockMove.status.Realized
          }
          onNewIcon={handleNewLine}
          data={customerDeliveryLineList}
          renderFirstTwoItems={(item, index) => (
            <CustomerDeliveryLineCard
              style={styles.item}
              productName={item.product?.fullName}
              pickedQty={item?.realQty}
              askedQty={item?.qty}
              locker={
                !loadingRacks && racksList != null && racksList[index] != null
                  ? racksList[index][0]?.rack
                  : ''
              }
              availability={
                customerDelivery.statusSelect !== StockMove.status.Realized
                  ? item?.availableStatusSelect
                  : null
              }
              trackingNumber={item?.trackingNumber}
              onPress={() => handleShowLine(item, index)}
            />
          )}
          onViewPress={handleViewAll}
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

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default CustomerDeliveryDetailScreen;
