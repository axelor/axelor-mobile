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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslator, useSelector, getFromList} from '@axelor/aos-mobile-core';
import {Picker, Text} from '@axelor/aos-mobile-ui';
import StockCorrection from '../../../types/stock-corrrection';
import ProductCardInfo from '../ProductCardInfo/ProductCardInfo';
import QuantityCard from '../QuantityCard/QuantityCard';

const StockCorrectionBody = ({
  stockProduct,
  trackingNumber,
  status,
  navigation,
  realQty,
  databaseQty,
  reason,
  setRealQty,
  setSaveStatus,
  setReason,
}) => {
  const I18n = useTranslator();
  const {stockCorrectionReasonList} = useSelector(
    state => state.stockCorrectionReason,
  );

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: stockProduct,
    });
  };

  const handleQtyChange = value => {
    setRealQty(value);
    setSaveStatus(false);
  };

  const handleReasonChange = reasonId => {
    if (reasonId === null) {
      setReason({name: '', id: null});
    } else {
      setReason(getFromList(stockCorrectionReasonList, 'id', reasonId));
    }
    setSaveStatus(false);
  };

  return (
    <>
      <View>
        <ProductCardInfo
          name={stockProduct?.name}
          code={stockProduct?.code}
          picture={stockProduct?.picture}
          trackingNumber={
            stockProduct?.trackingNumberConfiguration == null ||
            trackingNumber == null
              ? null
              : trackingNumber.trackingNumberSeq
          }
          locker={null}
          onPress={handleShowProduct}
        />
      </View>
      <QuantityCard
        labelQty={I18n.t('Stock_RealQty')}
        defaultValue={parseFloat(realQty).toFixed(2)}
        onValueChange={handleQtyChange}
        editable={status === StockCorrection.status.Draft}>
        <Text style={styles.text}>
          {`${I18n.t('Stock_DatabaseQty')}: ${parseFloat(databaseQty).toFixed(
            2,
          )} ${stockProduct?.unit?.name}`}
        </Text>
      </QuantityCard>
      <Picker
        styleTxt={reason?.id === null ? styles.picker_empty : null}
        title={I18n.t('Stock_Reason')}
        onValueChange={handleReasonChange}
        defaultValue={reason?.id}
        listItems={stockCorrectionReasonList}
        labelField="name"
        valueField="id"
        disabled={status === StockCorrection.status.Validated}
        disabledValue={reason?.name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  picker_empty: {
    color: 'red',
  },
  text: {
    fontSize: 16,
  },
});

export default StockCorrectionBody;
