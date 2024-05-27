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
import {
  useSelector,
  useTranslator,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  Badge,
  LabelText,
  Text,
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

const ProjectHeader = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {getItemColorFromIndex} = useTypeHelpers();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {project, projectStatusList} = useSelector(
    state => state.project_project,
  );

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        <Text writingType="title">{project?.name}</Text>
        {baseConfig?.enableMultiCompany && user?.companySet?.length > 1 && (
          <LabelText
            iconName="building-fill"
            size={16}
            title={project?.company?.name}
            textStyle={styles.labelText}
          />
        )}
        <LabelText
          iconName="pin-angle-fill"
          size={16}
          title={project?.assignedTo?.fullName}
          textStyle={styles.labelText}
        />
        {!checkNullString(project?.parentProject?.fullName) && (
          <LabelText
            iconName="diagram-3-fill"
            size={16}
            title={project?.parentProject?.fullName}
            textStyle={styles.labelText}
          />
        )}
      </View>
      <View style={[styles.columnContainer, styles.alignEnd]}>
        {project?.projectStatus != null && (
          <Badge
            title={project?.projectStatus?.name}
            color={getItemColorFromIndex(
              projectStatusList,
              project?.projectStatus,
            )}
            style={styles.badge}
          />
        )}
        {project?.isBusinessProject && (
          <Badge
            title={I18n.t('Project_Business')}
            color={Colors.infoColor}
            style={styles.badge}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnContainer: {
    flexDirection: 'column',
    marginBottom: 3,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 16,
    marginBottom: 3,
  },
  badge: {
    marginTop: 3,
  },
});

export default ProjectHeader;
