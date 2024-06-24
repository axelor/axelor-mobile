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
import {StyleSheet, View} from 'react-native';
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Badge, LabelText, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {TaxModeBadge} from '../../atoms';

interface SaleOrderHeaderProps {
  saleOrder: any;
}

const SaleOrderHeader = ({saleOrder}: SaleOrderHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {SaleOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text writingType="title">{saleOrder.saleOrderSeq}</Text>
        <Badge
          title={getItemTitle(SaleOrder?.statusSelect, saleOrder.statusSelect)}
          color={getItemColor(SaleOrder?.statusSelect, saleOrder.statusSelect)}
        />
      </View>
      {saleOrder.externalReference && (
        <LabelText
          iconName="tag-fill"
          size={16}
          title={saleOrder.externalReference}
          textStyle={styles.labelText}
        />
      )}
      <LabelText
        iconName="clock-history"
        size={16}
        title={I18n.t('Sales_Version')}
        value={saleOrder.version}
        textStyle={styles.labelText}
      />
      <View style={styles.badgesContainer}>
        {saleOrder.oneoffSale && (
          <Badge
            title={I18n.t('Sales_OneOffSale')}
            color={Colors.cautionColor}
          />
        )}
        {saleOrder.saleOrderTypeSelect === 2 && (
          <Badge
            title={I18n.t('Sales_Subscription')}
            color={Colors.plannedColor}
          />
        )}
        <TaxModeBadge inAti={saleOrder.inAti} type="sale" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 3,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default SaleOrderHeader;
