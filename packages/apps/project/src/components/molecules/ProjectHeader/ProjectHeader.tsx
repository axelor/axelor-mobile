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
import {useSelector, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Badge, LabelText, Text, checkNullString} from '@axelor/aos-mobile-ui';

const ProjectHeader = ({}) => {
  const {getItemColorFromIndex} = useTypeHelpers();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {project, projectStatusList} = useSelector(
    state => state.project_project,
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text writingType="title">{project?.name}</Text>
        {baseConfig?.enableMultiCompany && user?.companySet?.length > 1 && (
          <LabelText iconName="building-fill" title={project?.company?.name} />
        )}
        <LabelText
          iconName="pin-angle-fill"
          title={project?.assignedTo?.fullName}
        />
        {!checkNullString(project?.parentProject?.fullName) && (
          <LabelText
            iconName="diagram-3-fill"
            title={project?.parentProject?.fullName}
          />
        )}
      </View>
      {project?.projectStatus != null && (
        <Badge
          title={project?.projectStatus?.name}
          color={getItemColorFromIndex(
            projectStatusList,
            project?.projectStatus,
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
});

export default ProjectHeader;
