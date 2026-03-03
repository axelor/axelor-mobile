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
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {checkNullString, LabelText} from '@axelor/aos-mobile-ui';

interface DropdownSOLConfigurationViewProps {
  saleSupplySelect: number;
  pricingScaleLogs: string;
}

const DropdownSOLConfigurationView = ({
  saleSupplySelect,
  pricingScaleLogs,
}: DropdownSOLConfigurationViewProps) => {
  const I18n = useTranslator();
  const {SaleOrderLine} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  return (
    <View>
      <LabelText
        title={I18n.t('Sale_SupplyMethod')}
        value={getItemTitle(SaleOrderLine?.saleSupplySelect, saleSupplySelect)}
      />
      {!checkNullString(pricingScaleLogs) && (
        <LabelText
          title={I18n.t('Sale_PriceCalculationDetails')}
          value={pricingScaleLogs}
        />
      )}
    </View>
  );
};

export default DropdownSOLConfigurationView;
