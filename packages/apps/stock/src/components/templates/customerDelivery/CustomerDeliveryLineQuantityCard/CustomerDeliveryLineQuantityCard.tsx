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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, useSelector, isEmpty} from '@axelor/aos-mobile-core';
import {Text, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import StockMove from '../../../../types/stock-move';
import {QuantityCard} from '../../../organisms';

const CustomerDeliveryLineQuantityCard = ({
  customerDelivery,
  realQty,
  setRealQty,
  customerDeliveryLine,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {productFromId: product} = useSelector((state: any) => state.product);

  const handleQtyChange = value => {
    setRealQty(value);
  };

  const indicatorBadge = useMemo(
    () =>
      Number(customerDeliveryLine?.qty) !==
      Number(customerDeliveryLine?.realQty)
        ? {title: I18n.t('Stock_Status_Incomplete'), color: Colors.cautionColor}
        : {title: I18n.t('Stock_Status_Complete'), color: Colors.primaryColor},
    [Colors, I18n, customerDeliveryLine],
  );

  const askedQty = useMemo(
    () =>
      isEmpty(customerDeliveryLine)
        ? `${parseFloat('0').toFixed(2)} ${product?.unit?.name}`
        : `${parseFloat(customerDeliveryLine.qty).toFixed(2)} ${
            customerDeliveryLine.unit?.name
          }`,
    [customerDeliveryLine, product],
  );

  return (
    <QuantityCard
      labelQty={I18n.t('Stock_PickedQty')}
      defaultValue={realQty}
      onValueChange={handleQtyChange}
      editable={customerDelivery.statusSelect !== StockMove.status.Realized}
      isBigButton={true}>
      <View style={styles.headerQuantityCard}>
        <Text>{`${I18n.t('Stock_AskedQty')} : ${askedQty}`}</Text>
        {customerDeliveryLine != null && (
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

export default CustomerDeliveryLineQuantityCard;
