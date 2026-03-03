/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text, useThemeColor, Badge} from '@axelor/aos-mobile-ui';
import {
  getFullDateItems,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';

interface EventCardProps {
  style?: any;
  startDate: Date;
  endDate: Date;
  status: number;
  category: number;
  eventName: string;
  onPress: () => void;
}

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
  const {Event} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const _date = useMemo(
    () => getFullDateItems(startDate.toISOString(), I18n),
    [I18n, startDate],
  );

  const startTime = useMemo(() => formatTime(startDate), [startDate]);
  const endTime = useMemo(() => formatTime(endDate), [endDate]);

  const borderStyle = useMemo(() => {
    return getStyles(getItemColor(Event?.statusSelect, status)?.background)
      .border;
  }, [Event?.statusSelect, getItemColor, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.containerChild}>
          <View style={styles.containerLeft}>
            <Text>{_date.day}</Text>
            <Text style={styles.textNumber}>{_date.date}</Text>
            <Text>{_date.month}</Text>
          </View>
          <View style={styles.containerMid}>
            <Text>{startTime}</Text>
            <Text>{endTime}</Text>
          </View>
          <View style={styles.containerRight}>
            <Text style={styles.bold}>{eventName}</Text>
            <Badge
              title={getItemTitle(Event?.typeSelect, category)}
              style={styles.badge}
              color={getItemColor(Event?.typeSelect, category)}
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

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 20,
  },
  containerChild: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerMid: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerRight: {
    flexDirection: 'column',
    flex: 4,
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
