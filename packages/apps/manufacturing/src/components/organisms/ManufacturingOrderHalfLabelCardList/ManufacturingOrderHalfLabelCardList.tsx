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

import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {HalfLabelCard} from '@axelor/aos-mobile-ui';
import {
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';

const ManufacturingOrderHalfLabelCardList = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {manufOrder} = useSelector(state => state.manufacturingOrder);

  const handleShowConsumedProduct = useCallback(() => {
    navigation.navigate('ConsumedProductListScreen', {manufOrder});
  }, [manufOrder, navigation]);

  const handleShowProducedProduct = useCallback(() => {
    navigation.navigate('ProducedProductListScreen', {manufOrder});
  }, [manufOrder, navigation]);

  return (
    <View style={styles.cardsContainer}>
      <HalfLabelCard
        iconName="dolly"
        title={I18n.t('Manufacturing_ConsumedProduct')}
        onPress={handleShowConsumedProduct}
      />
      <HalfLabelCard
        iconName="gear-fill"
        title={I18n.t('Manufacturing_ProducedProduct')}
        onPress={handleShowProducedProduct}
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
