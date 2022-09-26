import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {formatDate} from '@/modules/stock/utils/formatters';
import Inventory from '@/modules/stock/types/inventory';
import {Card, Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const InventoryCard = ({
  style,
  reference,
  status,
  date,
  stockLocation,
  onPress,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

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
          {status === Inventory.status.Planned && (
            <Text style={[styles.txtDetails, styles.creationDate]}>
              {`${I18n.t('Base_PlannedFor')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          )}
          {status === Inventory.status.InProgress && (
            <Text style={styles.txtDetails}>
              {`${I18n.t('Base_StartedOn')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          )}
          {status === Inventory.status.Completed && (
            <Text style={styles.txtDetails}>
              {`${I18n.t('Base_CompletedOn')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          )}
          {status === Inventory.status.Validated && (
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
