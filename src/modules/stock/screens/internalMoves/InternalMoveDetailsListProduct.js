import React, {useEffect} from 'react';
import {Screen, Text} from '@/components/atoms';

const InternalMoveDetailsListProductScreen = ({route}) => {
  useEffect(() => {
    console.log(route.params);
  }, [route.params]);

  return (
    <Screen>
      <Text>List of internal move line</Text>
    </Screen>
  );
};

export default InternalMoveDetailsListProductScreen;
