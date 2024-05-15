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
import {View} from 'react-native';
import {TagList, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface DropdownInvoicingProps {
  style?: any;
  invoiceBoolList: any;
  currency: any;
  priceList?: any;
}

const DropdownInvoicing = ({
  style,
  invoiceBoolList,
  currency,
  priceList,
}: DropdownInvoicingProps) => {
  const I18n = useTranslator();

  return (
    <View style={style}>
      <TagList tags={invoiceBoolList} />
      {currency != null && (
        <Text>{`${I18n.t('Project_Currency')} : ${currency?.name}  (${
          currency?.code
        })`}</Text>
      )}

      {priceList != null && (
        <Text>{`${I18n.t('Project_PriceList')} : ${priceList?.title}`}</Text>
      )}
    </View>
  );
};

export default DropdownInvoicing;
