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
import {StyleSheet} from 'react-native';
import {
  Screen,
  ScrollView,
  HeaderContainer,
  ViewAllContainer,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchProductWithId, ProductCardInfo} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  OperationOrderCard,
  ManufacturingOrderIconButtonList,
  ManufacturingOrderProductionOrderSetView,
  ManufacturingOrderSaleOrderSetView,
  ManufacturingOrderHalfLabelCardList,
  ManufacturingOrderNotesCardList,
  ManufacturingOrderDatesCard,
} from '../../components';
import {fetchManufOrder} from '../../features/manufacturingOrderSlice';
import {fetchOperationOrders} from '../../features/operationOrderSlice';

const ManufacturingOrderDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {operationOrderList} = useSelector(state => state.operationOrder);
  const {productFromId: product} = useSelector(state => state.product);
  const {loadingOrder, manufOrder} = useSelector(
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

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<ManufacturingOrderIconButtonList />}
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
        <ManufacturingOrderDatesCard />
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={product?.picture}
          code={product?.code}
          name={product?.name}
        />
        <ManufacturingOrderSaleOrderSetView
          onPressSaleOrder={handleViewSaleOrderRefs}
        />
        <ManufacturingOrderProductionOrderSetView
          onPressViewProduction={handleViewProductionOrderRefs}
        />
        <ManufacturingOrderHalfLabelCardList
          onPressConsumedProduct={handleShowConsumedProduct}
          onPressProducedProduct={handleShowProducedProduct}
        />
        {operationOrderList != null && operationOrderList?.length > 0 && (
          <ViewAllContainer
            onViewPress={handleViewAll}
            data={operationOrderList}
            translator={I18n.t}
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
        <ManufacturingOrderNotesCardList manufOrder={manufOrder} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default ManufacturingOrderDetailsScreen;
