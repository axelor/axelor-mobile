/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  useTranslator,
  useSelector,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Text, useThemeColor, Icon} from '@axelor/aos-mobile-ui';

const ProductSeeStockLocationDistribution = ({
  product,
  companyId,
  forceShow = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();

  const {productIndicators} = useSelector(state => state.productIndicators);

  const navigateStockLocationDetails = () => {
    navigation.navigate('ProductStockLocationDetailsScreen', {
      product: product,
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
        <View style={styles.arrowContainer}>
          <Text>{I18n.t('Stock_SeeDistributionStockLocation')}</Text>
          <Icon
            name="chevron-right"
            size={24}
            color={Colors.primaryColor.background}
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  arrowIcon: {
    marginLeft: 5,
  },
});

export default ProductSeeStockLocationDistribution;
