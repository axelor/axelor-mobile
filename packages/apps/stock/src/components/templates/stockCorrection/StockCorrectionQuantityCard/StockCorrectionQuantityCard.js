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
import {StyleSheet} from 'react-native';
import {useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {QuantityCard, Text, useDigitFormat} from '@axelor/aos-mobile-ui';

const StockCorrectionQuantityCard = ({
  stockProduct,
  status,
  realQty,
  databaseQty,
  setRealQty,
  setSaveStatus = () => {},
  readonly = false,
}) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {StockCorrection} = useTypes();

  const handleQtyChange = value => {
    setRealQty(value);
    setSaveStatus(false);
  };

  return (
    <QuantityCard
      labelQty={I18n.t('Stock_RealQty')}
      defaultValue={realQty}
      onValueChange={handleQtyChange}
      editable={!readonly && status === StockCorrection?.statusSelect.Draft}
      isBigButton={true}
      translator={I18n.t}>
      <Text style={styles.text}>
        {`${I18n.t('Stock_DatabaseQty')}: ${formatNumber(databaseQty)} ${
          stockProduct?.unit?.name
        }`}
      </Text>
    </QuantityCard>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default StockCorrectionQuantityCard;
