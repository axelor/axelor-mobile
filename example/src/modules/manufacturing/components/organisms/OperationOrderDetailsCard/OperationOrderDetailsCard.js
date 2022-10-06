import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Badge,
  Card,
  Icon,
  Text,
  LabelText,
  useThemeColor,
} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import OperationOrder from '@/modules/manufacturing/types/operation-order';
import {formatDuration} from '@/modules/manufacturing/utils/time';

const OperationOrderDetailsCard = ({
  style,
  status,
  manufOrder,
  operationName,
  workcenter,
  machine,
  plannedStartDate,
  plannedEndDate,
  realStartDate,
  realEndDate,
  plannedDuration,
  priority,
  onPress,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(OperationOrder.getStatusColor(status, Colors).borderColor);
  }, [Colors, status]);

  const [startDate, endDate] = OperationOrder.getDates(
    status,
    plannedStartDate,
    plannedEndDate,
    realStartDate,
    realEndDate,
    I18n,
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{manufOrder}</Text>
          <Text style={styles.txtDetails}>{operationName}</Text>
          <LabelText
            style={styles.txtDetails}
            iconName="pallet"
            title={workcenter + ' ' + (machine && `- ${machine}`)}
          />
          {startDate && <Text style={styles.txtDetails}>{startDate}</Text>}
          {endDate && <Text style={styles.txtDetails}>{endDate}</Text>}
          {(status === OperationOrder.status.InProgress ||
            status === OperationOrder.status.StandBy) && (
            <LabelText
              style={styles.txtDetails}
              iconName="stopwatch"
              title={`${
                plannedDuration ? formatDuration(plannedDuration) : ''
              }`}
            />
          )}
        </View>
        <View style={styles.rightContainer}>
          {priority == null ? null : (
            <Badge
              color={Colors.priorityColor_light}
              title={priority}
              style={styles.badge}
            />
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
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
  rightContainer: {
    width: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
    justifyContent: 'center',
  },
  badge: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginBottom: 10,
  },
});

export default OperationOrderDetailsCard;
