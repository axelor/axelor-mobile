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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {formatDate, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  Badge,
  LabelText,
  checkNullString,
  usePriceFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

const DropdownProductSale = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatPrice = usePriceFormat();

  const {product} = useSelector((state: any) => state.sales_product);

  const _formatDate = useCallback(
    _date => {
      return _date ? formatDate(_date, I18n.t('Base_DateFormat')) : null;
    },
    [I18n],
  );

  const renderLabelText = useCallback(
    (titleKey: string, value: string | number) => {
      if (!checkNullString(value)) {
        return <LabelText title={I18n.t(titleKey)} value={value} />;
      }
      return null;
    },
    [I18n],
  );

  return (
    <View style={styles.container}>
      {renderLabelText('Sales_PriceWT', formatPrice(product.salePrice))}
      {renderLabelText('Sales_SaleCurrency', product.saleCurrency?.symbol)}
      {renderLabelText('Sales_SaleUnit', product.salesUnit?.name)}
      {renderLabelText('Sales_LaunchDate', _formatDate(product.startDate))}
      {renderLabelText(
        'Sales_ProductPulledOfMarket',
        _formatDate(product.endDate),
      )}
      <View style={styles.rowContainer}>
        {product.isPrototype && (
          <Badge
            color={Colors.infoColor}
            title={I18n.t('Sales_Prototype')}
            style={styles.badge}
          />
        )}
        {product.isUnrenewed && (
          <Badge
            color={Colors.cautionColor}
            title={I18n.t('Sales_Unrenewed')}
            style={styles.badge}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 3,
  },
  badge: {
    width: null,
    paddingHorizontal: 10,
  },
});

export default DropdownProductSale;
