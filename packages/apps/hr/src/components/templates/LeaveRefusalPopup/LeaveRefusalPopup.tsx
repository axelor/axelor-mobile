/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {RefusalPopup} from '../../molecules';
import {rejectLeave} from '../../../features/leaveSlice';

interface LeaveRefusalPopupProps {
  isOpen: boolean;
  leaveId: number;
  leaveVersion: number;
  onCancel: () => void;
}

const LeaveRefusalPopup = ({
  isOpen,
  leaveId,
  leaveVersion,
  onCancel,
}: LeaveRefusalPopupProps) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  const rejectLeaveAPI = useCallback(
    (refusalMessage: string) => {
      dispatch(
        (rejectLeave as any)({
          leaveRequestId: leaveId,
          version: leaveVersion,
          user: user,
          groundForRefusal: refusalMessage,
        }),
      );
    },
    [dispatch, leaveId, leaveVersion, user],
  );

  return (
    <RefusalPopup
      isOpen={isOpen}
      onCancel={onCancel}
      onValidate={rejectLeaveAPI}
    />
  );
};

export default LeaveRefusalPopup;