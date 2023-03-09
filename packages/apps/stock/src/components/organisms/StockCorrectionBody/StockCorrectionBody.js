import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
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
  handleQtyChange,
  handleReasonChange,
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
