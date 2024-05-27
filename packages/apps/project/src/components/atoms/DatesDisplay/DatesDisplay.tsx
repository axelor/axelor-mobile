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
import {DateDisplay} from '@axelor/aos-mobile-core';
import {Icon} from '@axelor/aos-mobile-ui';

const DatesDisplay = ({
  fromDate,
  toDate,
}: {
  fromDate?: string;
  toDate?: string;
}) => {
  return (
    <View style={styles.dateContainer}>
      <DateDisplay date={fromDate} />
      <Icon
        name="arrow-right"
        size={30}
        style={styles.icon}
        visible={fromDate != null && toDate != null}
      />
      <DateDisplay date={toDate} />
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
});

export default DatesDisplay;
