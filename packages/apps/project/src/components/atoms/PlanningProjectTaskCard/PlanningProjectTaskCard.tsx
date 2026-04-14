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
import {ObjectCard, ProgressBar} from '@axelor/aos-mobile-ui';

interface PlanningProjectTaskCardProps {
  style?: any;
  name?: string;
  projectName?: string;
  assignedTo?: string;
  status?: any;
  progress?: number;
  priority?: any;
}

const PlanningProjectTaskCard = ({
  style,
  name,
  projectName,
  assignedTo,
  status,
  progress,
  priority,
}: PlanningProjectTaskCardProps) => {
  const {getItemColorFromIndex} = useTypeHelpers();

  const {projectTaskStatusList, projectPriorityList} = useSelector(
    state => state.project_projectTask,
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
      upperBadges={{
        fixedOnRightSide: true,
        items: [
          {
            showIf: priority != null,
            displayText: priority?.name,
            color: getItemColorFromIndex(projectPriorityList, priority),
          },
          {
            customComponent: (progress != null ? (
              <ProgressBar
                style={styles.progressBar}
                value={progress}
                showPercent={false}
                height={15}
                styleTxt={styles.textProgressBar}
              />
            ) : null) as any,
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
  progressBar: {
    marginVertical: 5,
    width: '30%',
  },
  textProgressBar: {
    display: 'none',
  },
});

export default PlanningProjectTaskCard;
