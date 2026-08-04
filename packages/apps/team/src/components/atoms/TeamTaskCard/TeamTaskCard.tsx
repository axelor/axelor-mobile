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
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface TeamTaskCardProps {
  name: string;
  priority: string;
  status: string;
  assignedTo?: {fullName?: string};
  team?: {name?: string};
  taskDate?: string;
  taskDeadline?: string;
  onPress?: () => void;
}

const TeamTaskCard = ({
  name,
  priority,
  status,
  assignedTo,
  team,
  taskDate,
  taskDeadline,
  onPress,
}: TeamTaskCardProps) => {
  const I18n = useTranslator();
  const {TeamTask} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const borderColor = useMemo(
    () => getItemColor(TeamTask?.status, status)?.background,
    [TeamTask?.status, getItemColor, status],
  );

  return (
    <ObjectCard
      showArrow={false}
      leftContainerFlex={2}
      onPress={onPress}
      borderLeftColor={borderColor}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true},
          {
            iconName: 'person-fill',
            indicatorText: `${I18n.t('Team_AssignedTo')} :`,
            displayText: assignedTo?.fullName,
            hideIf: assignedTo?.fullName == null,
          },
          {
            iconName: 'people-fill',
            indicatorText: `${I18n.t('Team_Team')} :`,
            displayText: team?.name,
            hideIf: team?.name == null,
          },
          {
            iconName: 'calendar-event',
            indicatorText: `${I18n.t('Team_TaskDate')} :`,
            displayText: formatDate(taskDate!, I18n.t('Base_DateFormat')),
            hideIf: taskDate == null,
          },
          {
            iconName: 'calendar-check',
            indicatorText: `${I18n.t('Team_TaskDeadline')} :`,
            displayText: formatDate(taskDeadline!, I18n.t('Base_DateFormat')),
            hideIf: taskDeadline == null,
          },
        ],
      }}
      sideBadges={{
        style: styles.badgeWrapper,
        items: [
          {
            displayText: getItemTitle(TeamTask?.priority, priority),
            color: getItemColor(TeamTask?.priority, priority),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  badgeWrapper: {
    alignItems: 'flex-end',
  },
});

export default TeamTaskCard;
