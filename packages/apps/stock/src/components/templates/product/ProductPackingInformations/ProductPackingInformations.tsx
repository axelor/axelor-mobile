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
import {Text} from '@axelor/aos-mobile-ui';
import {SmallPropertyCard} from '../../../organisms';

const ProductPackingInformations = ({product}: {product: any}) => {
  const I18n = useTranslator();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{I18n.t('Stock_Packing')}</Text>
      <View style={styles.cardWrapper}>
        <SmallPropertyCard
          title={I18n.t('Stock_Length')}
          value={product.length}
          unit={product?.lengthUnit?.name ?? I18n.t('Stock_Meters')}
          interactive
        />
        <SmallPropertyCard
          title={I18n.t('Stock_Width')}
          value={product.width}
          unit={product?.lengthUnit?.name ?? I18n.t('Stock_Meters')}
          interactive
        />
        <SmallPropertyCard
          title={I18n.t('Stock_Height')}
          value={product.height}
          unit={product?.lengthUnit?.name ?? I18n.t('Stock_Meters')}
          interactive
        />
        <SmallPropertyCard
          title={I18n.t('Stock_NetMass')}
          value={product.netMass}
          unit={product?.massUnit?.name ?? I18n.t('Stock_Kilograms')}
          interactive
        />
        <SmallPropertyCard
          title={I18n.t('Stock_GrossMass')}
          value={product.grossMass}
          unit={product?.massUnit?.name ?? I18n.t('Stock_Kilograms')}
          interactive
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    gap: 5,
  },
  text: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
  },
});

export default ProductPackingInformations;
