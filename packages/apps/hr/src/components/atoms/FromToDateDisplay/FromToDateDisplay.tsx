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

import React from 'react';
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

  return (
    <View style={styles.container}>
      <View>
        <DateDisplay date={fromDate} />
        <Text>{getItemTitle(LeaveRequest?.startOnSelect, startOnSelect)}</Text>
      </View>
      <Icon name="arrow-right" size={30} />
      <View>
        <DateDisplay date={toDate} />
        <Text>{getItemTitle(LeaveRequest?.startOnSelect, endOnSelect)}</Text>
      </View>
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
});

export default FromToDateDisplay;
