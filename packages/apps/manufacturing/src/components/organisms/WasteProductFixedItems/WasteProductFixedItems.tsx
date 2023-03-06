import React from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {ManufacturingOrder} from '../../../types';

interface WasteProductFixedItemsProps {
  manufOrder: any;
  wasteProduct: any;
  onPressUpdateWasteProduct: () => void;
  onPressCreateWasteProduct: () => void;
}

const WasteProductFixedItems = ({
  manufOrder,
  wasteProduct,
  onPressUpdateWasteProduct,
  onPressCreateWasteProduct,
}: WasteProductFixedItemsProps) => {
  const I18n = useTranslator();

  return (
    <>
      {manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
        manufOrder?.wasteStockMove == null &&
        (wasteProduct ? (
          <Button
            title={I18n.t('Base_Save')}
            onPress={onPressUpdateWasteProduct}
          />
        ) : (
          <Button
            title={I18n.t('Base_Save')}
            onPress={onPressCreateWasteProduct}
          />
        ))}
    </>
  );
};

export default WasteProductFixedItems;
