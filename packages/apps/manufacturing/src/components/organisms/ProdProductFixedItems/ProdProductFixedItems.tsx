import React from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';

interface ProdProductFixedItemsProps {
  show?: boolean;
  prodProduct: any;
  onPressUpdate: () => void;
  onPressCreate: () => void;
}

const ProdProductFixedItems = ({
  show = false,
  prodProduct,
  onPressUpdate,
  onPressCreate,
}: ProdProductFixedItemsProps) => {
  const I18n = useTranslator();

  if (show) {
    return (
      <Button
        title={I18n.t('Base_Save')}
        onPress={prodProduct != null ? onPressUpdate : onPressCreate}
      />
    );
  }

  return null;
};

export default ProdProductFixedItems;
