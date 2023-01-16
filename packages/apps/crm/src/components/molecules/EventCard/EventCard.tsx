import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text, useThemeColor, Badge} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
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

const dayOfWeek = [
  'Crm_Sun',
  'Crm_Mon',
  'Crm_Tue',
  'Crm_Wed',
  'Crm_Thu',
  'Crm_Fri',
  'Crm_Sat',
];

const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

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

  const dayString = dayOfWeek[startDate.getDay()];
  const day = startDate.getDate();

  const startTime = useMemo(() => formatTime(startDate), [startDate]);
  const endTime = useMemo(() => formatTime(endDate), [endDate]);

  const borderStyle = useMemo(() => {
    return getStyles(EventType.getStatusBorderColor(status, Colors)).border;
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.containerChild}>
          <View style={styles.containerLeft}>
            <Text style={styles.textNumber}>{day}</Text>
            <Text>{I18n.t(dayString)}</Text>
          </View>
          <View style={styles.containerMid}>
            <Text>{startTime}</Text>
            <Text>{endTime}</Text>
          </View>
          <View style={styles.containerRight}>
            <Text style={styles.bold}>{eventName}</Text>
            <Badge
              title={EventType.getCategory(category, I18n)}
              style={styles.badge}
              color={EventType.getCategoryColor(category, Colors)}
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
    width: '90%',
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
