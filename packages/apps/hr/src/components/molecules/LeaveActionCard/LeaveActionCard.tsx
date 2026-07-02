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

import React, {useCallback} from 'react';
import {
  useDispatch,
  useNavigation,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {sendLeave, validateLeave} from '../../../features/leaveSlice';
import {useLeaveRequestRights} from '../../../hooks';
import {LeaveCard} from '../../atoms';

interface LeaveActionCardProps {
  mode: number;
  leave: any;
}

const LeaveActionCard = ({mode, leave}: LeaveActionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {LeaveRequest} = useTypes();
  const {canValidate, canEdit} = useLeaveRequestRights(leave);

  const sendLeaveAPI = useCallback(() => {
    dispatch(
      (sendLeave as any)({
        leaveRequestId: leave.id,
        version: leave.version,
      }),
    );
  }, [dispatch, leave]);

  const validateLeaveAPI = useCallback(() => {
    dispatch(
      (validateLeave as any)({
        leaveRequestId: leave.id,
        version: leave.version,
      }),
    );
  }, [dispatch, leave]);

  return (
    <ActionCard
      translator={I18n.t}
      actionList={
        canEdit || canValidate
          ? [
              {
                iconName: 'send-fill',
                helper: I18n.t('Hr_Send'),
                onPress: sendLeaveAPI,
                hidden: leave.statusSelect !== LeaveRequest?.statusSelect.Draft,
              },
              {
                iconName: 'pencil-fill',
                helper: I18n.t('Hr_Edit'),
                onPress: () =>
                  navigation.navigate('LeaveFormScreen', {leaveId: leave.id}),
                hidden: !canEdit,
              },
              {
                iconName: 'check-lg',
                helper: I18n.t('Hr_Validate'),
                onPress: validateLeaveAPI,
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
        onPress={() =>
          navigation.navigate('LeaveDetailsScreen', {leaveId: leave.id})
        }
      />
    </ActionCard>
  );
};

export default LeaveActionCard;
