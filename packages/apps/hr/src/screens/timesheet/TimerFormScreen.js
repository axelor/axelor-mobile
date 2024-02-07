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

const TimerFormScreen = ({route}) => {
  const isCreation = route?.params?.isCreation;
  const idTimerToUpdate = route?.params?.idTimerToUpdate;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [creation, setCreation] = useState(isCreation ?? false);

  const {user} = useSelector(state => state.user);
  const {timer} = useSelector(state => state.hr_timer);

  useEffect(() => {
    if (isFocused && !isCreation) {
      idTimerToUpdate
        ? dispatch(fetchTimerById({timerId: idTimerToUpdate}))
        : dispatch(fetchActiveTimer({userId: user?.id}));
    }
  }, [dispatch, idTimerToUpdate, isCreation, isFocused, user?.id]);

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
    <FormView
      defaultValue={defaultValue}
      actions={[
        {
          key: 'update-timer',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          disabledIf: ({objectState}) => fieldsComparison(objectState),
          hideIf: () => isCreation || !timer?.id,
          customAction: ({objectState}) => updateTimerAPI(objectState),
        },
      ]}
      formKey="hr_Timer"
    />
  );
};

export default TimerFormScreen;
