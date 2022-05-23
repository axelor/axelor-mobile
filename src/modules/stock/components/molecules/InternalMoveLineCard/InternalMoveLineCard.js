import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import StockMove from '@/modules/stock/types/stock-move';
import Colors from '@/types/colors';

const InternalMoveLineCard = ({
  style,
  productName,
  availability,
  trackingNumber,
  movedQty,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.txtImportant}>{productName}</Text>
            {trackingNumber == null ? null : (
              <Text style={styles.txtDetails}>{trackingNumber}</Text>
            )}
            <Text style={styles.txtDetails}>{movedQty}</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.badgeContainer}>
              {availability == null || availability === '' ? null : (
                <Badge
                  color={
                    StockMove.getAvailabilityColor(availability).backgroundColor
                  }
                  title={availability}
                />
              )}
            </View>
            <View style={styles.iconContainer}>
              <Icon name="chevron-right" style={styles.icon} />
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    width: '40%',
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  content: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  iconContainer: {
    flex: 3,
    alignItems: 'flex-end',
  },
  icon: {
    fontSize: 24,
    color: Colors.icon.light_grey,
  },
});

export default InternalMoveLineCard;
