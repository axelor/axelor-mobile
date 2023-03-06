import React from 'react';
import {
  useThemeColor,
  ViewAllContainer,
  Text,
  Badge,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {View, StyleSheet} from 'react-native';

interface ManufacturingOrderOrderSetListProps {
  manufOrder: any;
  linkedManufOrders: any;
  onPressSaleOrder: () => void;
  onPressViewProduction: () => void;
}

const ManufacturingOrderOrderSetList = ({
  manufOrder,
  linkedManufOrders,
  onPressSaleOrder,
  onPressViewProduction,
}: ManufacturingOrderOrderSetListProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <>
      {manufOrder.saleOrderSet != null &&
        manufOrder.saleOrderSet.length > 0 && (
          <ViewAllContainer
            onViewPress={onPressSaleOrder}
            disabled={manufOrder.saleOrderSet.length < 3}
            children={
              <>
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
              </>
            }
          />
        )}
      {manufOrder.productionOrderSet != null &&
        manufOrder.productionOrderSet?.length > 0 &&
        linkedManufOrders != null &&
        linkedManufOrders.length > 0 && (
          <ViewAllContainer
            onViewPress={onPressViewProduction}
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
                  color={Colors.priorityColor}
                  numberOfLines={null}
                />
              ))}
            </View>
          </ViewAllContainer>
        )}
    </>
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

export default ManufacturingOrderOrderSetList;
