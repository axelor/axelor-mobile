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
import {TaskPriorityPicker, TaskStatusPicker} from '../../organisms';

type SetterFunction<T> = (value: T | ((_current: T) => T)) => void;

const TeamTaskFilters = ({
  setSelectedStatus,
  setSelectedPriority,
}: {
  setSelectedStatus: SetterFunction<any[]>;
  setSelectedPriority: SetterFunction<any[]>;
}) => {
  return (
    <View style={styles.rowWrapper}>
      <TaskStatusPicker
        style={styles.flex}
        onChange={setSelectedStatus}
        showTitle={false}
        isMultiValue
      />
      <TaskPriorityPicker
        style={styles.flex}
        onChange={setSelectedPriority}
        showTitle={false}
        isMultiValue
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    zIndex: 1,
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 5,
  },
  flex: {
    flex: 1,
  },
});

export default TeamTaskFilters;
