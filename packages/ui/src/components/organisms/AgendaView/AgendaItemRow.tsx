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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {HorizontalRule, Text} from '../../atoms';
import {ItemHours} from './types';

interface AgendaItemRowProps extends ItemHours {
  isFirst?: boolean;
  children: React.ReactNode;
}

const AgendaItemRow = ({
  startHour,
  endHour,
  isFirst = false,
  children,
}: AgendaItemRowProps) => {
  const Colors = useThemeColor();

  return (
    <View>
      {isFirst && (
        <HorizontalRule
          style={styles.rule}
          color={Colors.secondaryColor.background_light}
        />
      )}
      <View style={styles.container}>
        <View style={styles.hours}>
          {startHour != null && <Text style={styles.hour}>{startHour}</Text>}
          {endHour != null && <Text style={styles.hour}>{endHour}</Text>}
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rule: {
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    flexDirection: 'column',
    gap: 2,
  },
  hour: {
    textAlign: 'center',
  },
  content: {
    alignSelf: 'flex-end',
    flex: 1,
  },
});

export default AgendaItemRow;
