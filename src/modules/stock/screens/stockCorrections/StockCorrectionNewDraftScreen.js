import React, {useEffect} from 'react';
import {Screen, Text} from '@/components/atoms';

const StockCorrectionNewDraftScreen = ({route}) => {
  useEffect(() => {
    console.log(route.params);
  }, [route.params]);

  return (
    <Screen>
      <Text>Draft/New stock correction</Text>
    </Screen>
  );
};

export default StockCorrectionNewDraftScreen;
