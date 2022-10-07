import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Badge,
  Card,
  HalfLabelCard,
  IconButton,
  Screen,
  ScrollView,
  HeaderContainer,
  Text,
  ViewAllContainer,
  useThemeColor,
} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {ProductCardInfo} from '@/modules/stock/components/organisms';
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
            disable={manufOrder.saleOrderSet.length < 3}>
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
              disable={linkedManufOrders.length === 0}>
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
          <ViewAllContainer onPress={handleViewAll}>
            {operationOrderList[0] != null && (
              <OperationOrderCard
                style={styles.item}
                status={operationOrderList[0].statusSelect}
                operationName={operationOrderList[0].operationName}
                workcenter={operationOrderList[0].workCenter.name}
                plannedDuration={operationOrderList[0].plannedDuration}
                priority={operationOrderList[0].priority}
                onPress={() => handleShowLine(operationOrderList[0])}
              />
            )}
            {operationOrderList[1] != null && (
              <OperationOrderCard
                style={styles.item}
                status={operationOrderList[1].statusSelect}
                operationName={operationOrderList[1].operationName}
                workcenter={operationOrderList[1].workCenter.name}
                plannedDuration={operationOrderList[1].plannedDuration}
                priority={operationOrderList[1].priority}
                onPress={() => handleShowLine(operationOrderList[1])}
              />
            )}
          </ViewAllContainer>
        )}
        {manufOrder.note == null || manufOrder.note === '' ? null : (
          <View>
            <View style={styles.noteTitle}>
              <Text>{I18n.t('Manufacturing_Notes')}</Text>
            </View>
            <Card style={styles.infosCard}>
              <Text numberOfLines={3}>{manufOrder.note}</Text>
            </Card>
          </View>
        )}
        {manufOrder.moCommentFromSaleOrder == null ||
        manufOrder.moCommentFromSaleOrder === '' ? null : (
          <View>
            <View style={styles.noteTitle}>
              <Text>{I18n.t('Manufacturing_NotesOnSaleOrder')}</Text>
            </View>
            <Card style={styles.infosCard}>
              <Text numberOfLines={3}>{manufOrder.moCommentFromSaleOrder}</Text>
            </Card>
          </View>
        )}
        {manufOrder.moCommentFromSaleOrderLine == null ||
        manufOrder.moCommentFromSaleOrderLine === '' ? null : (
          <View>
            <View style={styles.noteTitle}>
              <Text>{I18n.t('Manufacturing_NotesOnSaleOrderLine')}</Text>
            </View>
            <Card style={styles.infosCard}>
              <Text numberOfLines={3}>
                {manufOrder.moCommentFromSaleOrderLine}
              </Text>
            </Card>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
  noteTitle: {
    marginHorizontal: 20,
  },
  infosCard: {
    marginHorizontal: 12,
    marginBottom: '2%',
    elevation: 0,
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
