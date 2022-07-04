import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {formatDate} from '@/modules/stock/utils/formatters';
import Inventory from '@/modules/stock/types/inventory';
import {ColorHook} from '@/themeStore';

const InventoryCard = ({
  style,
  reference,
  status,
  date,
  stockLocation,
  onPress,
}) => {
  const Colors = ColorHook();
  const borderStyle = useMemo(() => {
    return getStyles(Inventory.getStatusColor(status, Colors).borderColor);
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{reference}</Text>
          {stockLocation != null && (
            <Text style={styles.txtDetails}>{stockLocation}</Text>
          )}
          {status === Inventory.getStatus(Inventory.status.Planned) && (
            <Text style={[styles.txtDetails, styles.creationDate]}>
              Planned for {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          )}
          {status === Inventory.getStatus(Inventory.status.InProgress) && (
            <Text style={styles.txtDetails}>
              Started on {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          )}
          {status === Inventory.getStatus(Inventory.status.Completed) && (
            <Text style={styles.txtDetails}>
              Completed on {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          )}
          {status === Inventory.getStatus(Inventory.status.Validated) && (
            <Text style={styles.txtDetails}>
              Validated on {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          )}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor_light}
          size={20}
        />
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  textContainer: {
    width: '90%',
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

export default InventoryCard;
