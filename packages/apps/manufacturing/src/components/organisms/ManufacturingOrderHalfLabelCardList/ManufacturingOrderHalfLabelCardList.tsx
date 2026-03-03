/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
        iconName="gear-fill"
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
