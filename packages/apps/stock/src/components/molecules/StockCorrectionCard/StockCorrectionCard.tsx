import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import StockCorrection from '../../../types/stock-corrrection';

interface StockCorrectionCardProps {
  style?: any;
  status: number;
  productFullname: string;
  stockLocation: string;
  date: string;
  onPress: () => void;
}

const StockCorrectionCard = ({
  style,
  status,
  productFullname,
  stockLocation,
  date,
  onPress,
}: StockCorrectionCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const borderStyle = useMemo(() => {
    return getStyles(StockCorrection.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{productFullname}</Text>
          <Text style={styles.txtDetails}>{stockLocation}</Text>
          {status === StockCorrection.status.Draft ? (
            <Text style={[styles.txtDetails, styles.creationDate]}>
              {`${I18n.t('Base_CreatedOn')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          ) : (
            <Text style={styles.txtDetails}>
              {`${I18n.t('Base_ValidatedOn')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          )}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
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
