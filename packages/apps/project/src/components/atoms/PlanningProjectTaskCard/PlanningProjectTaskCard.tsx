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
import {useTypeHelpers, useSelector} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface PlanningProjectTaskCardProps {
  style?: any;
  name?: string;
  projectName?: string;
  assignedTo?: string;
  status?: any;
}

const PlanningProjectTaskCard = ({
  style,
  name,
  projectName,
  assignedTo,
  status,
}: PlanningProjectTaskCardProps) => {
  const {getItemColorFromIndex} = useTypeHelpers();

  const {projectTaskStatusList} = useSelector(
    (state: any) => state.project_projectTask,
  );

  const borderStyle = useMemo(() => {
    return (
      status != null &&
      getStyles(
        getItemColorFromIndex(projectTaskStatusList, status)?.background,
      )?.border
    );
  }, [status, getItemColorFromIndex, projectTaskStatusList]);

  return (
    <ObjectCard
      style={[styles.container, borderStyle, style]}
      touchable={false}
      showArrow={false}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true},
          {displayText: projectName, hideIfNull: true},
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: assignedTo,
            iconName: 'person-fill',
            hideIfNull: true,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 2,
  },
});

export default PlanningProjectTaskCard;
