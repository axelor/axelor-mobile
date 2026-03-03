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
import {View, StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {SmallPropertyCard} from '../../../organisms';

const ProductUnitInformations = ({product}) => {
  const I18n = useTranslator();

  if (product.unit != null) {
    return (
      <View style={styles.stock}>
        <SmallPropertyCard
          style={styles.stockCard}
          title={I18n.t('Stock_Stock')}
          value={product.unit?.name}
          formatValueToNumber={false}
        />
        {product.sellable && (
          <SmallPropertyCard
            style={styles.stockCard}
            title={I18n.t('Sale_Sale')}
            value={
              product.salesUnit ? product.salesUnit?.name : product.unit?.name
            }
            formatValueToNumber={false}
          />
        )}
        {product.purchasable && (
          <SmallPropertyCard
            style={styles.stockCard}
            title={I18n.t('Purchase_Purchase')}
            value={
              product.purchasesUnit
                ? product.purchasesUnit?.name
                : product.unit?.name
            }
            formatValueToNumber={false}
          />
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  stockCard: {
    marginHorizontal: '1.5%',
    minWidth: '20%',
  },
  stock: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductUnitInformations;
