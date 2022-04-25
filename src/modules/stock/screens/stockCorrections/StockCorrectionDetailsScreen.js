import React, {useEffect} from 'react';
import {Screen, Text} from '@/components/atoms';

const StockCorrectionDetailsScreen = ({route}) => {
  useEffect(() => {
    console.log(route.params);
  }, [route.params]);

  return (
    <Screen>
      <Text>Stock correction details</Text>
    </Screen>
  );
};

export default StockCorrectionDetailsScreen;
