import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, LabelText, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import ManufacturingOrder from '../../../types/manufacturing-order';

interface ManufacturingOrderHeaderProps {
  reference: string;
  status: number;
  priority: number;
  parentMO?: any;
}

const ManufacturingOrderHeader = ({
  reference,
  status,
  priority,
  parentMO = null,
}: ManufacturingOrderHeaderProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        {reference != null && (
          <Text style={styles.text_important}>{reference}</Text>
        )}
        {parentMO != null && (
          <LabelText iconName="sitemap" title={parentMO.manufOrderSeq} />
        )}
      </View>
      <View style={styles.badgeContainer}>
        {status == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={
              ManufacturingOrder.getStatusColor(status, Colors).backgroundColor
            }
            title={ManufacturingOrder.getStatus(status, I18n)}
          />
        )}
        {priority == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={
              ManufacturingOrder.getPriorityColor(priority, Colors)
                .backgroundColor
            }
            title={ManufacturingOrder.getPriority(priority, I18n)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  badgeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 32,
    flexDirection: 'row-reverse',
  },
  text_important: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
});

export default ManufacturingOrderHeader;
