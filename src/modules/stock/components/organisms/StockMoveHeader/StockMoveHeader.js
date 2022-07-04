import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import {formatDate} from '@/modules/stock/utils/formatters';
import StockMove from '@/modules/stock/types/stock-move';
import {ColorHook} from '@/themeStore';

const StockMoveHeader = ({reference, status, date, availability}) => {
  const Colors = ColorHook();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        {reference != null && (
          <Text style={styles.text_important}>{reference}</Text>
        )}
        {date != null && (
          <Text style={styles.text_secondary}>
            {formatDate(date, 'MM/DD/YYYY')}
          </Text>
        )}
      </View>
      <View style={styles.badgeContainer}>
        <Badge
          color={
            StockMove.getStatusColor(StockMove.getStatus(status), Colors)
              .backgroundColor
          }
          title={StockMove.getStatus(status)}
        />
        {availability == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={
              StockMove.getAvailabilityColor(
                StockMove.getAvailability(availability),
                Colors,
              ).backgroundColor
            }
            title={StockMove.getAvailability(availability)}
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
    marginTop: '2%',
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
