import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Card,
  LabelText,
  Screen,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {PlanningView, useDispatch, useSelector} from '@axelor/aos-mobile-core';

function EventPlanningScreen({navigation}) {
  return <Text>test</Text>;
}

const getStyles = Colors =>
  StyleSheet.create({
    containerDetails: {
      alignSelf: 'center',
      width: '100%',
    },
    container: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    bold: {
      fontWeight: 'bold',
    },
  });

export default EventPlanningScreen;
