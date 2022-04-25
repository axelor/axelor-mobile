import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';

const getBadgeColor = status => {
  if (status === 'Draft') {
    return [
      styles.statusBadge,
      {
        backgroundColor: 'rgba(206, 206, 206, 0.6)',
        borderColor: 'rgba(206, 206, 206, 1)',
      },
    ];
  } else {
    return [
      styles.statusBadge,
      {
        backgroundColor: 'rgba(62, 207, 142, 0.6)',
        borderColor: 'rgba(62, 207, 142, 1)',
      },
    ];
  }
};

const StockCorrectionCard = ({
  style,
  status,
  productFullname,
  stockLocation,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.txtImportant}>{productFullname}</Text>
            <Text style={styles.txtDetails}>{stockLocation}</Text>
            <Text style={styles.txtDetails}>Created on {date}</Text>
          </View>
          <Badge style={getBadgeColor(status)} title={status} />
        </View>
        <Icon size={24} name="chevron-right" color="#e6e6e6" />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#efefef',
    marginRight: 32,
  },
  textContainer: {
    flex: 2,
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
  statusBadge: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 15,
    width: 87,
    height: 22,
    borderWidth: 1.5,
  },
});

export default StockCorrectionCard;
