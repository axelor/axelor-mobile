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
import {Text, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {View, StyleSheet} from 'react-native';
import StockMove from '../../../types/stock-move';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {QuantityCard} from '../../organisms';

const SupplierArrivalLineDetailQuantityCard = ({
  supplierArrival,
  supplierArrivalLine,
  realQty,
  setRealQty,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {productFromId: product} = useSelector(state => state.product);

  const handleQtyChange = value => {
    setRealQty(value);
  };

  return (
    <QuantityCard
      labelQty={I18n.t('Stock_ReceivedQty')}
      defaultValue={parseFloat(realQty).toFixed(2)}
      onValueChange={handleQtyChange}
      editable={supplierArrival.statusSelect !== StockMove.status.Realized}>
      <View style={styles.headerQuantityCard}>
        <Text style={styles.text}>
          {`${I18n.t('Stock_AskedQty')} : ${parseFloat(
            supplierArrivalLine != null ? supplierArrivalLine.qty : 0,
          ).toFixed(2)} ${
            supplierArrivalLine != null
              ? supplierArrivalLine?.unit?.name
              : product?.unit?.name
          }`}
        </Text>
        {supplierArrivalLine != null && (
          <View>
            {parseFloat(supplierArrivalLine.qty) !==
              parseFloat(supplierArrivalLine.realQty) && (
              <Badge
                title={I18n.t('Stock_Status_Incomplete')}
                color={Colors.cautionColor}
              />
            )}
            {parseFloat(supplierArrivalLine.qty) ===
              parseFloat(supplierArrivalLine.realQty) && (
              <Badge
                title={I18n.t('Stock_Status_Complete')}
                color={Colors.primaryColor}
              />
            )}
          </View>
        )}
      </View>
    </QuantityCard>
  );
};

const styles = StyleSheet.create({
  headerQuantityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SupplierArrivalLineDetailQuantityCard;
