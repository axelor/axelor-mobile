import React from 'react';
import {AttachedFilesView} from '@aos-mobile/core';

const ProductAttachedFilesScreen = ({route, navigation}) => {
  const product = route.params.product;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product.name,
    });
  }, [navigation, product]);

  return (
    <AttachedFilesView
      model="com.axelor.apps.base.db.Product"
      modelId={product.id}
    />
  );
};

export default ProductAttachedFilesScreen;
