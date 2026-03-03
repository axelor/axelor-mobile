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

const ProductPackingInformations = ({product}) => {
  const I18n = useTranslator();

  return (
    <View style={styles.containerPack}>
      <Text style={styles.titles}>{I18n.t('Stock_Packing')}</Text>
      <View style={styles.packing}>
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_Length')}
          value={product.length}
          unit={
            product.lengthUnit == null
              ? I18n.t('Stock_Meters')
              : product.lengthUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_Width')}
          value={product.width}
          unit={
            product.lengthUnit == null
              ? I18n.t('Stock_Meters')
              : product.lengthUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_Height')}
          value={product.height}
          unit={
            product.lengthUnit == null
              ? I18n.t('Stock_Meters')
              : product.lengthUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_NetMass')}
          value={product.netMass}
          unit={
            product.massUnit == null
              ? I18n.t('Stock_Kilograms')
              : product.massUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_GrossMass')}
          value={product.grossMass}
          unit={
            product.massUnit == null
              ? I18n.t('Stock_Kilograms')
              : product.massUnit?.name
          }
          interactive={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPack: {
    marginHorizontal: '5%',
    marginTop: 18,
  },
  titles: {
    marginHorizontal: '5%',
  },
  packingCard: {
    marginHorizontal: '2%',
    marginTop: 5,
    minWidth: '28%',
    marginBottom: '2%',
  },
  packing: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductPackingInformations;
