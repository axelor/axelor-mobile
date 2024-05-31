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
import {MultiValuePicker, ToggleButton} from '@axelor/aos-mobile-ui';
import {ProjectSearchBar} from '../../templates';

const TaskSearchHeader = ({
  isAssignedToMe,
  setIsAssignedToMe,
  statusList,
  setSelectedStatus,
  priorityList,
  setSelectedPriority,
  project,
  setProject,
}) => {
  return (
    <>
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
        <ProjectSearchBar
          style={styles.searchBar}
          showTitle={false}
          onChange={setProject}
          defaultValue={project}
        />
      </View>
      <View style={styles.pickerContainer}>
        <MultiValuePicker
          style={styles.picker}
          listItems={statusList}
          onValueChange={setSelectedStatus}
        />
        <MultiValuePicker
          style={styles.picker}
          listItems={priorityList}
          onValueChange={setSelectedPriority}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  toggleButton: {
    height: 40,
  },
  searchBar: {
    width: '85%',
  },
  picker: {
    width: '42%',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default TaskSearchHeader;
