/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {Text, useThemeColor, Icon} from '@axelor/aos-mobile-ui';

const ProductSeeDistributionStocksLocation = ({
  navigation,
  product,
  companyId,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {productIndicators} = useSelector(state => state.productIndicators);

  const navigateStockLocationDetails = () => {
    navigation.navigate('ProductStockLocationDetailsScreen', {
      product: product,
      companyId: companyId,
    });
  };

  return (
    <>
      {productIndicators?.realQty != null &&
      parseInt(productIndicators?.realQty, 10) !== 0 &&
      parseInt(productIndicators?.futureQty, 10) !== 0 ? (
        <TouchableOpacity onPress={navigateStockLocationDetails}>
          <View style={styles.arrowContainer}>
            <Text>{I18n.t('Stock_SeeDistributionStockLocation')}</Text>
            <Icon
              name="angle-right"
              size={24}
              color={Colors.primaryColor.background}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 32,
    width: '80%',
  },
  arrowIcon: {
    marginRight: -6,
    marginLeft: 5,
  },
});

export default ProductSeeDistributionStocksLocation;
