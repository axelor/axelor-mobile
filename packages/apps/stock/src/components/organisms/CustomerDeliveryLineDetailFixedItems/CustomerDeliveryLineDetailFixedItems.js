import React from 'react';
import {useTranslator, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import StockMove from '../../../types/stock-move';
import {updateCustomerDeliveryLine} from '../../../features/customerDeliveryLineSlice';
import {addNewLine} from '../../../features/customerDeliverySlice';

const CustomerDeliveryLineDetailFixedItems = ({
  customerDeliveryLine,
  customerDelivery,
  realQty,
  navigation,
  trackingNumber,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {productFromId: product} = useSelector(state => state.product);

  const handleValidate = () => {
    dispatch(
      updateCustomerDeliveryLine({
        stockMoveLineId: customerDeliveryLine.id,
        version: customerDeliveryLine.version,
        realQty: realQty,
      }),
    );

    if (customerDelivery.statusSelect !== StockMove.status.Realized) {
      navigation.pop();
      if (product.trackingNumberConfiguration != null) {
        navigation.pop();
      }
    }
    navigation.pop();
  };

  const handleAddLine = () => {
    dispatch(
      addNewLine({
        stockMoveId: customerDelivery.id,
        productId: product.id,
        unitId: product.unit.id,
        trackingNumberId: trackingNumber != null ? trackingNumber.id : null,
        expectedQty: 0,
        realQty: realQty,
      }),
    );
    navigation.pop();
    if (product.trackingNumberConfiguration != null) {
      navigation.pop();
    }
    navigation.pop();
  };

  return (
    <>
      {customerDeliveryLine != null &&
        customerDelivery.statusSelect !== StockMove.status.Realized && (
          <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />
        )}
      {customerDeliveryLine == null &&
        customerDelivery.statusSelect !== StockMove.status.Realized && (
          <Button title={I18n.t('Base_Add')} onPress={handleAddLine} />
        )}
    </>
  );
};

export default CustomerDeliveryLineDetailFixedItems;
