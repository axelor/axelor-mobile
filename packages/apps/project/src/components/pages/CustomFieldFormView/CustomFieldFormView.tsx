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
import {CustomFieldForm, useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollView, Text} from '@axelor/aos-mobile-ui';
import {TaskDetailsHeader} from '../../molecules';

const CustomFieldFormView = ({projecTaskId}) => {
  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  if (projecTaskId !== projectTask?.id) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TaskDetailsHeader />}
      />
      <ScrollView>
        <Text>appJson</Text>
        <View style={styles.form}>
          <CustomFieldForm
            model="com.axelor.apps.project.db.ProjectTask"
            fieldType="appJson"
            modelId={projectTask.id}
            readonly
          />
        </View>
        <Text>projectJson</Text>
        <CustomFieldForm
          model="com.axelor.apps.project.db.ProjectTask"
          fieldType="projectJson"
          modelId={projectTask.id}
          readonly
        />
        <Text>categoryJson</Text>
        <View style={styles.form}>
          <CustomFieldForm
            model="com.axelor.apps.project.db.ProjectTask"
            fieldType="categoryJson"
            modelId={projectTask.id}
            readonly
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 150,
  },
  scrollView: {
    height: null,
  },
  form: {
    flex: 1,
  },
});

export default CustomFieldFormView;
