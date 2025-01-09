/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {isEmpty, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';
import {QuantityCard} from '../../../organisms';

const SupplierArrivalLineQuantityCard = ({
  supplierArrival,
  supplierArrivalLine,
  realQty,
  setRealQty,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {productFromId: product} = useSelector((state: any) => state.product);

  const handleQtyChange = value => {
    setRealQty(value);
  };

  const indicatorBadge = useMemo(
    () =>
      Number(supplierArrivalLine?.qty) !== Number(supplierArrivalLine?.realQty)
        ? {title: I18n.t('Stock_Status_Incomplete'), color: Colors.cautionColor}
        : {title: I18n.t('Stock_Status_Complete'), color: Colors.primaryColor},
    [Colors, I18n, supplierArrivalLine],
  );

  const askedQty = useMemo(
    () =>
      isEmpty(supplierArrivalLine)
        ? `${parseFloat('0').toFixed(2)} ${product?.unit?.name}`
        : `${parseFloat(supplierArrivalLine.qty).toFixed(2)} ${
            supplierArrivalLine.unit?.name
          }`,
    [supplierArrivalLine, product?.unit?.name],
  );

  return (
    <QuantityCard
      labelQty={I18n.t('Stock_ReceivedQty')}
      defaultValue={realQty}
      onValueChange={handleQtyChange}
      editable={supplierArrival.statusSelect !== StockMove.status.Realized}
      isBigButton={true}>
      <View style={styles.headerQuantityCard}>
        <Text>{`${I18n.t('Stock_AskedQty')} : ${askedQty}`}</Text>
        {supplierArrivalLine != null && (
          <View>
            <Badge title={indicatorBadge.title} color={indicatorBadge.color} />
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

export default SupplierArrivalLineQuantityCard;
