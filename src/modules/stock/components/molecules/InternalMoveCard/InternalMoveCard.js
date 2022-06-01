import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '@/modules/stock/utils/format-date';
import StockMove from '@/modules/stock/types/stock-move';
import Colors from '@/types/colors';

const InternalMoveCard = ({
  style,
  name,
  status,
  availability,
  fromStockLocation,
  toStockLocation,
  origin,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.txtImportant}>{name}</Text>
            <Text style={styles.txtDetails}>{fromStockLocation}</Text>
            <Text style={styles.txtDetails}>{toStockLocation}</Text>
            {origin == null ? null : (
              <Text style={styles.txtDetails}>{origin}</Text>
            )}
            {status === StockMove.getStatus(StockMove.status.Planned) ? (
              <Text style={[styles.txtDetails, styles.creationDate]}>
                Created on {formatDate(date, 'DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={styles.txtDetails}>
                Validated on {formatDate(date, 'DD/MM/YYYY')}
              </Text>
            )}
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.badgeContainer}>
              <Badge
                style={[styles.statusBadge, StockMove.getStatusColor(status)]}
                title={status}
              />
              {availability == null || availability === '' ? null : (
                <Badge
                  style={[
                    styles.statusBadge,
                    StockMove.getAvailabilityColor(availability),
                  ]}
                  title={availability}
                />
              )}
            </View>
            <Icon name="chevron-right" style={styles.icon} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    width: '50%',
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
  content: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '50%',
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
  statusBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 15,
    width: 87,
    height: 22,
    borderWidth: 1.5,
    marginBottom: 2,
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  icon: {
    fontSize: 24,
    color: Colors.icon.light_grey,
  },
});

export default InternalMoveCard;
