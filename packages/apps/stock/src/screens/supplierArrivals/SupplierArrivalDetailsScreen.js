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
  HeaderContainer,
  Icon,
  MovementIndicationCard,
  PopUpOneButton,
  Screen,
  ScrollView,
  useThemeColor,
  ViewAllContainer,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  SupplierArrivalLineCard,
  SupplierArrivalDetailsHeader,
} from '../../components';
import {fetchSupplierArrivalLines} from '../../features/supplierArrivalLineSlice';
import {getRacks} from '../../features/racksListSlice';
import {realizeSupplierArrival} from '../../features/supplierArrivalSlice';
import StockMove from '../../types/stock-move';
import {showLine} from '../../utils/line-navigation';

const SupplierArrivalDetailsScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const {loadingSALines, supplierArrivalLineList} = useSelector(
    state => state.supplierArrivalLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {mobileSettings} = useSelector(state => state.config);
  const [isPopupVisible, setVisiblePopup] = useState(false);
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  useEffect(() => {
    if (supplierArrival != null) {
      dispatch(
        fetchSupplierArrivalLines({
          supplierArrivalId: supplierArrival.id,
          page: 0,
        }),
      );
    }
  }, [dispatch, supplierArrival]);
  useEffect(() => {
    dispatch(
      getRacks({
        stockId: supplierArrival?.toStockLocation?.id,
        LineList: supplierArrivalLineList,
      }),
    );
  }, [dispatch, supplierArrival?.toStockLocation?.id, supplierArrivalLineList]);

  const handleViewAll = () => {
    navigation.navigate('SupplierArrivalLineListScreen', {
      supplierArrival: supplierArrival,
    });
  };

  const handleShowLine = item => {
    showLine({
      item: {name: 'supplierArrival', data: supplierArrival},
      itemLine: {name: 'supplierArrivalLine', data: item},
      lineDetailsScreen: 'SupplierArrivalLineDetailScreen',
      selectTrackingScreen: 'SupplierArrivalSelectTrackingScreen',
      selectProductScreen: 'SupplierArrivalSelectProductScreen',
      navigation,
    });
  };

  const handleRealize = () => {
    dispatch(
      realizeSupplierArrival({
        version: supplierArrival.version,
        stockMoveId: supplierArrival.id,
      }),
    );
    navigation.popToTop();
  };

  const handleNewLine = () => {
    navigation.navigate('SupplierArrivalSelectProductScreen', {
      supplierArrival: supplierArrival,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.StockMove"
          modelId={supplierArrival?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, supplierArrival]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        supplierArrival.statusSelect !== StockMove.status.Realized && (
          <Button onPress={handleRealize} title={I18n.t('Base_Realize')} />
        )
      }
      loading={loadingSALines}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <SupplierArrivalDetailsHeader supplierArrival={supplierArrival} />
        }
      />
      <ScrollView>
        <MovementIndicationCard
          titleTop={supplierArrival.fromAddress?.fullName}
          iconTop={<Icon name="map-marker-alt" />}
          titleDown={supplierArrival.toStockLocation?.name}
          iconDown={
            <Icon name="warehouse" color={Colors.primaryColor.background} />
          }
          disabledTop={false}
          onPressTitleTop={() => setVisiblePopup(true)}
        />
        <ViewAllContainer
          isHeaderExist={
            supplierArrival.statusSelect !== StockMove.status.Realized
          }
          onNewIcon={handleNewLine}
          data={supplierArrivalLineList}
          renderFirstTwoItems={(item, index) => (
            <SupplierArrivalLineCard
              style={styles.item}
              productName={item.product?.fullName}
              deliveredQty={item?.realQty}
              askedQty={item.qty}
              trackingNumber={item?.trackingNumber}
              locker={
                !loadingRacks && racksList != null && racksList[index] != null
                  ? racksList[index][0]?.rack
                  : ''
              }
              onPress={() => handleShowLine(item)}
            />
          )}
          onViewPress={handleViewAll}
        />
      </ScrollView>
      <PopUpOneButton
        title={I18n.t('Stock_OriginalAdress')}
        visible={isPopupVisible}
        data={supplierArrival.fromAddress?.fullName}
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

export default SupplierArrivalDetailsScreen;
