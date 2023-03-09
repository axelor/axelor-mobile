import React from 'react';
import {HalfLabelCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {View, StyleSheet} from 'react-native';

interface ManufacturingOrderHalfLabelCardListProps {
  onPressConsumedProduct: () => void;
  onPressProducedProduct: () => void;
}

const ManufacturingOrderHalfLabelCardList = ({
  onPressConsumedProduct,
  onPressProducedProduct,
}: ManufacturingOrderHalfLabelCardListProps) => {
  const I18n = useTranslator();

  return (
    <View style={styles.cardsContainer}>
      <HalfLabelCard
        iconName="dolly"
        title={I18n.t('Manufacturing_ConsumedProduct')}
        onPress={onPressConsumedProduct}
      />
      <HalfLabelCard
        iconName="cogs"
        title={I18n.t('Manufacturing_ProducedProduct')}
        onPress={onPressProducedProduct}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
  },
});

export default ManufacturingOrderHalfLabelCardList;
