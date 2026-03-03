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
import {View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {LabelText, usePriceFormat} from '@axelor/aos-mobile-ui';

interface DropdownSOLMarginViewProps {
  subTotalCostPrice: number;
  subTotalGrossMargin: number;
  subMarginRate: number;
  subTotalMarkup: number;
}

const DropdownSOLMarginView = ({
  subTotalCostPrice,
  subTotalGrossMargin,
  subMarginRate,
  subTotalMarkup,
}: DropdownSOLMarginViewProps) => {
  const I18n = useTranslator();
  const formatPrice = usePriceFormat();

  return (
    <View>
      <LabelText
        title={I18n.t('Sale_SubTotalCostPrice')}
        value={formatPrice(subTotalCostPrice)}
      />
      <LabelText
        title={I18n.t('Sale_SubTotalGrossProfit')}
        value={formatPrice(subTotalGrossMargin)}
      />
      <LabelText
        title={I18n.t('Sale_SubMarginRate')}
        value={formatPrice(subMarginRate)}
      />
      <LabelText
        title={I18n.t('Sale_SubTotalMarkup')}
        value={formatPrice(subTotalMarkup)}
      />
    </View>
  );
};

export default DropdownSOLMarginView;
