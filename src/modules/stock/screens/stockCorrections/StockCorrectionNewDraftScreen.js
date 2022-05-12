import React, {useEffect} from 'react';
import {Screen, Text} from '@/components/atoms';

const StockCorrectionNewDraftScreen = ({route}) => {
  useEffect(() => {}, [route.params]);

  return (
    <Screen>
      <Text>Draft/New stock correction</Text>
    </Screen>
  );
};

export default StockCorrectionNewDraftScreen;
