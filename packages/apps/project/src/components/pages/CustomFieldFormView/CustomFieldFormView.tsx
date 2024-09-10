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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomFieldForm, useSelector} from '@axelor/aos-mobile-core';
import {Button, HeaderContainer, ScrollView, Text} from '@axelor/aos-mobile-ui';
import {TaskDetailsHeader} from '../../molecules';

const PhantomComponent = ({objectState, onChange, title}) => {
  useEffect(() => {
    onChange(objectState);
  }, [objectState, onChange]);

  return (
    <View style={styles.validationButton}>
      <Text>{title}</Text>
      <Button iconName="check-lg" width={50} />
    </View>
  );
};

const CustomFieldFormView = ({projecTaskId}) => {
  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  const renderPhantomComponent = useCallback(({objectState = {}, title}) => {
    return (
      <PhantomComponent
        onChange={() => {}}
        objectState={objectState}
        title={title}
      />
    );
  }, []);

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
            customComponent={({objectState}) =>
              renderPhantomComponent({
                objectState,
                title: 'Sale_ProjectAppCustomField',
              })
            }
          />
        </View>
        <Text>projectJson</Text>
        <CustomFieldForm
          model="com.axelor.apps.project.db.ProjectTask"
          fieldType="projectJson"
          modelId={projectTask.id}
          readonly
          customComponent={({objectState}) =>
            renderPhantomComponent({
              objectState,
              title: 'Sale_ProjectCustomField',
            })
          }
        />
        <Text>categoryJson</Text>
        <View style={styles.form}>
          <CustomFieldForm
            model="com.axelor.apps.project.db.ProjectTask"
            fieldType="categoryJson"
            modelId={projectTask.id}
            readonly
            customComponent={({objectState}) =>
              renderPhantomComponent({
                objectState,
                title: 'Sale_CategoryCustomField',
              })
            }
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
  validationButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
});

export default CustomFieldFormView;
