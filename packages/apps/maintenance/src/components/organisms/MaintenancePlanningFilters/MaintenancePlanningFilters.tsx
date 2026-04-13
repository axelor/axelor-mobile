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
import {useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {ChipSelect} from '@axelor/aos-mobile-ui';
import {MachineSearchBar} from '@axelor/aos-mobile-manufacturing';

interface MaintenancePlanningFiltersProps {
  selectedStatus: any[];
  onChangeStatus: (value: any[]) => void;
  selectedMachine?: any;
  onChangeMachine: (value: any) => void;
}

const MaintenancePlanningFilters = ({
  selectedStatus,
  onChangeStatus,
  selectedMachine,
  onChangeMachine,
}: MaintenancePlanningFiltersProps) => {
  const {MaintenanceRequest} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  return (
    <View style={styles.container}>
      <MachineSearchBar
        style={styles.searchBar}
        defaultValue={selectedMachine}
        onChange={onChangeMachine}
        showTitle={false}
      />
      <ChipSelect
        mode="multi"
        chipNumberOfLines={1}
        onChangeValue={onChangeStatus}
        selectionItems={getSelectionItems(
          MaintenanceRequest?.statusSelect,
          selectedStatus,
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchBar: {
    width: '90%',
  },
});

export default MaintenancePlanningFilters;
