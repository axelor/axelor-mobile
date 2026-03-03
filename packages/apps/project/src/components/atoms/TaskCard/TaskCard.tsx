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
import {
  Icon,
  ObjectCard,
  ProgressBar,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  DateDisplay,
  useTypeHelpers,
  useSelector,
} from '@axelor/aos-mobile-core';

interface TaskCardProps {
  style?: any;
  name?: string;
  assignedTo?: string;
  taskDeadline?: string;
  parentTask?: string;
  progress?: number;
  priority?: any;
  status?: any;
  isCopyCard?: boolean;
  showArrow?: boolean;
  onPress?: () => void;
}

const TaskCard = ({
  style,
  name,
  assignedTo,
  taskDeadline,
  parentTask,
  progress,
  priority,
  status,
  isCopyCard = false,
  showArrow = true,
  onPress,
}: TaskCardProps) => {
  const {getItemColorFromIndex} = useTypeHelpers();
  const Colors = useThemeColor();

  const {projectTaskStatusList, projectPriorityList} = useSelector(
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
      onPress={onPress}
      style={[borderStyle, styles.card, style]}
      iconLeftMargin={30}
      leftContainerFlex={2}
      showArrow={showArrow}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true},
          {
            indicatorText: assignedTo,
            hideIfNull: true,
            iconName: 'pin-angle-fill',
          },
          {
            indicatorText: parentTask,
            hideIfNull: true,
            iconName: 'diagram-3-fill',
            numberOfLines: 2,
          },
        ],
      }}
      sideBadges={{
        style: isCopyCard && styles.badge,
        items: [
          {
            customComponent: <DateDisplay date={taskDeadline} size={16} />,
          },
          {
            customComponent: (
              <ProgressBar
                style={styles.progressBar}
                value={progress}
                showPercent={false}
                height={15}
                styleTxt={styles.textProgressBar}
              />
            ),
          },
          {
            displayText: priority?.name,
            color: getItemColorFromIndex(projectPriorityList, priority),
            showIf: priority != null,
          },
          isCopyCard && {
            customComponent: (
              <Icon name="copy" color={Colors.secondaryColor.background} />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    padding: 0,
    marginRight: 5,
    paddingRight: 5,
    flex: 1,
  },
  progressBar: {
    borderRadius: 20,
    marginVertical: 5,
  },
  textProgressBar: {
    display: 'none',
  },
  badge: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default TaskCard;
