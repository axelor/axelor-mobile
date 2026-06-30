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
import {
  BorderBar,
  Card,
  Icon,
  Text,
  useThemeColor,
  Badge,
} from '@axelor/aos-mobile-ui';
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

  const borderColor = useMemo(
    () => getItemColor(Event?.statusSelect, status)?.background,
    [Event?.statusSelect, getItemColor, status],
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <BorderBar style={styles.border} color={borderColor} />
        <View style={styles.columnContainer}>
          <Text>{_date.day}</Text>
          <Text fontSize={25}>{_date.date}</Text>
          <Text>{_date.month}</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text>{startTime}</Text>
          <Text>{endTime}</Text>
        </View>
        <View style={styles.containerRight}>
          <Text writingType="important">{eventName}</Text>
          <Badge
            title={getItemTitle(Event?.typeSelect, category)}
            color={getItemColor(Event?.typeSelect, category)}
          />
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingRight: 12,
    gap: 10,
  },
  border: {
    alignSelf: 'stretch',
    marginVertical: 6,
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerRight: {
    flexDirection: 'column',
    flex: 1,
    gap: 8,
  },
});

export default EventCard;
