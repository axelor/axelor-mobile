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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  useTranslator,
  useSelector,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Text, useThemeColor, Icon} from '@axelor/aos-mobile-ui';
import {StockIndicator} from '../../../../types';

const ProductSeeStockLocationDistribution = ({
  companyId,
  forceShow = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();

  const {productIndicators} = useSelector(state => state.productIndicators);

  const navigateStockLocationDetails = () => {
    navigation.navigate('ProductStockIndicatorDetails', {
      type: StockIndicator.type.AvailableStock,
      companyId: companyId,
    });
  };

  if (
    forceShow ||
    (productIndicators?.realQty != null &&
      parseInt(productIndicators?.realQty, 10) !== 0 &&
      parseInt(productIndicators?.futureQty, 10) !== 0)
  ) {
    return (
      <TouchableOpacity
        onPress={navigateStockLocationDetails}
        style={styles.container}>
        <Text>{I18n.t('Stock_SeeDistributionStockLocation')}</Text>
        <Icon
          name="chevron-right"
          size={18}
          color={Colors.primaryColor.background}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  icon: {
    flex: 1,
  },
});

export default ProductSeeStockLocationDistribution;
