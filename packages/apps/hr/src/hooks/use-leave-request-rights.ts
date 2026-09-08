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

import {useMemo} from 'react';
import {usePermitted, useSelector, useTypes} from '@axelor/aos-mobile-core';

interface LeaveRequestRights {
  canValidate: boolean;
  canEdit: boolean;
  canCancel: boolean;
  canDelete: boolean;
  canReturnToDraft: boolean;
}

export const useLeaveRequestRights = (
  leaveRequest: any,
): LeaveRequestRights => {
  const {LeaveRequest} = useTypes();
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
  });

  const {user} = useSelector(state => state.user);

  const statusSelect = useMemo(
    () => leaveRequest?.statusSelect,
    [leaveRequest?.statusSelect],
  );
  const hasStatus = useMemo(
    () => statusSelect != null && LeaveRequest?.statusSelect != null,
    [LeaveRequest?.statusSelect, statusSelect],
  );

  const canValidate = useMemo(
    () =>
      hasStatus &&
      statusSelect === LeaveRequest?.statusSelect.WaitingValidation &&
      (user?.employee?.hrManager === true ||
        leaveRequest?.employee?.managerUser?.id === user?.id),
    [
      LeaveRequest?.statusSelect.WaitingValidation,
      hasStatus,
      leaveRequest,
      statusSelect,
      user,
    ],
  );

  return useMemo(
    () => ({
      canValidate,
      canEdit:
        hasStatus &&
        !readonly &&
        (statusSelect === LeaveRequest?.statusSelect.Draft ||
          statusSelect === LeaveRequest?.statusSelect.Canceled ||
          canValidate),
      canCancel:
        hasStatus &&
        !readonly &&
        statusSelect !== LeaveRequest?.statusSelect.Canceled,
      canDelete:
        hasStatus &&
        canDelete &&
        statusSelect === LeaveRequest?.statusSelect.Draft,
      canReturnToDraft:
        hasStatus &&
        !readonly &&
        (statusSelect === LeaveRequest?.statusSelect.Refused ||
          statusSelect === LeaveRequest?.statusSelect.Canceled),
    }),
    [
      LeaveRequest?.statusSelect,
      canDelete,
      canValidate,
      hasStatus,
      readonly,
      statusSelect,
    ],
  );
};
