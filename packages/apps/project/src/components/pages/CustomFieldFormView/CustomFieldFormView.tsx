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

import React, {useMemo, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
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
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {CustomFieldPopup, TaskDetailsHeader} from '../../molecules';

const SectionHeader = ({title, expanded, onPress, onEdit}) => (
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

const CustomSection = ({
  title,
  expanded,
  toggleSection,
  onEdit,
  fieldType,
  modelId,
  refreshKey,
}) => (
  <>
    <SectionHeader
      title={title}
      expanded={expanded}
      onPress={() => toggleSection(fieldType)}
      onEdit={() => onEdit(fieldType, title)}
    />
    {expanded && (
      <>
        <CustomFieldForm
          model="com.axelor.apps.project.db.ProjectTask"
          fieldType={fieldType}
          modelId={modelId}
          style={styles.form}
          readonly
          key={refreshKey}
        />
        <HorizontalRule style={styles.horizontalRule} />
      </>
    )}
  </>
);

const CustomFieldFormView = ({projecTaskId, config}) => {
  const I18n = useTranslator();
  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  const [expandedSections, setExpandedSections] = useState({
    appJson: true,
    projectJson: true,
    categoryJson: true,
  });
  const [editingParams, setEditingParams] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
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

  const onRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
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
      <ScrollView
        style={styles.scrollView}
        refresh={{fetcher: onRefresh, loading: false}}>
        {configArray.includes('app') && (
          <CustomSection
            title={I18n.t('Project_ProjectAppCustomField')}
            expanded={expandedSections.appJson}
            toggleSection={toggleSection}
            onEdit={openEditPopup}
            fieldType="appJson"
            modelId={projectTask.id}
            refreshKey={refreshKey}
          />
        )}
        {configArray.includes('project') && (
          <CustomSection
            title={I18n.t('Project_ProjectCustomField')}
            expanded={expandedSections.projectJson}
            toggleSection={toggleSection}
            onEdit={openEditPopup}
            fieldType="projectJson"
            modelId={projectTask.id}
            refreshKey={refreshKey}
          />
        )}
        {configArray.includes('category') && (
          <CustomSection
            title={I18n.t('Project_CategoryCustomField')}
            expanded={expandedSections.categoryJson}
            toggleSection={toggleSection}
            onEdit={openEditPopup}
            fieldType="categoryJson"
            modelId={projectTask.id}
            refreshKey={refreshKey}
          />
        )}
      </ScrollView>
      <CustomFieldPopup
        editingParams={editingParams}
        onClose={closeEditPopup}
        onSave={onRefresh}
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
    marginVertical: 7,
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
