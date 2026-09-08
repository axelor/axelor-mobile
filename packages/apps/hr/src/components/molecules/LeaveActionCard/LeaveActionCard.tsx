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
import {useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {useLeaveRequestRights} from '../../../hooks';
import {LeaveCard} from '../../atoms';

interface LeaveActionCardProps {
  mode: number;
  leave: any;
  onPress: () => void;
  onSend: () => void;
  onValidate: () => void;
  onEdit: () => void;
}

const LeaveActionCard = ({
  mode,
  leave,
  onPress,
  onSend,
  onValidate,
  onEdit,
}: LeaveActionCardProps) => {
  const I18n = useTranslator();
  const {LeaveRequest} = useTypes();
  const {canValidate, canEdit} = useLeaveRequestRights(leave);

  return (
    <ActionCard
      translator={I18n.t}
      actionList={
        canEdit || canValidate
          ? [
              {
                iconName: 'send-fill',
                helper: I18n.t('Hr_Send'),
                onPress: onSend,
                hidden: leave.statusSelect !== LeaveRequest?.statusSelect.Draft,
              },
              {
                iconName: 'pencil-fill',
                helper: I18n.t('Hr_Edit'),
                onPress: onEdit,
                hidden: !canEdit,
              },
              {
                iconName: 'check-lg',
                helper: I18n.t('Hr_Validate'),
                onPress: onValidate,
                hidden: !canValidate,
              },
            ]
          : []
      }>
      <LeaveCard
        mode={mode}
        leaveId={leave.id}
        statusSelect={leave.statusSelect}
        startDate={leave.fromDateT}
        endDate={leave.toDateT}
        duration={leave.duration}
        durationUnitSelect={leave.leaveReason?.unitSelect}
        reason={leave.leaveReason?.name}
        company={leave.company?.name}
        employee={leave.employee?.name}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default LeaveActionCard;
