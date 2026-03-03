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
import {
  FormView,
  headerActionsProvider,
  useSelector,
} from '@axelor/aos-mobile-core';
import {
  createTimesheetLine,
  updateTimesheetLine,
} from '../../features/timesheetLineSlice';

const TimesheetLineFormScreen = ({route, navigation}) => {
  const {timesheetId, timesheetLine} = route?.params;

  const {user} = useSelector(state => state.user);

  const createTimesheetLineAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        createTimesheetLine({
          timesheetLine: {
            ...objectState,
            timesheetId,
            projectId: objectState.project?.id,
            projectTaskId: objectState.projectTask?.id,
            manufOrderId: objectState.manufOrder?.id,
            operationOrderId: objectState.operationOrder?.id,
            productId: objectState.product?.id,
          },
        }),
      );

      navigation.goBack();
    },
    [navigation, timesheetId],
  );

  const updateTimesheetLineAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        updateTimesheetLine({
          timesheetId,
          timesheetLineId: objectState?.id,
          timesheetLine: {
            ...objectState,
            projectId: objectState.project?.id,
            projectTaskId: objectState.projectTask?.id,
            manufOrderId: objectState.manufOrder?.id,
            operationOrderId: objectState.operationOrder?.id,
            productId: objectState.product?.id,
          },
        }),
      );

      navigation.goBack();
    },
    [navigation, timesheetId],
  );

  const defaultValue = useMemo(
    () =>
      timesheetLine != null ? {...timesheetLine, useDuration: true} : null,
    [timesheetLine],
  );

  const creationDefaultValue = useMemo(
    () => ({
      date: new Date().toISOString().split('T')[0],
      product: user?.employee?.product,
      useDuration: true,
    }),
    [user],
  );

  useEffect(() => {
    headerActionsProvider.registerModel('hr_timesheetLine_details', {
      model: 'com.axelor.apps.hr.db.TimesheetLine',
      modelId: timesheetLine?.id,
    });
  }, [timesheetLine?.id]);

  return (
    <FormView
      defaultValue={defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-timesheetLine',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => timesheetLine != null,
          customAction: ({objectState, dispatch}) => {
            return createTimesheetLineAPI(objectState, dispatch);
          },
        },
        {
          key: 'update-timesheetLine',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => timesheetLine == null,
          customAction: ({objectState, dispatch}) => {
            return updateTimesheetLineAPI(objectState, dispatch);
          },
        },
      ]}
      formKey="hr_TimesheetLine"
    />
  );
};

export default TimesheetLineFormScreen;
