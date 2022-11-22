import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Badge,
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import ManufacturingOrder from '../../../types/manufacturing-order';
import {formatDuration} from '../../../utils/time';

interface OperationOrderCardProps {
  style?: any;
  status: number;
  operationName: string;
  workcenter: string;
  plannedDuration?: string;
  priority: number;
  onPress: (any?: any) => void;
}

const OperationOrderCard = ({
  style,
  status,
  operationName,
  workcenter,
  plannedDuration,
  priority,
  onPress,
}: OperationOrderCardProps) => {
  const Colors = useThemeColor();

  const borderStyle = useMemo(() => {
    return getStyles(
      ManufacturingOrder.getStatusColor(status, Colors).background,
    )?.border;
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{operationName}</Text>
          <Text style={styles.txtDetails}>{workcenter}</Text>
          {plannedDuration != null && (
            <LabelText
              iconName="stopwatch"
              title={formatDuration(plannedDuration)}
            />
          )}
        </View>
        <View style={styles.rightContainer}>
          {priority == null ? null : (
            <Badge
              color={Colors.priorityColor}
              title={priority.toString()}
              style={styles.badge}
            />
          )}
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
    border: {borderLeftWidth: 7, borderLeftColor: color},
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
  },
  badge: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginBottom: 10,
  },
});

export default OperationOrderCard;
