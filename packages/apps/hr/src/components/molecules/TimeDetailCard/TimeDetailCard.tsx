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
import {useTranslator} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimeCard} from '../../atoms';

interface TimeDetailCardProps {
  mode: number;
  statusSelect: number;
  project?: string;
  task?: string;
  manufOrder?: string;
  operation?: string;
  comments?: string;
  date: string;
  duration: number | string;
  durationUnit: string;
  isSmallCard?: boolean;
  isActions?: boolean;
  canEdit?: boolean;
  showTrash?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TimeDetailCard = ({
  mode,
  statusSelect,
  project,
  task,
  manufOrder,
  operation,
  comments,
  date,
  duration,
  durationUnit,
  isSmallCard,
  showTrash = true,
  canEdit = true,
  isActions = true,
  onEdit = () => {},
  onDelete = () => {},
}: TimeDetailCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <ActionCard
      translator={I18n.t}
      actionList={
        isActions && [
          {
            iconName: canEdit ? 'pencil-fill' : 'file-earmark-text',
            helper: I18n.t(canEdit ? 'Hr_Edit' : 'Hr_See'),
            onPress: onEdit,
          },
          {
            iconName: 'trash3-fill',
            iconColor: Colors.errorColor.background,
            helper: I18n.t('Hr_Delete'),
            onPress: onDelete,
            hidden: !showTrash,
          },
        ]
      }>
      <TimeCard
        mode={mode}
        statusSelect={statusSelect}
        project={project}
        task={task}
        manufOrder={manufOrder}
        operation={operation}
        comments={comments}
        date={date}
        duration={duration}
        durationUnit={durationUnit}
        isSmallCard={isSmallCard}
      />
    </ActionCard>
  );
};

export default TimeDetailCard;
