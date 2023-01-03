import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text, useThemeColor, Badge} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import EventType from '../../../types/event-type';

interface EventCardProps {
  style?: any;
  startDate: Date;
  endDate: Date;
  status: number;
  category: number;
  eventName: string;
  onPress: () => void;
}
const EventCard = ({
  style,
  startDate = new Date(),
  endDate = new Date(),
  status = 1,
  category = 3,
  eventName = 'Event name',
  onPress,
}: EventCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  var dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayString = dayOfWeek[startDate.getDay()];
  const day = startDate.getUTCDay();
  const startHours = startDate.getHours();
  const startMin = startDate.getMinutes();
  const endHours = endDate.getHours();
  const endMin = endDate.getMinutes();

  const borderStyle = useMemo(() => {
    return getStyles(EventType.getStatusBorderColor(status, Colors)).border;
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.containerChild}>
          <View style={styles.containerLeft}>
            <Text style={styles.textNumber}>{day}</Text>
            <Text>{dayString.slice(0, 3)}</Text>
          </View>
          <View style={styles.containerMid}>
            <Text>
              {startHours}:{startMin}
            </Text>
            <Text>
              {endHours}:{endMin}
            </Text>
          </View>
          <View style={styles.containerRight}>
            <Text style={styles.bold}>{eventName}</Text>
            <Badge
              title={EventType.getCategory(category, I18n)}
              style={styles.badge}
              color={EventType.getCategoryColor(category, Colors)}
              //txtStyle={styles.badgeInfos}
            />
          </View>
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

const getStyles = (color: {}) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 7,
    borderLeftColor: 'red',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.9,
  },
  containerChild: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLeft: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerMid: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: '7%',
  },
  containerRight: {
    flexDirection: 'column',
  },
  textNumber: {
    fontSize: 25,
  },
  bold: {
    fontWeight: 'bold',
  },
  badge: {
    marginTop: '7%',
  },
});

export default EventCard;
