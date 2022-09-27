import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {formatDate} from '@/modules/stock/utils/formatters';
import StockMove from '@/modules/stock/types/stock-move';

const StockMoveHeader = ({reference, status, date, availability}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        {reference != null && (
          <Text style={styles.text_important}>{reference}</Text>
        )}
        {date != null && (
          <Text style={styles.text_secondary}>
            {formatDate(date, I18n.t('Base_DateFormat'))}
          </Text>
        )}
      </View>
      <View style={styles.badgeContainer}>
        <Badge
          color={StockMove.getStatusColor(status, Colors).backgroundColor}
          title={StockMove.getStatus(status, I18n)}
        />
        {availability == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={
              StockMove.getAvailabilityColor(availability, Colors)
                .backgroundColor
            }
            title={StockMove.getAvailability(availability, I18n)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 24,
  },
  badgeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 32,
    flexDirection: 'row-reverse',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
});

export default StockMoveHeader;
