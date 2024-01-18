/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Card, ProgressBar, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {DateDisplay} from '../atoms';
import {ControlEntry} from '../../types';

interface ControlEntryCardProps {
  style?: any;
  onPress?: () => void;
  sampleCount?: number;
  entryDateTime?: string;
  statusSelect?: number;
  name?: string;
}
const ControlEntryCard = ({
  style,
  onPress,
  sampleCount,
  entryDateTime,
  statusSelect,
  name,
}: ControlEntryCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(
      ControlEntry.getStatusColor(statusSelect, Colors)?.background,
    )?.border;
  }, [Colors, statusSelect]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.childrenContainer}>
          <Text style={styles.flex} writingType="title">
            {name}
          </Text>
          <DateDisplay date={entryDateTime} />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.flex}>{`${I18n.t(
            'Quality_Sample',
          )} : ${sampleCount}`}</Text>
          <ProgressBar style={styles.flex} value={50} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 10,
  },
  childrenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {flex: 1},
});

export default ControlEntryCard;
