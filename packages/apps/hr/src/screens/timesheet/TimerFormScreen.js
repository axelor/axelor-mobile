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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useConfig} from '@axelor/aos-mobile-ui';
import {
  FormView,
  isEmpty,
  useDispatch,
  useIsFocused,
  useSelector,
} from '@axelor/aos-mobile-core';
import {
  fetchActiveTimer,
  fetchTimerById,
  updateTimer,
} from '../../features/timerSlice';
import {TimerListAlert} from '../../components';

const TIMER_STATUS = {
  Draft: 1,
  Start: 2,
  Pause: 3,
  Stop: 4,
};

const TimerFormScreen = ({route}) => {
  const isCreation = route?.params?.isCreation;
  const idTimerToUpdate = route?.params?.idTimerToUpdate;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {setActivityIndicator} = useConfig();

  const [creation, setCreation] = useState(isCreation ?? false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {timer, loadingCreation} = useSelector(state => state.hr_timer);

  useEffect(() => {
    if (isFocused && !timesheetConfig?.isMultipleTimerEnabled) {
      if (timer?.id) {
        dispatch(fetchTimerById({timerId: timer?.id}));
      } else {
        dispatch(fetchActiveTimer({userId: user?.id}));
      }
    } else if (isFocused && !creation && !loadingCreation) {
      idTimerToUpdate
        ? dispatch(fetchTimerById({timerId: idTimerToUpdate}))
        : dispatch(fetchActiveTimer({userId: user?.id}));
    }
  }, [
    creation,
    dispatch,
    idTimerToUpdate,
    isFocused,
    loadingCreation,
    timer?.id,
    timesheetConfig?.isMultipleTimerEnabled,
    user?.id,
  ]);

  useEffect(() => {
    setActivityIndicator(loadingCreation);
  }, [loadingCreation, setActivityIndicator]);

  const defaultValue = useMemo(() => {
    const DEFAULT = {
      startDateTime: new Date().toISOString(),
      product: user?.employee?.product,
      stopwatch: {
        onCreation: () => {
          setCreation(false);
        },
      },
    };

    if (creation) {
      return DEFAULT;
    }

    if (!isEmpty(timer)) {
      return {
        startDateTime: timer.startDateTime,
        project: timer.project,
        projectTask: timer.projectTask,
        product: timer.product,
        updatedDuration: timer.updatedDuration,
        comments: timer.comments,
        stopwatch: {
          timerId: timer.id,
          version: timer.version,
          duration: timer.duration,
          timerStartDateT: timer.timerStartDateT,
          status: timer.statusSelect,
        },
      };
    }

    return DEFAULT;
  }, [creation, timer, user?.employee?.product]);

  const fieldsComparison = objectState => {
    return (
      objectState.startDateTime === timer.startDateTime &&
      objectState.project?.id === timer.project?.id &&
      objectState.projectTask?.id === timer.projectTask?.id &&
      objectState.product?.id === timer.product?.id &&
      objectState.updatedDuration === timer.updatedDuration &&
      objectState.comments === timer.comments
    );
  };

  const updateTimerAPI = useCallback(
    objectState => {
      const _timer = {
        id: timer.id,
        version: timer.version,
        startDateTime: objectState.startDateTime,
        projectId: objectState.project?.id,
        projectTaskId: objectState.projectTask?.id,
        productId: objectState.product?.id,
        duration: objectState.updatedDuration,
        comments: objectState.comments,
      };

      dispatch(updateTimer({timer: _timer}));
    },
    [dispatch, timer],
  );

  return (
    <>
      <FormView
        defaultValue={loadingCreation ? null : defaultValue}
        actions={[
          {
            key: 'update-timer',
            type: 'update',
            needValidation: true,
            needRequiredFields: true,
            disabledIf: ({objectState}) => fieldsComparison(objectState),
            hideIf: () => creation || !timer?.id,
            customAction: ({objectState}) => updateTimerAPI(objectState),
          },
          {
            key: 'declare-timer',
            type: 'custom',
            titleKey: 'Base_Declare',
            iconName: 'calendar-check',
            needValidation: true,
            needRequiredFields: true,
            disabledIf: () =>
              !timer?.id || timer.statusSelect !== TIMER_STATUS.Stop,
            hideIf: () =>
              (creation || !timer?.id) &&
              timesheetConfig.isMultipleTimerEnabled,
            customAction: () => setIsAlertVisible(true),
          },
        ]}
        formKey="hr_Timer"
      />
      <TimerListAlert
        isAlertVisible={isAlertVisible}
        setIsAlertVisible={setIsAlertVisible}
        isFromActiveTimer={true}
        defaultTimerId={timer?.id}
      />
    </>
  );
};

export default TimerFormScreen;
