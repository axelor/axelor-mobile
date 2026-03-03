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
import {DateDisplay, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {Icon, Text} from '@axelor/aos-mobile-ui';

interface FromToDateDisplayProps {
  fromDate: string;
  startOnSelect: number;
  toDate: string;
  endOnSelect: number;
}

const FromToDateDisplay = ({
  fromDate,
  startOnSelect,
  toDate,
  endOnSelect,
}: FromToDateDisplayProps) => {
  const {LeaveRequest} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const renderDate = useCallback((date: string, subtitle: string) => {
    return (
      <View style={styles.dateContainer}>
        <DateDisplay date={date} />
        <Text>{subtitle}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {renderDate(
        fromDate,
        getItemTitle(LeaveRequest?.startOnSelect, startOnSelect),
      )}
      <Icon name="arrow-right" size={30} />
      {renderDate(toDate, getItemTitle(LeaveRequest?.endOnSelect, endOnSelect))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default FromToDateDisplay;
