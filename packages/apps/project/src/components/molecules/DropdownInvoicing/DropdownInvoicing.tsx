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

import React, {useMemo} from 'react';
import {View} from 'react-native';
import {LabelText, TagList, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface DropdownInvoicingProps {
  style?: any;
  currency?: any;
  priceList?: any;
  tasksInvoicing?: boolean;
  expensesInvoicing?: boolean;
  purchasesInvoicing?: boolean;
}

const DropdownInvoicing = ({
  style,
  currency,
  priceList,
  tasksInvoicing,
  expensesInvoicing,
  purchasesInvoicing,
}: DropdownInvoicingProps) => {
  const I18n = useTranslator();

  const invoiceBoolList = useMemo(
    () => [
      {title: I18n.t('Project_PackagedTask'), hidden: !tasksInvoicing},
      {title: I18n.t('Project_Expenses'), hidden: !expensesInvoicing},
      {title: I18n.t('Project_Purchases'), hidden: !purchasesInvoicing},
    ],
    [I18n, expensesInvoicing, purchasesInvoicing, tasksInvoicing],
  );

  if (
    currency == null &&
    priceList == null &&
    invoiceBoolList?.filter(({hidden}) => !hidden)?.length === 0
  ) {
    return <Text>{I18n.t('Project_NoRelatedInvoicing')}</Text>;
  }

  return (
    <View style={style}>
      <TagList tags={invoiceBoolList} />
      {currency != null && (
        <LabelText
          title={`${I18n.t('Project_Currency')} :`}
          value={`${currency?.name} (${currency?.symbol})`}
          textSize={16}
        />
      )}
      {priceList != null && (
        <LabelText
          title={`${I18n.t('Project_PriceList')} :`}
          value={priceList?.title}
          textSize={16}
        />
      )}
    </View>
  );
};

export default DropdownInvoicing;
