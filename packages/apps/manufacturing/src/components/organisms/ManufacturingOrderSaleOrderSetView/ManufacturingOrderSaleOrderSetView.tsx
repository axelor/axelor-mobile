import React from 'react';
import {
  useThemeColor,
  ViewAllContainer,
  Text,
  Badge,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {View, StyleSheet} from 'react-native';

interface Props {
  onPressSaleOrder: () => void;
}

const ManufacturingOrderSaleOrderSetView = ({onPressSaleOrder}: Props) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {manufOrder} = useSelector((state: any) => state.manufacturingOrder);

  if (
    !Array.isArray(manufOrder.saleOrderSet) ||
    manufOrder.saleOrderSet.length === 0
  ) {
    return null;
  }

  return (
    <ViewAllContainer
      onViewPress={onPressSaleOrder}
      disabled={manufOrder.saleOrderSet.length < 3}
      translator={I18n.t}>
      <View style={styles.orderTitle}>
        <Text>{I18n.t('Manufacturing_RefClient')}</Text>
      </View>
      <View style={styles.orderSetContainer}>
        {manufOrder.saleOrderSet.slice(0, 3).map(item => (
          <Badge
            style={styles.orderBadge}
            title={item.fullName}
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
  orderBadge: {
    paddingHorizontal: 10,
    width: null,
  },
  orderTitle: {
    marginHorizontal: 8,
  },
  orderSetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default ManufacturingOrderSaleOrderSetView;
