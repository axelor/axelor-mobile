import React from 'react';
import {Button} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

const ProductFixedItems = ({product, navigation}) => {
  const I18n = useTranslator();

  const showProductVariables = () => {
    navigation.navigate('ProductListVariantScreen', {product: product});
  };

  return (
    product.productVariant != null && (
      <Button
        onPress={() => showProductVariables()}
        title={I18n.t('Stock_Variants')}
      />
    )
  );
};

export default ProductFixedItems;
