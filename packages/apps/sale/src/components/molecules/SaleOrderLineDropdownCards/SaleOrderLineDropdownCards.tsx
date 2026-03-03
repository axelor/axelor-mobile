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
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {DropdownSOLConfigurationView, DropdownSOLMarginView} from '../../atoms';

interface SaleOrderLineDropdownCardsProps {
  saleOrderLine: any;
}

const SaleOrderLineDropdownCards = ({
  saleOrderLine,
}: SaleOrderLineDropdownCardsProps) => {
  const I18n = useTranslator();

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        style={styles.dropdown}
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            key: 1,
            title: I18n.t('Sale_Margin'),
            childrenComp: (
              <DropdownSOLMarginView
                subTotalCostPrice={saleOrderLine.subTotalCostPrice}
                subTotalGrossMargin={saleOrderLine.subTotalGrossMargin}
                subMarginRate={saleOrderLine.subMarginRate}
                subTotalMarkup={saleOrderLine.subTotalMarkup}
              />
            ),
          },
          {
            key: 2,
            title: I18n.t('Sale_Configuration'),
            childrenComp: (
              <DropdownSOLConfigurationView
                saleSupplySelect={saleOrderLine.saleSupplySelect}
                pricingScaleLogs={saleOrderLine.pricingScaleLogs}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dropdown: {
    marginBottom: 0,
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default SaleOrderLineDropdownCards;
