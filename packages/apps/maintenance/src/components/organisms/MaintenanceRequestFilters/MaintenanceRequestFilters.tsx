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
import {ToggleButton} from '@axelor/aos-mobile-ui';
import {MachineSearchBar} from '@axelor/aos-mobile-manufacturing';
import {ActionTypePicker} from '../../molecules';

type SetterFunction<T> = (value: T | ((_current: T) => T)) => void;

interface MaintenanceRequestFiltersProps {
  isAssignedToMe: boolean;
  setIsAssignedToMe: SetterFunction<boolean>;
  selectedAction: number;
  setSelectedAction: SetterFunction<number>;
  selectedMachine: any;
  setSelectedMachine: SetterFunction<any>;
}

const MaintenanceRequestFilters = ({
  isAssignedToMe,
  setIsAssignedToMe,
  selectedAction,
  setSelectedAction,
  selectedMachine,
  setSelectedMachine,
}: MaintenanceRequestFiltersProps) => {
  return (
    <View style={styles.headerContainer}>
      <ToggleButton
        isActive={isAssignedToMe}
        onPress={() => setIsAssignedToMe(current => !current)}
        buttonConfig={{
          iconName: 'person-fill',
          width: '10%',
          style: styles.toggleButton,
        }}
      />
      <MachineSearchBar
        style={styles.filter}
        defaultValue={selectedMachine}
        onChange={setSelectedMachine}
        showTitle={false}
      />
      <ActionTypePicker
        style={styles.filter}
        defaultValue={selectedAction}
        onChange={setSelectedAction}
        showTitle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 5,
  },
  toggleButton: {
    height: 40,
  },
  filter: {
    flex: 1,
  },
});

export default MaintenanceRequestFilters;
