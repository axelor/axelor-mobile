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
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {RefusalPopup} from '../../molecules';
import {updateTimesheetStatus} from '../../../features/timesheetSlice';

interface TimesheetRefusalPopupProps {
  isOpen: boolean;
  timesheet?: any;
  onCancel: () => void;
}

const TimesheetRefusalPopup = ({
  isOpen,
  timesheet,
  onCancel,
}: TimesheetRefusalPopupProps) => {
  const dispatch = useDispatch();

  const {user} = useSelector((state: any) => state.user);

  const refuseAPI = useCallback(
    (refusalMessage: string) => {
      dispatch(
        (updateTimesheetStatus as any)({
          timesheetId: timesheet.id,
          version: timesheet.version,
          toStatus: 'refuse',
          groundForRefusal: refusalMessage,
          user: user,
        }),
      );
    },
    [dispatch, timesheet, user],
  );

  return (
    <RefusalPopup isOpen={isOpen} onCancel={onCancel} onValidate={refuseAPI} />
  );
};

export default TimesheetRefusalPopup;
