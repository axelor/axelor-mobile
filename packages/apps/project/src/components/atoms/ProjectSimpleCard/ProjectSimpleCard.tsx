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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useTypeHelpers} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface ProjectSimpleCardProps {
  style?: any;
  onPress: () => void;
  name: string;
  code: string;
  projectStatus: any;
}

const ProjectSimpleCard = ({
  style,
  onPress,
  name,
  code,
  projectStatus,
}: ProjectSimpleCardProps) => {
  const {getItemColorFromIndex} = useTypeHelpers();

  const {projectStatusList} = useSelector(state => state.project_project);

  const containerStyle = useMemo(() => {
    return (
      projectStatus != null &&
      getStyles(
        getItemColorFromIndex(projectStatusList, projectStatus)?.background,
      )?.container
    );
  }, [getItemColorFromIndex, projectStatus, projectStatusList]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[containerStyle, style]}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true},
          {
            displayText: code,
            hideIfNull: true,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      borderLeftWidth: 7,
      borderLeftColor: color,
      width: '90%',
      alignSelf: 'center',
    },
  });

export default ProjectSimpleCard;
