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

import React, {useCallback, useMemo} from 'react';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {sendLeave, validateLeave} from '../../../features/leaveSlice';
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
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
  });

  const {user} = useSelector(state => state.user);

  const userCanValidate = useMemo(
    () =>
      (user.employee?.hrManager ||
        leave.employee?.managerUser?.id === user.id) &&
      leave.statusSelect === LeaveRequest?.statusSelect.WaitingValidation,
    [LeaveRequest?.statusSelect.WaitingValidation, leave, user],
  );

  const isDefaultDisplay = useMemo(
    () =>
      readonly ||
      (!userCanValidate &&
        leave.statusSelect !== LeaveRequest?.statusSelect.Draft),
    [LeaveRequest?.statusSelect, readonly, leave, userCanValidate],
  );

  const sendLeaveAPI = useCallback(() => {
    dispatch(
      (sendLeave as any)({
        leaveRequestId: leave.id,
        version: leave.version,
      }),
    );
  }, [dispatch, leave]);

  const validateLeaveApi = useCallback(() => {
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
        !isDefaultDisplay
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
                hidden: leave.statusSelect !== LeaveRequest?.statusSelect.Draft,
              },
              {
                iconName: 'check-lg',
                helper: I18n.t('Hr_Validate'),
                onPress: validateLeaveApi,
                hidden: leave.statusSelect === LeaveRequest?.statusSelect.Draft,
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
