import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '@/modules/stock/utils/format-date';
import StockCorrection from '@/modules/stock/types/stock-corrrection';
import Colors from '@/types/colors';

const StockCorrectionCard = ({
  style,
  status,
  productFullname,
  stockLocation,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.txtImportant}>{productFullname}</Text>
            <Text style={styles.txtDetails}>{stockLocation}</Text>
            {status === 'Draft' ? (
              <Text style={[styles.txtDetails, styles.creationDate]}>
                Created on {formatDate(date, 'DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={styles.txtDetails}>
                Validated on {formatDate(date, 'DD/MM/YYYY')}
              </Text>
            )}
          </View>
          <Badge
            style={StockCorrection.getStatusColor(status)}
            title={status}
          />
        </View>
        <Icon size={24} name="chevron-right" color={Colors.icon.light_grey} />
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
  creationDate: {
    fontStyle: 'italic',
  },
});

export default StockCorrectionCard;
