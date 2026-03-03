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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {DateDisplay, useTranslator} from '@axelor/aos-mobile-core';
import {Icon, Text} from '@axelor/aos-mobile-ui';

interface DateItemProps {
  title: string;
  value?: string;
}

const DatesDisplay = ({
  fromDate,
  toDate,
}: {
  fromDate?: string;
  toDate?: string;
}) => {
  const I18n = useTranslator();

  const renderDateItem = useCallback(
    ({title, value}: DateItemProps) => {
      if (!value) {
        return null;
      }

      return (
        <View style={styles.dateWrapper}>
          <Text style={styles.centerText}>{I18n.t(title)}</Text>
          <DateDisplay date={value} />
        </View>
      );
    },
    [I18n],
  );

  return (
    <View style={styles.dateContainer}>
      {renderDateItem({title: 'Project_StartedOn', value: fromDate})}
      <Icon
        name="arrow-right"
        size={30}
        style={styles.icon}
        visible={fromDate != null && toDate != null}
      />
      {renderDateItem({title: 'Project_EndedOn', value: toDate})}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 2,
  },
  dateWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
});

export default DatesDisplay;
