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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  HalfLabelCard,
  Screen,
  ScrollView,
  HeaderContainer,
  ViewAllContainer,
  useThemeColor,
  Text,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {fetchProductWithId, ProductCardInfo} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  OperationOrderCard,
  ManufacturingOrderIconButtonList,
  ManufacturingOrderOrderSetList,
} from '../../components/organisms';
import {
  fetchLinkedManufOrders,
  fetchManufOrder,
  updateStatusOfManufOrder,
} from '../../features/manufacturingOrderSlice';
import {fetchOperationOrders} from '../../features/operationOrderSlice';

const ManufacturingOrderDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {operationOrderList} = useSelector(state => state.operationOrder);
  const {productFromId: product} = useSelector(state => state.product);
  const {loadingOrder, manufOrder, linkedManufOrders} = useSelector(
    state => state.manufacturingOrder,
  );

  useEffect(() => {
    if (manufOrder?.product != null) {
      dispatch(fetchProductWithId(manufOrder.product.id));
    }
  }, [manufOrder, dispatch]);

  useEffect(() => {
    dispatch(
      fetchManufOrder({manufOrderId: route.params.manufacturingOrderId}),
    );
    dispatch(
      fetchOperationOrders({manufOrderId: route.params.manufacturingOrderId}),
    );
  }, [dispatch, route.params.manufacturingOrderId]);

  useEffect(() => {
    if (manufOrder != null) {
      dispatch(
        fetchLinkedManufOrders({
          productionOrderList: manufOrder.productionOrderSet,
        }),
      );
    }
  }, [dispatch, manufOrder]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleViewSaleOrderRefs = () => {
    navigation.navigate('ManufacturingOrderListSaleOrderScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleViewProductionOrderRefs = () => {
    navigation.navigate('ManufacturingOrderListProductionOrderScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleViewAll = () => {
    navigation.navigate('ManufacturingOrderOperationListScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleShowLine = item => {
    navigation.navigate('OperationOrderDetailsScreen', {
      operationOrderId: item.id,
    });
  };

  const handleShowConsumedProduct = () => {
    navigation.navigate('ConsumedProductListScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleShowProducedProduct = () => {
    navigation.navigate('ProducedProductListScreen', {
      manufOrder: manufOrder,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.production.db.ManufOrder"
          modelId={manufOrder?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, manufOrder]);

  const handleUpdateStatus = useCallback(
    targetStatus => {
      dispatch(
        updateStatusOfManufOrder({
          manufOrderId: manufOrder.id,
          manufOrderVersion: manufOrder.version,
          targetStatus,
        }),
      );
    },
    [dispatch, manufOrder],
  );

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <ManufacturingOrderIconButtonList
          statusSelect={manufOrder.statusSelect}
          onPress={handleUpdateStatus}
        />
      }
      loading={loadingOrder}>
      <HeaderContainer
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
        expandableFilter={false}
      />
      <ScrollView>
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={product?.picture}
          code={product?.code}
          name={product?.name}
        />
        <ManufacturingOrderOrderSetList
          manufOrder={manufOrder}
          linkedManufOrders={linkedManufOrders}
          onPressSaleOrder={handleViewSaleOrderRefs}
          onPressViewProduction={handleViewProductionOrderRefs}
        />
        <View style={styles.cardsContainer}>
          <HalfLabelCard
            iconName="dolly"
            title={I18n.t('Manufacturing_ConsumedProduct')}
            onPress={handleShowConsumedProduct}
          />
          <HalfLabelCard
            iconName="cogs"
            title={I18n.t('Manufacturing_ProducedProduct')}
            onPress={handleShowProducedProduct}
          />
        </View>
        {operationOrderList != null && operationOrderList?.length > 0 && (
          <ViewAllContainer
            onViewPress={handleViewAll}
            data={operationOrderList}
            renderFirstTwoItems={item => (
              <OperationOrderCard
                style={styles.item}
                status={item?.statusSelect}
                operationName={item?.operationName}
                workcenter={item?.workCenter.name}
                plannedDuration={item?.plannedDuration}
                priority={item?.priority}
                onPress={() => handleShowLine(item)}
              />
            )}
          />
        )}
        <NotesCard
          title={I18n.t('Manufacturing_Notes')}
          data={manufOrder.note}
        />
        <NotesCard
          title={I18n.t('Manufacturing_Notes')}
          data={manufOrder.moCommentFromSaleOrder}
        />
        <NotesCard
          title={I18n.t('Manufacturing_Notes')}
          data={manufOrder.moCommentFromSaleOrderLine}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  orderClientContainer: {
    marginHorizontal: 12,
    flexDirection: 'column',
  },
  orderSetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  orderBadge: {
    paddingHorizontal: 10,
    width: null,
  },
  orderTitle: {
    marginHorizontal: 8,
  },
});

export default ManufacturingOrderDetailsScreen;
