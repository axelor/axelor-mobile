import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Text, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import StockCorrection from '../../../types/stock-corrrection';

const StockCorrectionHeader = ({stockLocation, status}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.text_important}>{stockLocation?.name}</Text>
      </View>
      {status && (
        <Badge
          color={StockCorrection.getStatusColor(status, Colors)}
          title={StockCorrection.getStatus(status, I18n)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StockCorrectionHeader;
