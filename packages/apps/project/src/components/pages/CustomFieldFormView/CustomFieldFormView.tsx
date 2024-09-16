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

import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomFieldForm,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  HeaderContainer,
  HorizontalRule,
  Icon,
  Text,
} from '@axelor/aos-mobile-ui';
import {CustomFieldPopup, TaskDetailsHeader} from '../../molecules';

const CustomComponent = ({onPress, onEdit, title, expanded}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text writingType="title">{title}</Text>
      <View style={styles.iconContainer}>
        <Icon
          touchable={true}
          onPress={onPress}
          name={expanded ? 'chevron-up' : 'chevron-down'}
          style={styles.icon}
        />
        <Icon touchable={true} onPress={onEdit} name="pencil-fill" />
      </View>
    </View>
  );
};

const CustomFieldFormView = ({projecTaskId, config}) => {
  const I18n = useTranslator();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  const [expandedSections, setExpandedSections] = useState({
    app: true,
    project: true,
    category: true,
  });
  const [editingParams, setEditingParams] = useState(null);

  const toggleSection = section => {
    setExpandedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const openEditPopup = (fieldType, title) => {
    setEditingParams({fieldType, title});
  };

  const closeEditPopup = () => {
    setEditingParams(null);
  };
  const configArray = useMemo(() => config.split(','), [config]);

  const renderCustomComponent = useCallback(
    ({title, expanded, onPress, onEdit}) => {
      return (
        <CustomComponent
          onPress={onPress}
          onEdit={onEdit}
          title={title}
          expanded={expanded}
        />
      );
    },
    [],
  );

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
        {configArray.includes('app') && (
          <>
            {renderCustomComponent({
              title: I18n.t('Project_ProjectAppCustomField'),
              expanded: expandedSections.app,
              onPress: () => toggleSection('app'),
              onEdit: () =>
                openEditPopup(
                  'appJson',
                  I18n.t('Project_ProjectAppCustomField'),
                ),
            })}
            {expandedSections.app && (
              <>
                <CustomFieldForm
                  model="com.axelor.apps.project.db.ProjectTask"
                  fieldType="appJson"
                  modelId={projectTask.id}
                  style={styles.form}
                  readonly
                />
                <HorizontalRule style={styles.horizontalRule} />
              </>
            )}
          </>
        )}
        {configArray.includes('project') && (
          <>
            {renderCustomComponent({
              title: I18n.t('Project_ProjectCustomField'),
              expanded: expandedSections.project,
              onPress: () => toggleSection('project'),
              onEdit: () =>
                openEditPopup(
                  'projectJson',
                  I18n.t('Project_ProjectCustomField'),
                ),
            })}
            {expandedSections.project && (
              <>
                <CustomFieldForm
                  model="com.axelor.apps.project.db.ProjectTask"
                  fieldType="projectJson"
                  modelId={projectTask.id}
                  style={styles.form}
                  readonly
                />
                <HorizontalRule style={styles.horizontalRule} />
              </>
            )}
          </>
        )}
        {configArray.includes('category') && (
          <>
            {renderCustomComponent({
              title: I18n.t('Project_CategoryCustomField'),
              expanded: expandedSections.category,
              onPress: () => toggleSection('category'),
              onEdit: () =>
                openEditPopup(
                  'categoryJson',
                  I18n.t('Project_CategoryCustomField'),
                ),
            })}
            {expandedSections.category && (
              <>
                <CustomFieldForm
                  model="com.axelor.apps.project.db.ProjectTask"
                  fieldType="categoryJson"
                  modelId={projectTask.id}
                  readonly
                  style={styles.form}
                />
                <HorizontalRule style={styles.horizontalRule} />
              </>
            )}
          </>
        )}
      </ScrollView>
      <CustomFieldPopup
        editingParams={editingParams}
        onClose={closeEditPopup}
        onSave={closeEditPopup}
        projectTaskId={projectTask?.id}
        translator={I18n.t}
      />
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
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  horizontalRule: {
    marginVertical: 12,
    width: '90%',
    alignSelf: 'center',
  },
});

export default CustomFieldFormView;
