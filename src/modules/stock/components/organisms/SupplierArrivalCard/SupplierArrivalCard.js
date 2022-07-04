import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {formatDate} from '@/modules/stock/utils/formatters';
import StockMove from '@/modules/stock/types/stock-move';
import {ColorHook} from '@/themeStore';

const SupplierArrivalCard = ({
  style,
  reference,
  status,
  client,
  origin,
  date,
  onPress,
}) => {
  const Colors = ColorHook();
  const borderStyle = useMemo(() => {
    return getStyles(StockMove.getStatusColor(status, Colors).borderColor);
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{reference}</Text>
          <Text style={styles.txtDetails}>{client}</Text>
          {origin != null && (
            <View style={styles.origin}>
              <Icon name="tag" size={12} style={styles.icon} />
              <Text style={styles.txtDetails}>{origin}</Text>
            </View>
          )}
          {status === 'Planned' ? (
            <Text style={[styles.txtDetails, styles.creationDate]}>
              Planned for {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          ) : (
            <Text style={styles.txtDetails}>
              Realized on {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    borderLeftWidth: 7,
    borderLeftColor: color,
  });

const styles = StyleSheet.create({
  rightContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
  creationDate: {
    fontStyle: 'italic',
  },
  origin: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default SupplierArrivalCard;
