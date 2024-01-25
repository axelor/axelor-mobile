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

import React, {useEffect, useMemo} from 'react';
import {
  FormView,
  useDispatch,
  useIsFocused,
  useSelector,
} from '@axelor/aos-mobile-core';
import {fetchActiveTimer} from '../../features/timerSlice';

const TimerFormScreen = ({route}) => {
  const isCreation = route?.params?.isCreation;
  const timerToUpdate = route?.params?.timerToUpdate;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {activeTimer} = useSelector(state => state.hr_timer);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchActiveTimer({userId: user?.id}));
    }
  }, [dispatch, isFocused, user?.id]);

  const defaultValue = useMemo(() => {
    if (isCreation) {
      return {
        startDateTime: new Date().toISOString(),
      };
    }

    const timer = timerToUpdate ?? activeTimer;
    return {
      startDateTime: timer.startDateTime,
      project: timer.project,
      projectTask: timer.projectTask,
      product: timer.product,
      duration: timer.duration,
      comments: timer.comments,
    };
  }, [activeTimer, isCreation, timerToUpdate]);

  return (
    <FormView defaultValue={defaultValue} actions={[]} formKey="hr_Timer" />
  );
};

export default TimerFormScreen;
