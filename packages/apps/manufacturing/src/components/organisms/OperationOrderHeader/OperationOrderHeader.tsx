import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import OperationOrder from '../../../types/operation-order';

interface OperationOrderHeaderProps {
  manufOrderRef: string;
  name: string;
  status: number;
  priority: number;
}

function OperationOrderHeader({
  manufOrderRef,
  name,
  status,
  priority,
}: OperationOrderHeaderProps) {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        {manufOrderRef && (
          <Text style={styles.textImportant}>{manufOrderRef}</Text>
        )}
        {name && <Text style={styles.textSecondary}>{name}</Text>}
      </View>
      <View style={styles.badgeContainer}>
        {status && (
          <Badge
            color={OperationOrder.getStatusColor(status, Colors)}
            title={OperationOrder.getStatus(status, I18n)}
          />
        )}
        {priority && (
          <Badge
            color={Colors.priorityColor}
            title={priority.toString()}
            style={styles.badge}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginRight: 10,
  },
  badgeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 20,
    flexDirection: 'row-reverse',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 24,
  },
  textImportant: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSecondary: {
    fontSize: 14,
  },
});

export default OperationOrderHeader;
