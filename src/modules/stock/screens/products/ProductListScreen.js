import React from 'react';
import {Button, Screen, Text} from '@/components/atoms';

const ProductListScreen = ({navigation}) => {
  const goToDetails = () => {
    navigation.navigate('ProductStockDetails');
  };

  return (
    <Screen>
      <Text>ProductListScreen</Text>
      <Button title="Go to details" onPress={goToDetails} />
    </Screen>
  );
};

export default ProductListScreen;
