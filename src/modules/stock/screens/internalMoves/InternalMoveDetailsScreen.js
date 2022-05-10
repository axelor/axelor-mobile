import React, {useEffect} from 'react';
import {Screen, Text} from '@/components/atoms';

const InternalMoveDetailsScreen = ({route}) => {
  useEffect(() => {
    console.log(route.params);
  }, [route.params]);

  return (
    <Screen>
      <Text>Internal Move details</Text>
    </Screen>
  );
};

export default InternalMoveDetailsScreen;
