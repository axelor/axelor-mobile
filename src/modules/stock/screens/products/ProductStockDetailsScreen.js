import React, {useEffect} from 'react';
import {Screen, Text} from '@/components/atoms';

const ProductStockDetailsScreen = ({route}) => {
  useEffect(() => {
    console.log(route.params);
  }, [route.params]);

  return (
    <Screen>
      <Text>Product stock details</Text>
    </Screen>
  );
};

export default ProductStockDetailsScreen;
