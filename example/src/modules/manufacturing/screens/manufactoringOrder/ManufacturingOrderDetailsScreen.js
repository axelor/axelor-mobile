import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  HalfLabelCard,
  IconButton,
  Screen,
  ScrollView,
  HeaderContainer,
  ViewAllContainer,
  useThemeColor,
  Text,
  DropdownMenu,
  DropdownMenuItem,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {NotesCard, ProductCardInfo} from '@aos-mobile/app-stock';
import {
  ManufacturingOrderHeader,
  OperationOrderCard,
} from '../../components/organisms';
import {
  fetchLinkedManufOrders,
  fetchManufOrder,
} from '../../features/manufacturingOrderSlice';
import {fetchOperationOrders} from '../../features/operationOrderSlice';
import ManufacturingOrder from '../../types/manufacturing-order';

const ManufacturingOrderDetailsScreen = ({route, navigation}) => {
  const {mobileSettings} = useSelector(state => state.config);
  const {operationOrderList} = useSelector(state => state.operationOrder);
  const {loadingOrder, manufOrder, linkedManufOrders} = useSelector(
    state => state.manufacturingOrder,
  );
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

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
      product: manufOrder.product,
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
      headerRight: () => {
        if (mobileSettings?.isTrackerMessageOnProductionApp) {
          return (
            <DropdownMenu>
              <DropdownMenuItem
                placeholder={I18n.t('Base_MailMessages')}
                icon="bell"
                onPress={() =>
                  navigation.navigate('ManufacturingOrderMailMessagesScreen', {
                    manufOrderId: manufOrder?.id,
                  })
                }
              />
            </DropdownMenu>
          );
        }
        return null;
      },
    });
  }, [I18n, mobileSettings, navigation, manufOrder]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <>
          {manufOrder.statusSelect === ManufacturingOrder.status.Planned && (
            <IconButton
              title={I18n.t('Base_Start')}
              onPress={() => {}}
              iconName="play"
            />
          )}
          {manufOrder.statusSelect === ManufacturingOrder.status.InProgress && (
            <IconButton
              title={I18n.t('Base_Pause')}
              onPress={() => {}}
              iconName="pause"
              color={Colors.secondaryColor}
            />
          )}
          {manufOrder.statusSelect === ManufacturingOrder.status.StandBy && (
            <IconButton
              title={I18n.t('Base_Continue')}
              onPress={() => {}}
              iconName="step-forward"
            />
          )}
          {manufOrder.statusSelect === ManufacturingOrder.status.InProgress && (
            <IconButton
              title={I18n.t('Base_Finish')}
              onPress={() => {}}
              iconName="power-off"
            />
          )}
        </>
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
          pictureId={manufOrder.product?.picture.id}
          code={manufOrder.product?.code}
          name={manufOrder.product?.name}
        />
        {manufOrder.saleOrderSet != null && manufOrder.saleOrderSet.length > 0 && (
          <ViewAllContainer
            onPress={handleViewSaleOrderRefs}
            disabled={manufOrder.saleOrderSet.length < 3}>
            <View style={styles.orderTitle}>
              <Text>{I18n.t('Manufacturing_RefClient')}</Text>
            </View>
            <View style={styles.orderSetContainer}>
              {manufOrder.saleOrderSet.slice(0, 3).map(item => (
                <Badge
                  style={styles.orderBadge}
                  title={item.fullName}
                  key={item.id}
                  color={Colors.priorityColor_light}
                  numberOfLines={null}
                />
              ))}
            </View>
          </ViewAllContainer>
        )}
        {manufOrder.productionOrderSet != null &&
          manufOrder.productionOrderSet?.length > 0 &&
          linkedManufOrders != null &&
          linkedManufOrders.length > 0 && (
            <ViewAllContainer
              onPress={handleViewProductionOrderRefs}
              disabled={linkedManufOrders.length === 0}>
              <View style={styles.orderTitle}>
                <Text>{I18n.t('Manufacturing_RefOP')}</Text>
              </View>
              <View style={styles.orderSetContainer}>
                {linkedManufOrders.slice(0, 3).map(item => (
                  <Badge
                    style={styles.orderBadge}
                    title={item.manufOrderSeq}
                    key={item.id}
                    color={Colors.priorityColor_light}
                    numberOfLines={null}
                  />
                ))}
              </View>
            </ViewAllContainer>
          )}
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
        {operationOrderList != null && (
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
