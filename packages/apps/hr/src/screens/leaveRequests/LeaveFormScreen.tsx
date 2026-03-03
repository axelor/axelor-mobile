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

import React, {useCallback, useEffect, useMemo} from 'react';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchLeaveById, updateLeave} from '../../features/leaveSlice';

const LeaveFormScreen = ({route, navigation}) => {
  const {leaveId} = route.params;
  const _dispatch = useDispatch();

  const {leave} = useSelector(state => state.hr_leave);
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    _dispatch((fetchLeaveById as any)({leaveId}));
  }, [_dispatch, leaveId]);

  const updateLeaveApi = useCallback(
    (objectState, dispatch) => {
      dispatch(
        (updateLeave as any)({
          leave: {
            ...objectState,
            fromDateT: objectState.perdiodDate.fromDateT.toISOString(),
            toDateT: objectState.perdiodDate.toDateT.toISOString(),
            startOnSelect: objectState.perdiodDate.startOnSelect,
            endOnSelect: objectState.perdiodDate.endOnSelect,
          },
          userId: user.id,
          companyId: user.activeCompany?.id,
        }),
      );

      navigation.pop();
    },
    [navigation, user],
  );

  const _defaultValue = useMemo(
    () =>
      leaveId === leave?.id
        ? {
            ...leave,
            perdiodDate: {
              fromDateT: new Date(leave?.fromDateT),
              toDateT: new Date(leave?.toDateT),
              startOnSelect: leave?.startOnSelect,
              endOnSelect: leave?.endOnSelect,
              isDateError: false,
              isStartEndError: false,
            },
            perdiodDateError: 'OK',
          }
        : null,
    [leaveId, leave],
  );

  return (
    <FormView
      formKey="hr_Leave"
      defaultValue={_defaultValue}
      defaultEditMode
      actions={[
        {
          key: 'update_leave',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({dispatch, objectState}) =>
            updateLeaveApi(objectState, dispatch),
        },
      ]}
    />
  );
};

export default LeaveFormScreen;
