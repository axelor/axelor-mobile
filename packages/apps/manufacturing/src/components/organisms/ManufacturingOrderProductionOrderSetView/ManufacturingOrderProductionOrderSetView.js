import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useThemeColor,
  ViewAllContainer,
  Text,
  Badge,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchLinkedManufOrders} from '../../../features/manufacturingOrderSlice';

const ManufacturingOrderProductionOrderSetView = ({onPressViewProduction}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {manufOrder, linkedManufOrders} = useSelector(
    state => state.manufacturingOrder,
  );

  useEffect(() => {
    if (manufOrder != null) {
      dispatch(
        fetchLinkedManufOrders({
          productionOrderList: manufOrder.productionOrderSet,
        }),
      );
    }
  }, [dispatch, manufOrder]);

  if (
    !Array.isArray(manufOrder.productionOrderSet) ||
    manufOrder.productionOrderSet.length === 0 ||
    !Array.isArray(linkedManufOrders) ||
    linkedManufOrders.length === 0
  ) {
    return null;
  }

  return (
    <ViewAllContainer
      onViewPress={onPressViewProduction}
      disabled={linkedManufOrders.length === 0}
      translator={I18n.t}>
      <View style={styles.orderTitle}>
        <Text>{I18n.t('Manufacturing_RefOP')}</Text>
      </View>
      <View style={styles.orderSetContainer}>
        {linkedManufOrders.slice(0, 3).map(item => (
          <Badge
            style={styles.orderBadge}
            title={item.manufOrderSeq}
            key={item.id}
            color={Colors.priorityColor}
            numberOfLines={null}
          />
        ))}
      </View>
    </ViewAllContainer>
  );
};
const styles = StyleSheet.create({
  orderTitle: {
    marginHorizontal: 8,
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
});

export default ManufacturingOrderProductionOrderSetView;
