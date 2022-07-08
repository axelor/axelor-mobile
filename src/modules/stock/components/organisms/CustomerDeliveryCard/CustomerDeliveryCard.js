import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Text, Icon} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import {formatDate} from '@/modules/stock/utils/formatters';
import StockMove from '@/modules/stock/types/stock-move';
import {useThemeColor} from '@/features/themeSlice';

const CustomerDeliveryCard = ({
  style,
  reference,
  status,
  availability,
  client,
  origin,
  date,
  onPress,
}) => {
  const Colors = useThemeColor();

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
          {date != null &&
            (status === 'Draft' ? (
              <Text style={[styles.txtDetails, styles.date]}>
                Created on {formatDate(date, 'MM/DD/YYYY')}
              </Text>
            ) : status === 'Planned' ? (
              <Text style={[styles.txtDetails, styles.date]}>
                Planned for {formatDate(date, 'MM/DD/YYYY')}
              </Text>
            ) : (
              <Text style={styles.txtDetails}>
                Validated on {formatDate(date, 'MM/DD/YYYY')}
              </Text>
            ))}
        </View>
        <View style={styles.rightContainer}>
          {availability == null ? null : (
            <Badge
              color={
                StockMove.getAvailabilityColor(availability, Colors)
                  .backgroundColor
              }
              title={availability}
            />
          )}
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
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
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
  date: {
    fontStyle: 'italic',
  },
  origin: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default CustomerDeliveryCard;
