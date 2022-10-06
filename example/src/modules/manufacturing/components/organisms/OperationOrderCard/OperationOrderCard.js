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
import ManufacturingOrder from '@/modules/manufacturing/types/manufacturing-order';
import {formatDuration} from '@/modules/manufacturing/utils/time';

const OperationOrderCard = ({
  style,
  status,
  operationName,
  workcenter,
  plannedDuration,
  priority,
  onPress,
}) => {
  const Colors = useThemeColor();

  const borderStyle = useMemo(() => {
    return getStyles(
      ManufacturingOrder.getStatusColor(status, Colors).borderColor,
    );
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
  },
  badge: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginBottom: 10,
  },
});

export default OperationOrderCard;
