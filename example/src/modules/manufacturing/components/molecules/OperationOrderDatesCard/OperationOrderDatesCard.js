import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import OperationOrder from '@/modules/manufacturing/types/operation-order';

function OperationOrderDatesCard({status, startDate, endDate}) {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.importantText}>
          {status === OperationOrder.status.Draft ||
          status === OperationOrder.status.Planned
            ? I18n.t('Base_Estimated')
            : I18n.t('Base_Real')}
        </Text>
        <Text>{startDate}</Text>
      </View>
      <View style={styles.panel}>
        <Icon name="chevron-right" size={35} color={Colors.primaryColor} />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.importantText}>
          {status === OperationOrder.status.Finished
            ? I18n.t('Base_Real')
            : I18n.t('Base_Estimated')}
        </Text>
        <Text>{endDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  dateContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  importantText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  panel: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OperationOrderDatesCard;
