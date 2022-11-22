import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {formatDate} from '../../../utils/formatters';
import StockMove from '../../../types/stock-move';

interface SupplierArrivalCardProps {
  style?: any;
  reference: string;
  status: number;
  client: string;
  origin: string;
  date: string;
  onPress: () => void;
}

const SupplierArrivalCard = ({
  style,
  reference,
  status,
  client,
  origin,
  date,
  onPress,
}: SupplierArrivalCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(StockMove.getStatusColor(status, Colors).background)
      ?.border;
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
          {status === StockMove.status.Planned ? (
            <Text style={[styles.txtDetails, styles.creationDate]}>
              {`${I18n.t('Base_PlannedFor')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          ) : (
            <Text style={styles.txtDetails}>
              {`${I18n.t('Base_RealizedOn')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
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
