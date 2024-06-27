/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it et/ou  modifier
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY ou FITNESS FOR A PARTICULAR PURPOSE.  See the
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

const DropdownProductSale = ({isProductCompanyConfig}) => {
  const I18n = useTranslator();
  const priceFormat = usePriceFormat();
  const Colors = useThemeColor();

  const {product, productCompany} = useSelector(
    (state: any) => state.sales_product,
  );

  const _formatDate = useCallback(
    _date => {
      return _date ? formatDate(_date, I18n.t('Base_DateFormat')) : null;
    },
    [I18n],
  );

  const renderLabelText = useCallback(
    (titleKey: string, value: string | number) => {
      if (!checkNullString(value)) {
        return (
          <LabelText
            title={`${I18n.t(titleKey)} :`}
            value={value}
            style={styles.label}
          />
        );
      }
      return null;
    },
    [I18n],
  );

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {renderLabelText(
          'Sales_PriceWT',
          isProductCompanyConfig
            ? priceFormat(productCompany.salePrice)
            : priceFormat(product.salePrice),
        )}
        {renderLabelText(
          'Sales_SaleCurrency',
          isProductCompanyConfig
            ? productCompany?.saleCurrency?.symbol
            : product.saleCurrency?.symbol,
        )}
        {renderLabelText('Sales_SaleUnit', product.salesUnit?.name)}
        {renderLabelText('Sales_LaunchDate', _formatDate(product.startDate))}
        {renderLabelText(
          'Sales_ProductPulledOfMarket',
          _formatDate(product.endDate),
        )}
      </View>
      <View>
        {product.isPrototype && (
          <Badge color={Colors.infoColor} title={I18n.t('Sales_Prototype')} />
        )}
        {product.isUnrenewed && (
          <Badge
            color={Colors.cautionColor}
            title={I18n.t('Sales_Unrenewed')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    maxWidth: '50%',
  },
  label: {
    alignItems: 'center',
  },
});

export default DropdownProductSale;
