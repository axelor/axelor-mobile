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
import {
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
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
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
  });

  const {user} = useSelector((state: any) => state.user);

  const userCanValidate = useMemo(() => {
    return (
      (user.employee?.hrManager ||
        leave.employee?.managerUser?.id === user.id) &&
      leave.statusSelect === LeaveRequest?.statusSelect.WaitingValidation
    );
  }, [LeaveRequest?.statusSelect.WaitingValidation, leave, user]);

  const isDefaultDisplay = useMemo(() => {
    return (
      readonly ||
      (!userCanValidate &&
        leave.statusSelect !== LeaveRequest?.statusSelect.Draft)
    );
  }, [LeaveRequest?.statusSelect, readonly, leave, userCanValidate]);

  return (
    <ActionCard
      translator={I18n.t}
      actionList={
        !isDefaultDisplay && [
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
            hidden: leave.statusSelect !== LeaveRequest?.statusSelect.Draft,
          },
          {
            iconName: 'check-lg',
            helper: I18n.t('Hr_Validate'),
            onPress: onValidate,
            hidden: leave.statusSelect === LeaveRequest?.statusSelect.Draft,
          },
        ]
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
