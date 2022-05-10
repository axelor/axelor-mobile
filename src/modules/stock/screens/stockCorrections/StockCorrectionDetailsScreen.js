import React, {useEffect} from 'react';
import {Screen, Text} from '@/components/atoms';

const StockCorrectionDetailsScreen = ({route}) => {
  useEffect(() => {
  }, [route.params]);

  return (
    <Screen>
      <Text>Stock correction details</Text>
    </Screen>
  );
};

export default StockCorrectionDetailsScreen;
