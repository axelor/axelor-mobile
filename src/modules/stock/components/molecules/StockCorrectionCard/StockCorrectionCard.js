import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {formatDate} from '@/modules/stock/utils/formatters';
import StockCorrection from '@/modules/stock/types/stock-corrrection';
import {useThemeColor} from '@/features/themeSlice';

const StockCorrectionCard = ({
  style,
  status,
  productFullname,
  stockLocation,
  date,
  onPress,
}) => {
  const Colors = useThemeColor();
  const borderStyle = useMemo(() => {
    return getStyles(
      StockCorrection.getStatusColor(status, Colors).borderColor,
    );
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{productFullname}</Text>
          <Text style={styles.txtDetails}>{stockLocation}</Text>
          {status === 'Draft' ? (
            <Text style={[styles.txtDetails, styles.creationDate]}>
              Created on {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          ) : (
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
});

export default StockCorrectionCard;
